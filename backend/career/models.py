from django.db import models
import uuid
from django.utils import timezone
from core.models import CustomUser


class Subject(models.Model):
    LEVEL_CHOICES = (
        ('O_LEVEL', 'O Level'),
        ('A_LEVEL', 'A Level'),
        ('UNIVERSITY', 'University'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    subject_code = models.CharField(max_length=20, unique=True)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    description = models.TextField()
    
    def __str__(self):
        return f"{self.name} ({self.get_level_display()})"


class University(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=100)
    address = models.TextField()
    description = models.TextField()
    website = models.URLField()
    logo_url = models.URLField(blank=True, null=True)
    
    class Meta:
        verbose_name_plural = "Universities"
    
    def __str__(self):
        return f"{self.name}, {self.country}"


class Program(models.Model):
    DEGREE_TYPE_CHOICES = (
        ('CERTIFICATE', 'Certificate'),
        ('DIPLOMA', 'Diploma'),
        ('BACHELORS', 'Bachelor\'s Degree'),
        ('MASTERS', 'Master\'s Degree'),
        ('PHD', 'PhD'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    university = models.ForeignKey(University, on_delete=models.CASCADE, related_name='programs')
    degree_type = models.CharField(max_length=20, choices=DEGREE_TYPE_CHOICES)
    description = models.TextField()
    duration = models.PositiveIntegerField(help_text="Duration in years")
    entry_requirements = models.TextField()
    subjects_required = models.ManyToManyField(Subject, related_name='programs')
    
    def __str__(self):
        return f"{self.name} - {self.university.name} ({self.get_degree_type_display()})"


class CareerPath(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    skills_required = models.TextField()
    sector = models.CharField(max_length=100)
    average_salary = models.CharField(max_length=100)
    job_outlook = models.TextField()
    related_programs = models.ManyToManyField(Program, related_name='career_paths')
    
    def __str__(self):
        return self.title


class Recommendation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='recommendations')
    career_path = models.ForeignKey(CareerPath, on_delete=models.CASCADE, related_name='recommendations')
    score = models.FloatField(help_text="Match score based on profile and preferences")
    reasoning = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'career_path']
        ordering = ['-score']
    
    def __str__(self):
        return f"{self.user.full_name} - {self.career_path.title} ({self.score}%)"


class CareerQuiz(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title


class QuizQuestion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    quiz = models.ForeignKey(CareerQuiz, on_delete=models.CASCADE, related_name='questions')
    text = models.TextField()
    order = models.PositiveIntegerField()
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.quiz.title} - Question {self.order}"


class QuizOption(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE, related_name='options')
    text = models.TextField()
    career_traits = models.TextField(help_text="Comma-separated career traits this option indicates")
    
    def __str__(self):
        return f"{self.question.text} - {self.text[:30]}"


class QuizResult(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='quiz_results')
    quiz = models.ForeignKey(CareerQuiz, on_delete=models.CASCADE, related_name='results')
    answers = models.JSONField(help_text="JSON with question IDs and selected option IDs")
    score = models.JSONField(help_text="JSON with trait scores")
    completed_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        unique_together = ['user', 'quiz']
        ordering = ['-completed_at']
    
    def __str__(self):
        return f"{self.user.full_name} - {self.quiz.title}"
