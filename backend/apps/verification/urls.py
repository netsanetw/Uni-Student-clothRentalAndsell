from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VerificationViewSet

router = DefaultRouter()
router.register(r'requests', VerificationViewSet, basename='verification')

urlpatterns = [
    path('', include(router.urls)),
]
