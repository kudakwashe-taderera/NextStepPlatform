# Generated by Django 5.2.1 on 2025-05-13 04:42

import django.core.validators
import django.db.models.deletion
import django.utils.timezone
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
            name='LearningCategory',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('slug', models.SlugField(unique=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('icon', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'verbose_name_plural': 'Learning Categories',
            },
        ),
        migrations.CreateModel(
            name='LearningResource',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('provider', models.CharField(choices=[('COURSERA', 'Coursera'), ('YOUTUBE', 'YouTube'), ('LINKEDIN', 'LinkedIn Learning'), ('INTERNAL', 'NeXTStep Internal'), ('OTHER', 'Other')], max_length=20)),
                ('resource_type', models.CharField(choices=[('COURSE', 'Course'), ('VIDEO', 'Video'), ('ARTICLE', 'Article'), ('INTERACTIVE', 'Interactive Tutorial'), ('BOOK', 'Book')], max_length=20)),
                ('url', models.URLField()),
                ('thumbnail_url', models.URLField(blank=True, null=True)),
                ('duration', models.CharField(help_text="E.g., '3 hours', '10 minutes'", max_length=50)),
                ('difficulty_level', models.CharField(choices=[('BEGINNER', 'Beginner'), ('INTERMEDIATE', 'Intermediate'), ('ADVANCED', 'Advanced')], max_length=20)),
                ('skills', models.TextField(help_text='Comma-separated list of skills')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('categories', models.ManyToManyField(related_name='resources', to='learning.learningcategory')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='LearningTrack',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('difficulty_level', models.CharField(choices=[('BEGINNER', 'Beginner'), ('INTERMEDIATE', 'Intermediate'), ('ADVANCED', 'Advanced')], max_length=20)),
                ('skills_gained', models.TextField(help_text='Comma-separated list of skills gained')),
                ('estimated_completion_time', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('categories', models.ManyToManyField(related_name='tracks', to='learning.learningcategory')),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_tracks', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='TrackResource',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('order', models.PositiveIntegerField()),
                ('resource', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='learning.learningresource')),
                ('track', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='learning.learningtrack')),
            ],
            options={
                'ordering': ['order'],
                'unique_together': {('track', 'resource')},
            },
        ),
        migrations.AddField(
            model_name='learningtrack',
            name='resources',
            field=models.ManyToManyField(through='learning.TrackResource', to='learning.learningresource'),
        ),
        migrations.CreateModel(
            name='TrackProgress',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('completion_percentage', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)])),
                ('start_date', models.DateField(auto_now_add=True)),
                ('last_activity', models.DateTimeField(default=django.utils.timezone.now)),
                ('track', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_progress', to='learning.learningtrack')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='track_progress', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-last_activity'],
                'unique_together': {('user', 'track')},
            },
        ),
        migrations.CreateModel(
            name='UserProgress',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('status', models.CharField(choices=[('NOT_STARTED', 'Not Started'), ('IN_PROGRESS', 'In Progress'), ('COMPLETED', 'Completed')], default='NOT_STARTED', max_length=20)),
                ('completion_percentage', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)])),
                ('notes', models.TextField(blank=True, null=True)),
                ('start_date', models.DateField(blank=True, null=True)),
                ('completion_date', models.DateField(blank=True, null=True)),
                ('last_activity', models.DateTimeField(default=django.utils.timezone.now)),
                ('resource', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_progress', to='learning.learningresource')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='learning_progress', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-last_activity'],
                'unique_together': {('user', 'resource')},
            },
        ),
    ]
