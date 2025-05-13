from django.urls import path
from .views import (
    CourseListView, CourseDetailView, EnrollCourseView, WithdrawCourseView,
    ModuleListView, ModuleDetailView, LessonDetailView,
    AssignmentListView, AssignmentDetailView, SubmissionListView, SubmissionDetailView,
    GradeListView, GradeDetailView, CertificateListView, CertificateDetailView,
    ZoomSessionListView, ZoomSessionDetailView, DiscussionListView, DiscussionDetailView,
    DiscussionReplyListView, GroupListView, GroupDetailView, MilestoneListView, MilestoneDetailView
)

urlpatterns = [
    # Courses
    path('courses/', CourseListView.as_view(), name='course_list'),
    path('courses/<uuid:pk>/', CourseDetailView.as_view(), name='course_detail'),
    path('courses/<uuid:pk>/enroll/', EnrollCourseView.as_view(), name='enroll_course'),
    path('courses/<uuid:pk>/withdraw/', WithdrawCourseView.as_view(), name='withdraw_course'),
    
    # Modules and Lessons
    path('courses/<uuid:course_id>/modules/', ModuleListView.as_view(), name='module_list'),
    path('modules/<uuid:pk>/', ModuleDetailView.as_view(), name='module_detail'),
    path('lessons/<uuid:pk>/', LessonDetailView.as_view(), name='lesson_detail'),
    
    # Assignments and Submissions
    path('courses/<uuid:course_id>/assignments/', AssignmentListView.as_view(), name='assignment_list'),
    path('assignments/<uuid:pk>/', AssignmentDetailView.as_view(), name='assignment_detail'),
    path('assignments/<uuid:assignment_id>/submissions/', SubmissionListView.as_view(), name='submission_list'),
    path('submissions/<uuid:pk>/', SubmissionDetailView.as_view(), name='submission_detail'),
    
    # Grades
    path('courses/<uuid:course_id>/grades/', GradeListView.as_view(), name='grade_list'),
    path('grades/<uuid:pk>/', GradeDetailView.as_view(), name='grade_detail'),
    
    # Certificates
    path('certificates/', CertificateListView.as_view(), name='certificate_list'),
    path('certificates/<uuid:pk>/', CertificateDetailView.as_view(), name='certificate_detail'),
    
    # Zoom
    path('courses/<uuid:course_id>/zoom-sessions/', ZoomSessionListView.as_view(), name='zoom_session_list'),
    path('zoom-sessions/<uuid:pk>/', ZoomSessionDetailView.as_view(), name='zoom_session_detail'),
    
    # Discussions
    path('courses/<uuid:course_id>/discussions/', DiscussionListView.as_view(), name='discussion_list'),
    path('discussions/<uuid:pk>/', DiscussionDetailView.as_view(), name='discussion_detail'),
    path('discussions/<uuid:discussion_id>/replies/', DiscussionReplyListView.as_view(), name='discussion_reply_list'),
    
    # Groups and Milestones
    path('courses/<uuid:course_id>/groups/', GroupListView.as_view(), name='group_list'),
    path('groups/<uuid:pk>/', GroupDetailView.as_view(), name='group_detail'),
    path('groups/<uuid:group_id>/milestones/', MilestoneListView.as_view(), name='milestone_list'),
    path('milestones/<uuid:pk>/', MilestoneDetailView.as_view(), name='milestone_detail'),
]
