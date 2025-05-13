"""
URL configuration for NeXTStep platform.
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="NeXTStep API",
        default_version='v1',
        description="NeXTStep Platform API Documentation",
        terms_of_service="https://www.nextstep.com/terms/",
        contact=openapi.Contact(email="contact@nextstep.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('core.urls')),
    path('api/lms/', include('lms.urls')),
    path('api/career/', include('career.urls')),
    path('api/jobs/', include('jobs.urls')),
    path('api/learning/', include('learning.urls')),
    
    # Swagger documentation
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
