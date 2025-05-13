from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import (
    Course, Module, Lesson, Assignment, Submission,
    Grade, Certificate, ZoomSession, Discussion, DiscussionReply,
    Group, Milestone
)
from .serializers import (
    CourseListSerializer, CourseDetailSerializer, ModuleSerializer,
    LessonSerializer, AssignmentSerializer, SubmissionSerializer,
    GradeSerializer, CertificateSerializer, ZoomSessionSerializer,
    DiscussionSerializer, DiscussionReplySerializer, GroupSerializer,
    MilestoneSerializer
)
from utils.permissions import IsLecturer, IsStudent


class CourseListView(generics.ListAPIView):
    serializer_class = CourseListSerializer
    
    def get_queryset(self):
        user = self.request.user
        # Show different courses based on user role
        if user.role == 'LECTURER':
            return Course.objects.filter(instructor=user)
        elif user.role in ['O_LEVEL', 'A_LEVEL', 'TERTIARY']:
            return Course.objects.filter(students=user)
        return Course.objects.all()


class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseDetailSerializer


class EnrollCourseView(APIView):
    permission_classes = [IsStudent]
    
    def post(self, request, pk):
        course = get_object_or_404(Course, pk=pk)
        student = request.user
        
        if student in course.students.all():
            return Response({'error': 'Already enrolled in this course'}, status=status.HTTP_400_BAD_REQUEST)
        
        course.students.add(student)
        return Response({'success': 'Successfully enrolled'}, status=status.HTTP_200_OK)


class WithdrawCourseView(APIView):
    permission_classes = [IsStudent]
    
    def post(self, request, pk):
        course = get_object_or_404(Course, pk=pk)
        student = request.user
        
        if student not in course.students.all():
            return Response({'error': 'Not enrolled in this course'}, status=status.HTTP_400_BAD_REQUEST)
        
        course.students.remove(student)
        return Response({'success': 'Successfully withdrawn'}, status=status.HTTP_200_OK)


class ModuleListView(generics.ListCreateAPIView):
    serializer_class = ModuleSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsLecturer()]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        course_id = self.kwargs.get('course_id')
        return Module.objects.filter(course_id=course_id)
    
    def perform_create(self, serializer):
        course_id = self.kwargs.get('course_id')
        course = get_object_or_404(Course, id=course_id)
        
        # Check if user is the course instructor
        if self.request.user != course.instructor:
            self.permission_denied(self.request)
        
        serializer.save(course=course)


class ModuleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsLecturer()]
        return [permissions.IsAuthenticated()]


class LessonDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsLecturer()]
        return [permissions.IsAuthenticated()]


class AssignmentListView(generics.ListCreateAPIView):
    serializer_class = AssignmentSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsLecturer()]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        course_id = self.kwargs.get('course_id')
        return Assignment.objects.filter(course_id=course_id)
    
    def perform_create(self, serializer):
        course_id = self.kwargs.get('course_id')
        course = get_object_or_404(Course, id=course_id)
        
        # Check if user is the course instructor
        if self.request.user != course.instructor:
            self.permission_denied(self.request)
        
        serializer.save(course=course)


class AssignmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsLecturer()]
        return [permissions.IsAuthenticated()]


class SubmissionListView(generics.ListCreateAPIView):
    serializer_class = SubmissionSerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsLecturer()]
        return [IsStudent()]
    
    def get_queryset(self):
        assignment_id = self.kwargs.get('assignment_id')
        
        # For lecturers, show all submissions
        # For students, show only their submissions
        if self.request.user.role == 'LECTURER':
            return Submission.objects.filter(assignment_id=assignment_id)
        else:
            return Submission.objects.filter(
                assignment_id=assignment_id, 
                student=self.request.user
            )
    
    def perform_create(self, serializer):
        assignment_id = self.kwargs.get('assignment_id')
        assignment = get_object_or_404(Assignment, id=assignment_id)
        
        # Check if user is enrolled in the course
        if self.request.user not in assignment.course.students.all():
            self.permission_denied(self.request)
        
        serializer.save(assignment=assignment, student=self.request.user)


class SubmissionDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = SubmissionSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'LECTURER':
            return Submission.objects.all()
        return Submission.objects.filter(student=user)


class GradeListView(generics.ListCreateAPIView):
    serializer_class = GradeSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsLecturer()]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        course_id = self.kwargs.get('course_id')
        user = self.request.user
        
        if user.role == 'LECTURER':
            return Grade.objects.filter(course_id=course_id)
        else:
            return Grade.objects.filter(course_id=course_id, student=user)
    
    def perform_create(self, serializer):
        course_id = self.kwargs.get('course_id')
        course = get_object_or_404(Course, id=course_id)
        
        # Check if user is the course instructor
        if self.request.user != course.instructor:
            self.permission_denied(self.request)
        
        serializer.save(course=course)


class GradeDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GradeSerializer
    
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsLecturer()]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'LECTURER':
            return Grade.objects.all()
        return Grade.objects.filter(student=user)


