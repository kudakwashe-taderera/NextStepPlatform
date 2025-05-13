from django.db import models
import uuid
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator
from core.models import CustomUser


class LearningCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True, null=True)
    icon = models.CharField(max_length=100, blank=True, null=True)  # CSS class for icon
    
    class Meta:
        verbose_name_plural = "Learning Categories"
    
    def __str__(self):
        return self.name


class LearningResource(models.Model):
    PROVIDER_CHOICES = (
        ('COURSERA', 'Coursera'),
        ('YOUTUBE', 'YouTube'),
        ('LINKEDIN', 'LinkedIn Learning'),
        ('INTERNAL', 'NeXTStep Internal'),
        ('OTHER', 'Other')
    )
    
    RESOURCE_TYPE_CHOICES = (
        ('COURSE', 'Course'),
        ('VIDEO', 'Video'),
        ('ARTICLE', 'Article'),
        ('INTERACTIVE', 'Interactive Tutorial'),
        ('BOOK', 'Book'),
    )
    
    DIFFICULTY_CHOICES = (
        ('BEGINNER', 'Beginner'),
        ('INTERMEDIATE', 'Intermediate'),
        ('ADVANCED', 'Advanced'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    provider = models.CharField(max_length=20, choices=PROVIDER_CHOICES)
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPE_CHOICES)
    url = models.URLField()
    thumbnail_url = models.URLField(blank=True, null=True)
    duration = models.CharField(max_length=50, help_text="E.g., '3 hours', '10 minutes'")
    difficulty_level = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    skills = models.TextField(help_text="Comma-separated list of skills")
    categories = models.ManyToManyField(LearningCategory, related_name='resources')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} ({self.get_provider_display()})"


class LearningTrack(models.Model):
    DIFFICULTY_CHOICES = (
        ('BEGINNER', 'Beginner'),
        ('INTERMEDIATE', 'Intermediate'),
        ('ADVANCED', 'Advanced'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='created_tracks')
    resources = models.ManyToManyField(LearningResource, through='TrackResource')
    difficulty_level = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    skills_gained = models.TextField(help_text="Comma-separated list of skills gained")
    estimated_completion_time = models.CharField(max_length=50)
    categories = models.ManyToManyField(LearningCategory, related_name='tracks')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title


class TrackResource(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    track = models.ForeignKey(LearningTrack, on_delete=models.CASCADE)
    resource = models.ForeignKey(LearningResource, on_delete=models.CASCADE)
    order = models.PositiveIntegerField()
    
    class Meta:
        ordering = ['order']
        unique_together = ['track', 'resource']
    
    def __str__(self):
        return f"{self.track.title} - {self.resource.title} (Order: {self.order})"


class UserProgress(models.Model):
    STATUS_CHOICES = (
        ('NOT_STARTED', 'Not Started'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='learning_progress')
    resource = models.ForeignKey(LearningResource, on_delete=models.CASCADE, related_name='user_progress')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='NOT_STARTED')
    completion_percentage = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    notes = models.TextField(blank=True, null=True)
    start_date = models.DateField(null=True, blank=True)
    completion_date = models.DateField(null=True, blank=True)
    last_activity = models.DateTimeField(default=timezone.now)
    
    class Meta:
        unique_together = ['user', 'resource']
        ordering = ['-last_activity']
    
    def __str__(self):
        return f"{self.user.full_name} - {self.resource.title} ({self.get_status_display()})"


class TrackProgress(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='track_progress')
    track = models.ForeignKey(LearningTrack, on_delete=models.CASCADE, related_name='user_progress')
    completion_percentage = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    start_date = models.DateField(auto_now_add=True)
    last_activity = models.DateTimeField(default=timezone.now)
    
    class Meta:
        unique_together = ['user', 'track']
        ordering = ['-last_activity']
    
    def __str__(self):
        return f"{self.user.full_name} - {self.track.title} ({self.completion_percentage}%)"
