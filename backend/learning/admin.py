from django.contrib import admin
from .models import LearningResource, LearningTrack, UserProgress, LearningCategory

class LearningResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'provider', 'resource_type', 'difficulty_level', 'duration', 'created_at')
    list_filter = ('provider', 'resource_type', 'difficulty_level', 'categories')
    search_fields = ('title', 'description', 'skills')
    date_hierarchy = 'created_at'


class LearningTrackAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_by', 'difficulty_level', 'estimated_completion_time', 'created_at')
    list_filter = ('difficulty_level', 'created_at')
    search_fields = ('title', 'description', 'skills_gained')


class UserProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'resource', 'status', 'completion_percentage', 'last_activity')
    list_filter = ('status', 'last_activity')
    search_fields = ('user__full_name', 'resource__title')
    date_hierarchy = 'last_activity'


class LearningCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name', 'description')


admin.site.register(LearningResource, LearningResourceAdmin)
admin.site.register(LearningTrack, LearningTrackAdmin)
admin.site.register(UserProgress, UserProgressAdmin)
admin.site.register(LearningCategory, LearningCategoryAdmin)
