from django.contrib import admin
from .models import (
    Course, Module, Lesson, Assignment, Submission,
    Grade, Certificate, ZoomSession, Discussion, Group, Milestone
)


class ModuleInline(admin.TabularInline):
    model = Module
    extra = 1


class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'institution', 'semester', 'instructor', 'is_active')
    list_filter = ('institution', 'semester', 'is_active')
    search_fields = ('title', 'instructor__full_name', 'code')
    inlines = [ModuleInline]


class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 1


class ModuleAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'order', 'release_date')
    list_filter = ('course__title', 'release_date')
    search_fields = ('title', 'course__title')
    inlines = [LessonInline]


class LessonAdmin(admin.ModelAdmin):
    list_display = ('title', 'module', 'order', 'duration')
    list_filter = ('module__course__title', 'module__title')
    search_fields = ('title', 'module__title', 'content')


class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'due_date', 'total_points')
    list_filter = ('course__title', 'due_date')
    search_fields = ('title', 'course__title', 'description')


class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('assignment', 'student', 'submitted_at', 'status')
    list_filter = ('assignment__title', 'status', 'submitted_at')
    search_fields = ('assignment__title', 'student__full_name')


class GradeAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'points_earned', 'grade_letter', 'created_at')
    list_filter = ('course__title', 'grade_letter', 'created_at')
    search_fields = ('student__full_name', 'course__title')


class CertificateAdmin(admin.ModelAdmin):
    list_display = ('title', 'student', 'course', 'issue_date')
    list_filter = ('course__title', 'issue_date')
    search_fields = ('student__full_name', 'course__title', 'title')


class ZoomSessionAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'start_time', 'duration')
    list_filter = ('course__title', 'start_time')
    search_fields = ('title', 'course__title', 'meeting_id')


class DiscussionAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'created_by', 'created_at')
    list_filter = ('course__title', 'created_at')
    search_fields = ('title', 'course__title', 'content')


class MilestoneInline(admin.TabularInline):
    model = Milestone
    extra = 1


class GroupAdmin(admin.ModelAdmin):
    list_display = ('name', 'course', 'created_at')
    list_filter = ('course__title', 'created_at')
    search_fields = ('name', 'course__title', 'description')
    inlines = [MilestoneInline]


class MilestoneAdmin(admin.ModelAdmin):
    list_display = ('title', 'group', 'due_date', 'is_completed')
    list_filter = ('group__course__title', 'due_date', 'is_completed')
    search_fields = ('title', 'group__name', 'description')


admin.site.register(Course, CourseAdmin)
admin.site.register(Module, ModuleAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Assignment, AssignmentAdmin)
admin.site.register(Submission, SubmissionAdmin)
admin.site.register(Grade, GradeAdmin)
admin.site.register(Certificate, CertificateAdmin)
admin.site.register(ZoomSession, ZoomSessionAdmin)
admin.site.register(Discussion, DiscussionAdmin)
admin.site.register(Group, GroupAdmin)
admin.site.register(Milestone, MilestoneAdmin)
