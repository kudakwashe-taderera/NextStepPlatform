from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Notification, Message, SavedItem, AdminLog, InstitutionApproval, SystemSetting

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'full_name', 'uin', 'role', 'institution', 'is_active', 'date_joined')
    list_filter = ('role', 'is_active', 'institution')
    search_fields = ('email', 'full_name', 'uin')
    readonly_fields = ('uin', 'date_joined')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('full_name', 'uin', 'phone', 'institution')}),
        ('Permissions', {'fields': ('role', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'full_name', 'password1', 'password2', 'role', 'institution', 'phone'),
        }),
    )
    ordering = ('email',)


class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'is_read', 'created_at')
    list_filter = ('is_read', 'created_at')
    search_fields = ('user__email', 'title', 'message')


class MessageAdmin(admin.ModelAdmin):
    list_display = ('sender', 'recipient', 'subject', 'is_read', 'sent_at')
    list_filter = ('is_read', 'sent_at')
    search_fields = ('sender__email', 'recipient__email', 'subject', 'content')


class SavedItemAdmin(admin.ModelAdmin):
    list_display = ('user', 'item_type', 'item_id', 'saved_at')
    list_filter = ('item_type', 'saved_at')
    search_fields = ('user__email', 'item_type', 'item_id')


class AdminLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'action', 'timestamp')
    list_filter = ('action', 'timestamp')
    search_fields = ('user__email', 'action', 'details')


class InstitutionApprovalAdmin(admin.ModelAdmin):
    list_display = ('institution_name', 'contact_email', 'status', 'submitted_at')
    list_filter = ('status', 'submitted_at')
    search_fields = ('institution_name', 'contact_email')


class SystemSettingAdmin(admin.ModelAdmin):
    list_display = ('key', 'value', 'updated_at')
    search_fields = ('key', 'value')


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Notification, NotificationAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(SavedItem, SavedItemAdmin)
admin.site.register(AdminLog, AdminLogAdmin)
admin.site.register(InstitutionApproval, InstitutionApprovalAdmin)
admin.site.register(SystemSetting, SystemSettingAdmin)
