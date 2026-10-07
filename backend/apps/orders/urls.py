from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet

router = DefaultRouter()
router.register(r'history', OrderViewSet, basename='order')

urlpatterns = [
    path('', include(router.urls)),
]
