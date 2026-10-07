from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VendorStoreViewSet

router = DefaultRouter()
router.register(r'stores', VendorStoreViewSet, basename='vendor-store')

urlpatterns = [
    path('', include(router.urls)),
]
