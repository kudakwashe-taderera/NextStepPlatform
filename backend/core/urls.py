from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView, LoginView, LogoutView, UserView, ChangePasswordView,
    NotificationListView, NotificationDetailView, MarkNotificationReadView,
    MessageListView, MessageDetailView, SavedItemListView, SavedItemDetailView
)

urlpatterns = [
    # Authentication
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', UserView.as_view(), name='user'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    
    # Notifications
    path('notifications/', NotificationListView.as_view(), name='notification_list'),
    path('notifications/<uuid:pk>/', NotificationDetailView.as_view(), name='notification_detail'),
    path('notifications/<uuid:pk>/read/', MarkNotificationReadView.as_view(), name='mark_notification_read'),
    
    # Messages
    path('messages/', MessageListView.as_view(), name='message_list'),
    path('messages/<uuid:pk>/', MessageDetailView.as_view(), name='message_detail'),
    
    # Saved Items
    path('saved-items/', SavedItemListView.as_view(), name='saved_item_list'),
    path('saved-items/<uuid:pk>/', SavedItemDetailView.as_view(), name='saved_item_detail'),
]
