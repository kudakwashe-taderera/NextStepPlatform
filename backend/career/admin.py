from django.contrib import admin
from .models import Subject, Program, University, CareerPath, Recommendation, CareerQuiz, QuizResult

class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'level', 'subject_code')
    list_filter = ('level',)
    search_fields = ('name', 'subject_code')


class ProgramAdmin(admin.ModelAdmin):
    list_display = ('name', 'university', 'duration', 'degree_type')
    list_filter = ('university', 'degree_type')
    search_fields = ('name', 'description')


class UniversityAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'website')
    list_filter = ('country',)
    search_fields = ('name', 'description')


class CareerPathAdmin(admin.ModelAdmin):
    list_display = ('title', 'sector', 'average_salary')
    list_filter = ('sector',)
    search_fields = ('title', 'description')


class RecommendationAdmin(admin.ModelAdmin):
    list_display = ('user', 'career_path', 'score', 'created_at')
    list_filter = ('career_path', 'created_at')
    search_fields = ('user__full_name', 'career_path__title')


class QuizResultAdmin(admin.ModelAdmin):
    list_display = ('user', 'quiz', 'score', 'completed_at')
    list_filter = ('quiz', 'completed_at')
    search_fields = ('user__full_name', 'quiz__title')


admin.site.register(Subject, SubjectAdmin)
admin.site.register(Program, ProgramAdmin)
admin.site.register(University, UniversityAdmin)
admin.site.register(CareerPath, CareerPathAdmin)
admin.site.register(Recommendation, RecommendationAdmin)
admin.site.register(CareerQuiz, admin.ModelAdmin)
admin.site.register(QuizResult, QuizResultAdmin)
