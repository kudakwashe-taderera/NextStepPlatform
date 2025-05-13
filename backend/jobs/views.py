from rest_framework import generics, permissions, status, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q

from .models import Job, JobApplication, ResumeUpload
from .serializers import (
    JobListSerializer, JobDetailSerializer, JobCreateUpdateSerializer,
    ResumeUploadSerializer, JobApplicationListSerializer,
    JobApplicationDetailSerializer, JobApplicationCreateSerializer,
    JobApplicationUpdateSerializer
)
from utils.permissions import IsEmployer, IsStudent, IsOwner


class JobListView(generics.ListAPIView):
    serializer_class = JobListSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'company', 'description', 'skills']
    ordering_fields = ['created_at', 'application_deadline']
    
    def get_queryset(self):
        queryset = Job.objects.filter(status='OPEN')
        
        # Filter by job type
        job_type = self.request.query_params.get('job_type')
        if job_type:
            queryset = queryset.filter(job_type=job_type)
        
        # Filter by country
        country = self.request.query_params.get('country')
        if country:
            queryset = queryset.filter(country=country)
        
        return queryset


class JobSearchView(generics.ListAPIView):
    serializer_class = JobListSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = Job.objects.filter(status='OPEN')
        
        # Search term
        search = self.request.query_params.get('q', '')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(company__icontains=search) |
                Q(description__icontains=search) |
                Q(skills__icontains=search)
            )
        
        # Filter by job type
        job_type = self.request.query_params.get('job_type')
        if job_type:
            queryset = queryset.filter(job_type=job_type)
        
        # Filter by country
        country = self.request.query_params.get('country')
        if country:
            queryset = queryset.filter(country=country)
        
        return queryset


class JobDetailView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobDetailSerializer
    permission_classes = [permissions.IsAuthenticated]


class JobCreateView(generics.CreateAPIView):
    serializer_class = JobCreateUpdateSerializer
    permission_classes = [IsEmployer]
    
    def perform_create(self, serializer):
        serializer.save(posted_by=self.request.user)


class JobUpdateView(generics.UpdateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobCreateUpdateSerializer
    permission_classes = [IsEmployer, IsOwner]
    
    def check_object_permissions(self, request, obj):
        if obj.posted_by != request.user:
            self.permission_denied(request)
        super().check_object_permissions(request, obj)


class JobDeleteView(generics.DestroyAPIView):
    queryset = Job.objects.all()
    permission_classes = [IsEmployer, IsOwner]
    
    def check_object_permissions(self, request, obj):
        if obj.posted_by != request.user:
            self.permission_denied(request)
        super().check_object_permissions(request, obj)


class ResumeUploadListView(generics.ListAPIView):
    serializer_class = ResumeUploadSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        
        # Employers can see all active resumes
        if user.role == 'EMPLOYER':
            return ResumeUpload.objects.filter(is_active=True)
        
        # Other users see only their own resumes
        return ResumeUpload.objects.filter(user=user)


class ResumeUploadDetailView(generics.RetrieveAPIView):
    serializer_class = ResumeUploadSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        
        # Employers can see all active resumes
        if user.role == 'EMPLOYER':
            return ResumeUpload.objects.filter(is_active=True)
        
        # Other users see only their own resumes
        return ResumeUpload.objects.filter(user=user)


class ResumeUploadCreateView(generics.CreateAPIView):
    serializer_class = ResumeUploadSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ResumeUploadUpdateView(generics.UpdateAPIView):
    serializer_class = ResumeUploadSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    
    def get_queryset(self):
        return ResumeUpload.objects.filter(user=self.request.user)


class JobApplicationListView(generics.ListAPIView):
    serializer_class = JobApplicationListSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        
        # Employers see applications for their posted jobs
        if user.role == 'EMPLOYER':
            return JobApplication.objects.filter(job__posted_by=user)
        
        # Students see their own applications
        return JobApplication.objects.filter(applicant=user)


class JobApplicationDetailView(generics.RetrieveAPIView):
    serializer_class = JobApplicationDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        
        # Employers see applications for their posted jobs
        if user.role == 'EMPLOYER':
            return JobApplication.objects.filter(job__posted_by=user)
        
        # Students see their own applications
        return JobApplication.objects.filter(applicant=user)


class JobApplicationCreateView(generics.CreateAPIView):
    serializer_class = JobApplicationCreateSerializer
    permission_classes = [IsStudent]
    
    def perform_create(self, serializer):
        job_id = serializer.validated_data.get('job').id
        job = get_object_or_404(Job, id=job_id)
        
        # Check if user already applied for this job
        if JobApplication.objects.filter(job=job, applicant=self.request.user).exists():
            raise serializer.ValidationError("You have already applied for this job")
        
        # Check if job is still open
        if job.status != 'OPEN':
            raise serializer.ValidationError("This job is no longer accepting applications")
        
        serializer.save(applicant=self.request.user)


class JobApplicationUpdateView(generics.UpdateAPIView):
    serializer_class = JobApplicationUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        
        # Only employers can update application status
        if user.role == 'EMPLOYER':
            return JobApplication.objects.filter(job__posted_by=user)
        
        # Students cannot update applications
        return JobApplication.objects.none()


class EmployerJobApplicationsView(generics.ListAPIView):
    serializer_class = JobApplicationListSerializer
    permission_classes = [IsEmployer]
    
    def get_queryset(self):
        job_id = self.request.query_params.get('job_id')
        status_filter = self.request.query_params.get('status')
        
        queryset = JobApplication.objects.filter(job__posted_by=self.request.user)
        
        if job_id:
            queryset = queryset.filter(job_id=job_id)
        
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        return queryset


class ApplicantJobApplicationsView(generics.ListAPIView):
    serializer_class = JobApplicationListSerializer
    permission_classes = [IsStudent]
    
    def get_queryset(self):
        status_filter = self.request.query_params.get('status')
        
        queryset = JobApplication.objects.filter(applicant=self.request.user)
        
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        return queryset
