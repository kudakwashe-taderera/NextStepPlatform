from django.contrib import admin
from .models import Job, JobApplication, ResumeUpload

class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'location', 'job_type', 'status', 'posted_by', 'created_at')
    list_filter = ('job_type', 'status', 'location', 'created_at')
    search_fields = ('title', 'company', 'description')
    date_hierarchy = 'created_at'


class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('applicant', 'job', 'status', 'applied_at')
    list_filter = ('status', 'applied_at')
    search_fields = ('applicant__full_name', 'job__title', 'cover_letter')
    date_hierarchy = 'applied_at'


class ResumeUploadAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'is_active', 'uploaded_at')
    list_filter = ('is_active', 'uploaded_at')
    search_fields = ('user__full_name', 'title', 'description')
    date_hierarchy = 'uploaded_at'


admin.site.register(Job, JobAdmin)
admin.site.register(JobApplication, JobApplicationAdmin)
admin.site.register(ResumeUpload, ResumeUploadAdmin)
