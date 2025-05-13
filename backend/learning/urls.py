from django.urls import path
from .views import (
    CategoryListView, ResourceListView, ResourceDetailView, ResourceCreateView,
    ResourceUpdateView, ResourceDeleteView, TrackListView, TrackDetailView,
    TrackCreateView, TrackUpdateView, TrackDeleteView, TrackResourceCreateView,
    TrackResourceUpdateView, TrackResourceDeleteView, UserProgressListView,
    UserProgressDetailView, UserProgressUpdateView, TrackProgressListView,
    TrackProgressDetailView, TrackProgressUpdateView, RecommendedResourcesView
)

urlpatterns = [
    # Categories
    path('categories/', CategoryListView.as_view(), name='category_list'),
    
    # Learning Resources
    path('resources/', ResourceListView.as_view(), name='resource_list'),
    path('resources/<uuid:pk>/', ResourceDetailView.as_view(), name='resource_detail'),
    path('resources/create/', ResourceCreateView.as_view(), name='resource_create'),
    path('resources/<uuid:pk>/update/', ResourceUpdateView.as_view(), name='resource_update'),
    path('resources/<uuid:pk>/delete/', ResourceDeleteView.as_view(), name='resource_delete'),
    
    # Learning Tracks
    path('tracks/', TrackListView.as_view(), name='track_list'),
    path('tracks/<uuid:pk>/', TrackDetailView.as_view(), name='track_detail'),
    path('tracks/create/', TrackCreateView.as_view(), name='track_create'),
    path('tracks/<uuid:pk>/update/', TrackUpdateView.as_view(), name='track_update'),
    path('tracks/<uuid:pk>/delete/', TrackDeleteView.as_view(), name='track_delete'),
    
    # Track Resources
    path('tracks/<uuid:track_id>/resources/add/', TrackResourceCreateView.as_view(), name='track_resource_create'),
    path('track-resources/<uuid:pk>/update/', TrackResourceUpdateView.as_view(), name='track_resource_update'),
    path('track-resources/<uuid:pk>/delete/', TrackResourceDeleteView.as_view(), name='track_resource_delete'),
    
    # User Progress
    path('progress/resources/', UserProgressListView.as_view(), name='user_progress_list'),
    path('progress/resources/<uuid:pk>/', UserProgressDetailView.as_view(), name='user_progress_detail'),
    path('progress/resources/<uuid:pk>/update/', UserProgressUpdateView.as_view(), name='user_progress_update'),
    
    # Track Progress
    path('progress/tracks/', TrackProgressListView.as_view(), name='track_progress_list'),
    path('progress/tracks/<uuid:pk>/', TrackProgressDetailView.as_view(), name='track_progress_detail'),
    path('progress/tracks/<uuid:pk>/update/', TrackProgressUpdateView.as_view(), name='track_progress_update'),
    
    # Recommendations
    path('recommended/', RecommendedResourcesView.as_view(), name='recommended_resources'),
]
