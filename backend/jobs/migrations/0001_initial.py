# Generated by Django 5.2.1 on 2025-05-13 04:42

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('company', models.CharField(max_length=255)),
                ('location', models.CharField(max_length=255)),
                ('country', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('requirements', models.TextField()),
                ('responsibilities', models.TextField()),
                ('benefits', models.TextField(blank=True, null=True)),
                ('salary_range', models.CharField(blank=True, max_length=100, null=True)),
                ('job_type', models.CharField(choices=[('FULL_TIME', 'Full Time'), ('PART_TIME', 'Part Time'), ('INTERNSHIP', 'Internship'), ('GRADUATE', 'Graduate Job'), ('REMOTE', 'Remote Work')], max_length=20)),
                ('skills', models.TextField(help_text='Comma-separated list of skills')),
                ('application_deadline', models.DateField()),
                ('status', models.CharField(choices=[('DRAFT', 'Draft'), ('OPEN', 'Open'), ('CLOSED', 'Closed'), ('FILLED', 'Filled')], default='OPEN', max_length=20)),
                ('company_logo_url', models.URLField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('posted_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posted_jobs', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='ResumeUpload',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('resume_url', models.URLField()),
                ('skills', models.TextField(help_text='Comma-separated list of skills')),
                ('education', models.TextField()),
                ('experience', models.TextField()),
                ('is_active', models.BooleanField(default=True)),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='resumes', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-updated_at'],
            },
        ),
        migrations.CreateModel(
            name='JobApplication',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('cover_letter', models.TextField()),
                ('status', models.CharField(choices=[('APPLIED', 'Applied'), ('REVIEWED', 'Reviewed'), ('SHORTLISTED', 'Shortlisted'), ('REJECTED', 'Rejected'), ('HIRED', 'Hired')], default='APPLIED', max_length=20)),
                ('employer_notes', models.TextField(blank=True, null=True)),
                ('applied_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('applicant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='job_applications', to=settings.AUTH_USER_MODEL)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='applications', to='jobs.job')),
                ('resume', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='applications', to='jobs.resumeupload')),
            ],
            options={
                'ordering': ['-applied_at'],
                'unique_together': {('job', 'applicant')},
            },
        ),
    ]
