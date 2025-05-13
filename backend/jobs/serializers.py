from rest_framework import serializers
from .models import Job, JobApplication, ResumeUpload
from core.serializers import UserSerializer


class JobListSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company', read_only=True)
    job_type_display = serializers.CharField(source='get_job_type_display', read_only=True)
    
    class Meta:
        model = Job
        fields = [
            'id', 'title', 'company', 'company_name', 'location', 'country',
            'job_type', 'job_type_display', 'status', 'application_deadline',
            'created_at'
        ]


class JobDetailSerializer(serializers.ModelSerializer):
    posted_by_name = serializers.CharField(source='posted_by.full_name', read_only=True)
    job_type_display = serializers.CharField(source='get_job_type_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Job
        fields = [
            'id', 'title', 'company', 'location', 'country', 'description',
            'requirements', 'responsibilities', 'benefits', 'salary_range',
            'job_type', 'job_type_display', 'skills', 'application_deadline',
            'status', 'status_display', 'posted_by', 'posted_by_name',
            'company_logo_url', 'created_at', 'updated_at'
        ]
        read_only_fields = ['posted_by', 'posted_by_name', 'created_at', 'updated_at']


class JobCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            'title', 'company', 'location', 'country', 'description',
            'requirements', 'responsibilities', 'benefits', 'salary_range',
            'job_type', 'skills', 'application_deadline', 'status',
            'company_logo_url'
        ]


class ResumeUploadSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.full_name', read_only=True)
    
    class Meta:
        model = ResumeUpload
        fields = [
            'id', 'user', 'user_name', 'title', 'description', 'resume_url',
            'skills', 'education', 'experience', 'is_active',
            'uploaded_at', 'updated_at'
        ]
        read_only_fields = ['user', 'user_name', 'uploaded_at', 'updated_at']


class JobApplicationListSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title', read_only=True)
    company = serializers.CharField(source='job.company', read_only=True)
    applicant_name = serializers.CharField(source='applicant.full_name', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = JobApplication
        fields = [
            'id', 'job', 'job_title', 'company', 'applicant', 'applicant_name',
            'status', 'status_display', 'applied_at'
        ]
        read_only_fields = ['job', 'job_title', 'company', 'applicant', 'applicant_name', 'applied_at']


class JobApplicationDetailSerializer(serializers.ModelSerializer):
    job = JobListSerializer(read_only=True)
    applicant = UserSerializer(read_only=True)
    resume = ResumeUploadSerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = JobApplication
        fields = [
            'id', 'job', 'applicant', 'resume', 'cover_letter',
            'status', 'status_display', 'employer_notes', 'applied_at', 'updated_at'
        ]
        read_only_fields = ['job', 'applicant', 'resume', 'applied_at', 'updated_at']


class JobApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ['job', 'resume', 'cover_letter']


class JobApplicationUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ['status', 'employer_notes']