class CertificateListView(generics.ListCreateAPIView):
    serializer_class = CertificateSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsLecturer()]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        user = self.request.user
        
        if user.role == 'LECTURER':
            # Show certificates for courses taught by the lecturer
            return Certificate.objects.filter(course__instructor=user)
        else:
            # Students only see their own certificates
            return Certificate.objects.filter(student=user)
    
    def perform_create(self, serializer):
        # Only lecturers can create certificates
        if self.request.user.role != 'LECTURER':
            self.permission_denied(self.request)
        
        serializer.save()


class CertificateDetailView(generics.RetrieveAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer


class ZoomSessionListView(generics.ListCreateAPIView):
    serializer_class = ZoomSessionSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsLecturer()]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        course_id = self.kwargs.get('course_id')
        return ZoomSession.objects.filter(course_id=course_id)
    
    def perform_create(self, serializer):
        course_id = self.kwargs.get('course_id')
        course = get_object_or_404(Course, id=course_id)
        
        # Check if user is the course instructor
        if self.request.user != course.instructor:
            self.permission_denied(self.request)
        
        serializer.save(course=course)


class ZoomSessionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ZoomSession.objects.all()
    serializer_class = ZoomSessionSerializer
    
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsLecturer()]
        return [permissions.IsAuthenticated()]


class DiscussionListView(generics.ListCreateAPIView):
    serializer_class = DiscussionSerializer
    
    def get_queryset(self):
        course_id = self.kwargs.get('course_id')
        return Discussion.objects.filter(course_id=course_id)
    
    def perform_create(self, serializer):
        course_id = self.kwargs.get('course_id')
        course = get_object_or_404(Course, id=course_id)
        
        # Check if user is associated with the course
        if (self.request.user != course.instructor and 
            self.request.user not in course.students.all()):
            self.permission_denied(self.request)
        
        serializer.save(course=course, created_by=self.request.user)


class DiscussionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Discussion.objects.all()
    serializer_class = DiscussionSerializer
    
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            # Only the creator or course instructor can modify/delete discussions
            obj = self.get_object()
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticated()]
    
    def check_object_permissions(self, request, obj):
        if request.method in ['PUT', 'PATCH', 'DELETE']:
            if request.user != obj.created_by and request.user != obj.course.instructor:
                self.permission_denied(request)
        super().check_object_permissions(request, obj)


class DiscussionReplyListView(generics.ListCreateAPIView):
    serializer_class = DiscussionReplySerializer
    
    def get_queryset(self):
        discussion_id = self.kwargs.get('discussion_id')
        return DiscussionReply.objects.filter(discussion_id=discussion_id)
    
    def perform_create(self, serializer):
        discussion_id = self.kwargs.get('discussion_id')
        discussion = get_object_or_404(Discussion, id=discussion_id)
        
        # Check if user is associated with the course
        if (self.request.user != discussion.course.instructor and 
            self.request.user not in discussion.course.students.all()):
            self.permission_denied(self.request)
        
        serializer.save(discussion=discussion, author=self.request.user)


class GroupListView(generics.ListCreateAPIView):
    serializer_class = GroupSerializer
    
    def get_queryset(self):
        course_id = self.kwargs.get('course_id')
        user = self.request.user
        
        if user.role == 'LECTURER':
            return Group.objects.filter(course_id=course_id)
        else:
            # Show only groups the student is a member of
            return Group.objects.filter(course_id=course_id, members=user)
    
    def perform_create(self, serializer):
        course_id = self.kwargs.get('course_id')
        course = get_object_or_404(Course, id=course_id)
        
        # Only instructor or students in the course can create groups
        if (self.request.user != course.instructor and 
            self.request.user not in course.students.all()):
            self.permission_denied(self.request)
        
        group = serializer.save(course=course)
        group.members.add(self.request.user)


class GroupDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GroupSerializer
    
    def get_queryset(self):
        user = self.request.user
        
        if user.role == 'LECTURER':
            return Group.objects.all()
        else:
            # Students can only access groups they are a member of
            return Group.objects.filter(members=user)


class MilestoneListView(generics.ListCreateAPIView):
    serializer_class = MilestoneSerializer
    
    def get_queryset(self):
        group_id = self.kwargs.get('group_id')
        return Milestone.objects.filter(group_id=group_id)
    
    def perform_create(self, serializer):
        group_id = self.kwargs.get('group_id')
        group = get_object_or_404(Group, id=group_id)
        
        # Check if user is a member of the group or instructor
        if (self.request.user != group.course.instructor and 
            self.request.user not in group.members.all()):
            self.permission_denied(self.request)
        
        serializer.save(group=group)


class MilestoneDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MilestoneSerializer
    
    def get_queryset(self):
        user = self.request.user
        
        if user.role == 'LECTURER':
            return Milestone.objects.all()
        else:
            # Students can only access milestones for groups they are a member of
            return Milestone.objects.filter(group__members=user)
