from rest_framework import serializers
from .models import (
    LearningCategory, LearningResource, LearningTrack,
    TrackResource, UserProgress, TrackProgress
)


class LearningCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningCategory
        fields = ['id', 'name', 'slug', 'description', 'icon']


class LearningResourceListSerializer(serializers.ModelSerializer):
    provider_display = serializers.CharField(source='get_provider_display', read_only=True)
    resource_type_display = serializers.CharField(source='get_resource_type_display', read_only=True)
    difficulty_display = serializers.CharField(source='get_difficulty_level_display', read_only=True)
    
    class Meta:
        model = LearningResource
        fields = [
            'id', 'title', 'provider', 'provider_display', 'resource_type',
            'resource_type_display', 'thumbnail_url', 'duration',
            'difficulty_level', 'difficulty_display'
        ]


class LearningResourceDetailSerializer(serializers.ModelSerializer):
    provider_display = serializers.CharField(source='get_provider_display', read_only=True)
    resource_type_display = serializers.CharField(source='get_resource_type_display', read_only=True)
    difficulty_display = serializers.CharField(source='get_difficulty_level_display', read_only=True)
    categories = LearningCategorySerializer(many=True, read_only=True)
    user_progress = serializers.SerializerMethodField()
    
    class Meta:
        model = LearningResource
        fields = [
            'id', 'title', 'description', 'provider', 'provider_display',
            'resource_type', 'resource_type_display', 'url', 'thumbnail_url',
            'duration', 'difficulty_level', 'difficulty_display', 'skills',
            'categories', 'created_at', 'updated_at', 'user_progress'
        ]
    
    def get_user_progress(self, obj):
        user = self.context['request'].user
        try:
            progress = UserProgress.objects.get(user=user, resource=obj)
            return {
                'status': progress.status,
                'completion_percentage': progress.completion_percentage,
                'last_activity': progress.last_activity
            }
        except UserProgress.DoesNotExist:
            return None


class LearningResourceCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningResource
        fields = [
            'title', 'description', 'provider', 'resource_type', 'url',
            'thumbnail_url', 'duration', 'difficulty_level', 'skills', 'categories'
        ]


class TrackResourceSerializer(serializers.ModelSerializer):
    resource = LearningResourceListSerializer(read_only=True)
    
    class Meta:
        model = TrackResource
        fields = ['id', 'resource', 'order']


class LearningTrackListSerializer(serializers.ModelSerializer):
    difficulty_display = serializers.CharField(source='get_difficulty_level_display', read_only=True)
    resource_count = serializers.SerializerMethodField()
    
    class Meta:
        model = LearningTrack
        fields = [
            'id', 'title', 'difficulty_level', 'difficulty_display',
            'estimated_completion_time', 'resource_count'
        ]
    
    def get_resource_count(self, obj):
        return obj.resources.count()


class LearningTrackDetailSerializer(serializers.ModelSerializer):
    difficulty_display = serializers.CharField(source='get_difficulty_level_display', read_only=True)
    created_by_name = serializers.CharField(source='created_by.full_name', read_only=True)
    track_resources = TrackResourceSerializer(source='trackresource_set', many=True, read_only=True)
    categories = LearningCategorySerializer(many=True, read_only=True)
    user_progress = serializers.SerializerMethodField()
    
    class Meta:
        model = LearningTrack
        fields = [
            'id', 'title', 'description', 'created_by', 'created_by_name',
            'difficulty_level', 'difficulty_display', 'skills_gained',
            'estimated_completion_time', 'categories', 'track_resources',
            'created_at', 'updated_at', 'user_progress'
        ]
    
    def get_user_progress(self, obj):
        user = self.context['request'].user
        try:
            progress = TrackProgress.objects.get(user=user, track=obj)
            return {
                'completion_percentage': progress.completion_percentage,
                'start_date': progress.start_date,
                'last_activity': progress.last_activity
            }
        except TrackProgress.DoesNotExist:
            return None


class LearningTrackCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningTrack
        fields = [
            'title', 'description', 'difficulty_level',
            'skills_gained', 'estimated_completion_time', 'categories'
        ]


class TrackResourceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackResource
        fields = ['resource', 'order']


class UserProgressSerializer(serializers.ModelSerializer):
    resource_title = serializers.CharField(source='resource.title', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = UserProgress
        fields = [
            'id', 'resource', 'resource_title', 'status', 'status_display',
            'completion_percentage', 'notes', 'start_date', 'completion_date',
            'last_activity'
        ]
        read_only_fields = ['resource_title', 'last_activity']


class UserProgressUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProgress
        fields = ['status', 'completion_percentage', 'notes', 'completion_date']


class TrackProgressSerializer(serializers.ModelSerializer):
    track_title = serializers.CharField(source='track.title', read_only=True)
    
    class Meta:
        model = TrackProgress
        fields = [
            'id', 'track', 'track_title', 'completion_percentage',
            'start_date', 'last_activity'
        ]
        read_only_fields = ['track_title', 'start_date', 'last_activity']
