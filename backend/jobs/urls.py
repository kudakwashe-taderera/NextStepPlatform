from django.urls import path
from .views import (
    JobListView, JobDetailView, JobCreateView, JobUpdateView, JobDeleteView,
    ResumeUploadListView, ResumeUploadDetailView, ResumeUploadCreateView, ResumeUploadUpdateView,
    JobApplicationListView, JobApplicationDetailView, JobApplicationCreateView, JobApplicationUpdateView,
    EmployerJobApplicationsView, ApplicantJobApplicationsView, JobSearchView
)

urlpatterns = [
    # Jobs
    path('jobs/', JobListView.as_view(), name='job_list'),
    path('jobs/search/', JobSearchView.as_view(), name='job_search'),
    path('jobs/<uuid:pk>/', JobDetailView.as_view(), name='job_detail'),
    path('jobs/create/', JobCreateView.as_view(), name='job_create'),
    path('jobs/<uuid:pk>/update/', JobUpdateView.as_view(), name='job_update'),
    path('jobs/<uuid:pk>/delete/', JobDeleteView.as_view(), name='job_delete'),
    
    # Resumes
    path('resumes/', ResumeUploadListView.as_view(), name='resume_list'),
    path('resumes/<uuid:pk>/', ResumeUploadDetailView.as_view(), name='resume_detail'),
    path('resumes/create/', ResumeUploadCreateView.as_view(), name='resume_create'),
    path('resumes/<uuid:pk>/update/', ResumeUploadUpdateView.as_view(), name='resume_update'),
    
    # Applications
    path('applications/', JobApplicationListView.as_view(), name='job_application_list'),
    path('applications/<uuid:pk>/', JobApplicationDetailView.as_view(), name='job_application_detail'),
    path('applications/create/', JobApplicationCreateView.as_view(), name='job_application_create'),
    path('applications/<uuid:pk>/update/', JobApplicationUpdateView.as_view(), name='job_application_update'),
    
    # Employer and Applicant specific views
    path('employer/applications/', EmployerJobApplicationsView.as_view(), name='employer_applications'),
    path('applicant/applications/', ApplicantJobApplicationsView.as_view(), name='applicant_applications'),
]
