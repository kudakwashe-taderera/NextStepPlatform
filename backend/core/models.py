from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
import uuid
from django.utils import timezone
from utils.uin_generator import generate_uin


# User role choices
class UserRole(models.TextChoices):
    O_LEVEL_STUDENT = 'O_LEVEL', 'O Level Student'
    A_LEVEL_STUDENT = 'A_LEVEL', 'A Level Student'
    TERTIARY_STUDENT = 'TERTIARY', 'Tertiary Student'
    LECTURER = 'LECTURER', 'Lecturer'
    MENTOR = 'MENTOR', 'Mentor'
    EMPLOYER = 'EMPLOYER', 'Employer'
    INSTITUTION_ADMIN = 'INST_ADMIN', 'Institution Admin'
    MINISTRY_ADMIN = 'MIN_ADMIN', 'Ministry Admin'
    SUPERUSER = 'SUPERUSER', 'Superuser'
    GENERAL_USER = 'GENERAL', 'General User'


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', UserRole.SUPERUSER)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    uin = models.CharField(max_length=20, unique=True, blank=True)  # Universal Identification Number
    phone = models.CharField(max_length=20, blank=True, null=True)
    role = models.CharField(max_length=20, choices=UserRole.choices, default=UserRole.GENERAL_USER)
    institution = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    
    # Profile fields
    bio = models.TextField(blank=True, null=True)
    profile_image_url = models.URLField(blank=True, null=True)
    
    # Additional fields specific to roles
    school = models.CharField(max_length=255, blank=True, null=True)  # For O/A Level students
    university = models.CharField(max_length=255, blank=True, null=True)  # For tertiary students
    program = models.CharField(max_length=255, blank=True, null=True)  # For tertiary students
    company = models.CharField(max_length=255, blank=True, null=True)  # For employers
    specialization = models.CharField(max_length=255, blank=True, null=True)  # For lecturers
    approved = models.BooleanField(default=False)  # For lecturers, mentors, employers
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']
    
    def __str__(self):
        return f"{self.full_name} ({self.email})"
    
    def save(self, *args, **kwargs):
        if not self.uin:
            self.uin = generate_uin()
        super().save(*args, **kwargs)


class Notification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=255)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    link = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=50)  # e.g., 'submission', 'job_match', 'message', 'system'
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.user.full_name}"


class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='sent_messages')
    recipient = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='received_messages')
    subject = models.CharField(max_length=255)
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    sent_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-sent_at']
    
    def __str__(self):
        return f"{self.subject} - From: {self.sender.full_name} To: {self.recipient.full_name}"


class SavedItem(models.Model):
    ITEM_TYPES = (
        ('course', 'Course'),
        ('job', 'Job'),
        ('career', 'Career'),
        ('resource', 'Resource'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='saved_items')
    item_type = models.CharField(max_length=50, choices=ITEM_TYPES)
    item_id = models.CharField(max_length=255)
    saved_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'item_type', 'item_id')
        ordering = ['-saved_at']
    
    def __str__(self):
        return f"{self.item_type}: {self.item_id} - {self.user.full_name}"


class AdminLog(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='admin_logs')
    action = models.CharField(max_length=255)
    details = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']
    
    def __str__(self):
        return f"{self.action} - {self.user.full_name}"


class InstitutionApproval(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    institution_name = models.CharField(max_length=255)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=20)
    contact_person = models.CharField(max_length=255)
    address = models.TextField()
    description = models.TextField()
    documentation_url = models.URLField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    status_note = models.TextField(blank=True, null=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    processed_at = models.DateTimeField(blank=True, null=True)
    processed_by = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, related_name='processed_institutions', blank=True, null=True)
    
    def __str__(self):
        return f"{self.institution_name} - {self.status}"


class SystemSetting(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    key = models.CharField(max_length=255, unique=True)
    value = models.TextField()
    description = models.TextField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.key
