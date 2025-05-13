from rest_framework import serializers
from .models import (
    Course, Module, Lesson, Assignment, Submission,
    Grade, Certificate, ZoomSession, Discussion, DiscussionReply,
    Group, Milestone
)
from core.serializers import UserSerializer


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'content', 'order', 'duration']


class ModuleSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    
    class Meta:
        model = Module
        fields = ['id', 'title', 'description', 'order', 'release_date', 'lessons']


class CourseListSerializer(serializers.ModelSerializer):
    instructor_name = serializers.CharField(source='instructor.full_name', read_only=True)
    
    class Meta:
        model = Course
        fields = ['id', 'title', 'code', 'institution', 'instructor_name', 'semester', 'is_active']


class CourseDetailSerializer(serializers.ModelSerializer):
    instructor = UserSerializer(read_only=True)
    modules = ModuleSerializer(many=True, read_only=True)
    
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'code', 'description', 'institution', 'instructor',
            'semester', 'start_date', 'end_date', 'is_active', 'modules'
        ]


class AssignmentSerializer(serializers.ModelSerializer):
    course_code = serializers.CharField(source='course.code', read_only=True)
    
    class Meta:
        model = Assignment
        fields = ['id', 'course', 'course_code', 'title', 'description', 'due_date', 'total_points']
        read_only_fields = ['course_code']


class SubmissionSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.full_name', read_only=True)
    assignment_title = serializers.CharField(source='assignment.title', read_only=True)
    
    class Meta:
        model = Submission
        fields = [
            'id', 'assignment', 'assignment_title', 'student', 'student_name',
            'content', 'files_url', 'points_earned', 'feedback', 'status', 'submitted_at'
        ]
        read_only_fields = ['student', 'student_name', 'assignment_title', 'submitted_at']


class GradeSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.full_name', read_only=True)
    course_title = serializers.CharField(source='course.title', read_only=True)
    
    class Meta:
        model = Grade
        fields = [
            'id', 'student', 'student_name', 'course', 'course_title',
            'points_earned', 'points_possible', 'grade_letter', 'comments', 'created_at'
        ]
        read_only_fields = ['student_name', 'course_title', 'created_at']


class CertificateSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.full_name', read_only=True)
    course_title = serializers.CharField(source='course.title', read_only=True)
    
    class Meta:
        model = Certificate
        fields = [
            'id', 'student', 'student_name', 'course', 'course_title',
            'title', 'description', 'issue_date', 'pdf_url', 'verification_code'
        ]
        read_only_fields = ['student_name', 'course_title', 'verification_code']


class ZoomSessionSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    
    class Meta:
        model = ZoomSession
        fields = [
            'id', 'course', 'course_title', 'title', 'description',
            'meeting_id', 'password', 'join_url', 'start_time', 'duration'
        ]
        read_only_fields = ['course_title']


class DiscussionReplySerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.full_name', read_only=True)
    
    class Meta:
        model = DiscussionReply
        fields = ['id', 'author', 'author_name', 'content', 'created_at']
        read_only_fields = ['author', 'author_name', 'created_at']


class DiscussionSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source='created_by.full_name', read_only=True)
    replies = DiscussionReplySerializer(many=True, read_only=True)
    
    class Meta:
        model = Discussion
        fields = [
            'id', 'course', 'title', 'content', 'created_by',
            'created_by_name', 'created_at', 'replies'
        ]
        read_only_fields = ['created_by', 'created_by_name', 'created_at']


class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = ['id', 'title', 'description', 'due_date', 'is_completed', 'completed_at']


class GroupSerializer(serializers.ModelSerializer):
    milestones = MilestoneSerializer(many=True, read_only=True)
    members_data = UserSerializer(source='members', many=True, read_only=True)
    
    class Meta:
        model = Group
        fields = [
            'id', 'course', 'name', 'description', 'members',
            'members_data', 'created_at', 'milestones'
        ]
        read_only_fields = ['created_at']
