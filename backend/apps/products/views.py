from rest_framework import viewsets, permissions, filters
from rest_framework.exceptions import PermissionDenied, ValidationError
from django_filters.rest_framework import DjangoFilterBackend

from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer, ProductCreateSerializer
from .filters import ProductFilter
from common.permissions import IsVendor
from apps.vendors.models import VendorStore


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related('store', 'category').all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'description', 'store__name']
    ordering_fields = ['price', 'rental_price_per_day', 'created_at']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [IsVendor()]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ProductCreateSerializer
        return ProductSerializer

    def perform_create(self, serializer):
        user = self.request.user
        try:
            store = user.store
        except VendorStore.DoesNotExist:
            raise ValidationError({"error": "You must create a Vendor Store profile before listing products."})
        serializer.save(store=store)

    def perform_update(self, serializer):
        product = self.get_object()
        if product.store.vendor != self.request.user and not self.request.user.is_staff:
            raise PermissionDenied("You do not have permission to edit products belonging to another store.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.store.vendor != self.request.user and not self.request.user.is_staff:
            raise PermissionDenied("You do not have permission to delete products belonging to another store.")
        instance.delete()
