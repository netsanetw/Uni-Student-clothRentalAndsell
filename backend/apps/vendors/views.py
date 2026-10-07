from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from .models import VendorStore
from .serializers import VendorStoreSerializer
from common.permissions import IsVendor

class VendorStoreViewSet(viewsets.ModelViewSet):
    queryset = VendorStore.objects.all()
    serializer_class = VendorStoreSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [IsVendor()]

    def perform_create(self, serializer):
        # Ensure a vendor can only create one store
        if VendorStore.objects.filter(vendor=self.request.user).exists():
            raise PermissionDenied("You already have a registered store profile.")
        serializer.save(vendor=self.request.user)
