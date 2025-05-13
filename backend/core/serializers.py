from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Notification, Message, SavedItem, AdminLog, InstitutionApproval, SystemSetting, UserRole

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'uin', 'phone', 'role', 'institution', 
                  'bio', 'profile_image_url', 'school', 'university', 'program', 
                  'company', 'specialization', 'date_joined']
        read_only_fields = ['id', 'uin', 'date_joined']


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True, min_length=6)
    
    class Meta:
        model = User
        fields = ['email', 'password', 'confirm_password', 'full_name', 'phone', 'role', 
                  'institution', 'school', 'university', 'program', 'company', 'specialization']
    
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords don't match")
        
        # Additional role-specific validation
        role = data.get('role')
        
        if role == UserRole.O_LEVEL_STUDENT or role == UserRole.A_LEVEL_STUDENT:
            if not data.get('school'):
                raise serializers.ValidationError("School is required for O/A Level students")
        
        if role == UserRole.TERTIARY_STUDENT:
            if not data.get('university'):
                raise serializers.ValidationError("University is required for tertiary students")
            if not data.get('program'):
                raise serializers.ValidationError("Program is required for tertiary students")
        
        if role == UserRole.LECTURER:
            if not data.get('specialization'):
                raise serializers.ValidationError("Specialization is required for lecturers")
            if not data.get('institution'):
                raise serializers.ValidationError("Institution is required for lecturers")
        
        if role == UserRole.EMPLOYER:
            if not data.get('company'):
                raise serializers.ValidationError("Company is required for employers")
        
        if role in [UserRole.INSTITUTION_ADMIN, UserRole.MINISTRY_ADMIN, UserRole.SUPERUSER]:
            # These roles should not be self-registered
            raise serializers.ValidationError("This role requires administrative approval")
        
        return data
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        
        # Set approved status based on role
        role = validated_data.get('role')
        if role in [UserRole.LECTURER, UserRole.MENTOR, UserRole.EMPLOYER]:
            validated_data['approved'] = False
        else:
            validated_data['approved'] = True
        
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=6)
    confirm_password = serializers.CharField(required=True, min_length=6)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("New passwords don't match")
        return data


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'title', 'message', 'is_read', 'link', 'type', 'created_at']
        read_only_fields = ['id', 'created_at']


class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.SerializerMethodField()
    recipient_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Message
        fields = ['id', 'sender', 'sender_name', 'recipient', 'recipient_name', 
                  'subject', 'content', 'is_read', 'sent_at']
        read_only_fields = ['id', 'sender', 'sender_name', 'sent_at']
    
    def get_sender_name(self, obj):
        return obj.sender.full_name
    
    def get_recipient_name(self, obj):
        return obj.recipient.full_name


class SavedItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedItem
        fields = ['id', 'item_type', 'item_id', 'saved_at']
        read_only_fields = ['id', 'saved_at']


class AdminLogSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    
    class Meta:
        model = AdminLog
        fields = ['id', 'user', 'user_name', 'action', 'details', 'timestamp']
        read_only_fields = ['id', 'timestamp']
    
    def get_user_name(self, obj):
        return obj.user.full_name


class InstitutionApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstitutionApproval
        fields = ['id', 'institution_name', 'contact_email', 'contact_phone',
                  'contact_person', 'address', 'description', 'documentation_url',
                  'status', 'status_note', 'submitted_at', 'processed_at']
        read_only_fields = ['id', 'status', 'status_note', 'submitted_at', 'processed_at']


class SystemSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemSetting
        fields = ['id', 'key', 'value', 'description', 'updated_at']
        read_only_fields = ['id', 'updated_at']
