from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q

from .models import (
    LearningCategory, LearningResource, LearningTrack,
    TrackResource, UserProgress, TrackProgress
)
from .serializers import (
    LearningCategorySerializer, LearningResourceListSerializer,
    LearningResourceDetailSerializer, LearningResourceCreateUpdateSerializer,
    LearningTrackListSerializer, LearningTrackDetailSerializer,
    LearningTrackCreateUpdateSerializer, TrackResourceSerializer,
    TrackResourceCreateSerializer, UserProgressSerializer,
    UserProgressUpdateSerializer, TrackProgressSerializer
)
from utils.permissions import IsOwner


class CategoryListView(generics.ListAPIView):
    queryset = LearningCategory.objects.all()
    serializer_class = LearningCategorySerializer
    permission_classes = [permissions.IsAuthenticated]


class ResourceListView(generics.ListAPIView):
    serializer_class = LearningResourceListSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = LearningResource.objects.all()
        
        # Filter by provider
        provider = self.request.query_params.get('provider')
        if provider:
            queryset = queryset.filter(provider=provider)
        
        # Filter by resource type
        resource_type = self.request.query_params.get('type')
        if resource_type:
            queryset = queryset.filter(resource_type=resource_type)
        
        # Filter by difficulty level
        difficulty = self.request.query_params.get('difficulty')
        if difficulty:
            queryset = queryset.filter(difficulty_level=difficulty)
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(categories__slug=category)
        
        # Search
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(skills__icontains=search)
            )
        
        return queryset


class ResourceDetailView(generics.RetrieveAPIView):
    queryset = LearningResource.objects.all()
    serializer_class = LearningResourceDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        
        # Create or update user progress when viewing a resource
        UserProgress.objects.get_or_create(
            user=request.user,
            resource=instance,
            defaults={'status': 'NOT_STARTED'}
        )
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class ResourceCreateView(generics.CreateAPIView):
    serializer_class = LearningResourceCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save()


class ResourceUpdateView(generics.UpdateAPIView):
    queryset = LearningResource.objects.all()
    serializer_class = LearningResourceCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]


class ResourceDeleteView(generics.DestroyAPIView):
    queryset = LearningResource.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class TrackListView(generics.ListAPIView):
    serializer_class = LearningTrackListSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = LearningTrack.objects.all()
        
        # Filter by difficulty level
        difficulty = self.request.query_params.get('difficulty')
        if difficulty:
            queryset = queryset.filter(difficulty_level=difficulty)
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(categories__slug=category)
        
        # Search
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(skills_gained__icontains=search)
            )
        
        return queryset


class TrackDetailView(generics.RetrieveAPIView):
    queryset = LearningTrack.objects.all()
    serializer_class = LearningTrackDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        
        # Create track progress when viewing a track
        TrackProgress.objects.get_or_create(
            user=request.user,
            track=instance,
            defaults={'completion_percentage': 0}
        )
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class TrackCreateView(generics.CreateAPIView):
    serializer_class = LearningTrackCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TrackUpdateView(generics.UpdateAPIView):
    queryset = LearningTrack.objects.all()
    serializer_class = LearningTrackCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    
    def check_object_permissions(self, request, obj):
        if obj.created_by != request.user:
            self.permission_denied(request)
        super().check_object_permissions(request, obj)


class TrackDeleteView(generics.DestroyAPIView):
    queryset = LearningTrack.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    
    def check_object_permissions(self, request, obj):
        if obj.created_by != request.user:
            self.permission_denied(request)
        super().check_object_permissions(request, obj)


class TrackResourceCreateView(generics.CreateAPIView):
    serializer_class = TrackResourceCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        track_id = self.kwargs.get('track_id')
        track = get_object_or_404(LearningTrack, id=track_id)
        
        # Check if user is the track creator
        if track.created_by != self.request.user:
            self.permission_denied(self.request)
        
        serializer.save(track=track)


class TrackResourceUpdateView(generics.UpdateAPIView):
    queryset = TrackResource.objects.all()
    serializer_class = TrackResourceCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def check_object_permissions(self, request, obj):
        if obj.track.created_by != request.user:
            self.permission_denied(request)
        super().check_object_permissions(request, obj)


class TrackResourceDeleteView(generics.DestroyAPIView):
    queryset = TrackResource.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    
    def check_object_permissions(self, request, obj):
        if obj.track.created_by != request.user:
            self.permission_denied(request)
        super().check_object_permissions(request, obj)


class UserProgressListView(generics.ListAPIView):
    serializer_class = UserProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return UserProgress.objects.filter(user=self.request.user)


class UserProgressDetailView(generics.RetrieveAPIView):
    serializer_class = UserProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return UserProgress.objects.filter(user=self.request.user)


class UserProgressUpdateView(generics.UpdateAPIView):
    serializer_class = UserProgressUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return UserProgress.objects.filter(user=self.request.user)


class TrackProgressListView(generics.ListAPIView):
    serializer_class = TrackProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return TrackProgress.objects.filter(user=self.request.user)


class TrackProgressDetailView(generics.RetrieveAPIView):
    serializer_class = TrackProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return TrackProgress.objects.filter(user=self.request.user)


class TrackProgressUpdateView(generics.UpdateAPIView):
    serializer_class = TrackProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return TrackProgress.objects.filter(user=self.request.user)


class RecommendedResourcesView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user
        
        # Get user's previously viewed resources
        viewed_resources = UserProgress.objects.filter(user=user).values_list('resource_id', flat=True)
        
        # Get categories of viewed resources
        categories = LearningCategory.objects.filter(resources__id__in=viewed_resources).distinct()
        
        # Find similar resources based on categories
        recommended_resources = []
        if categories.exists():
            # Get resources in similar categories but not viewed yet
            similar_resources = LearningResource.objects.filter(
                categories__in=categories
            ).exclude(
                id__in=viewed_resources
            ).distinct()[:10]
            
            recommended_resources.extend(similar_resources)
        
        # If we don't have enough recommendations, add some popular resources
        if len(recommended_resources) < 10:
            # This is a simplistic approach - in production you'd use a more sophisticated algorithm
            popular_resources = LearningResource.objects.exclude(
                id__in=viewed_resources
            ).exclude(
                id__in=[r.id for r in recommended_resources]
            )[:10-len(recommended_resources)]
            
            recommended_resources.extend(popular_resources)
        
        serializer = LearningResourceListSerializer(recommended_resources, many=True)
        return Response(serializer.data)
