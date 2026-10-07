from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from .models import Reservation
from .serializers import ReservationSerializer, ReservationCreateSerializer
from .services import check_availability
from apps.products.models import Product


class ReservationViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Reservation.objects.select_related('user', 'product', 'product__store').all()
        elif user.role == 'VENDOR' and hasattr(user, 'store'):
            return Reservation.objects.filter(product__store=user.store).select_related('user', 'product')
        return Reservation.objects.filter(user=user).select_related('product', 'product__store')

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ReservationCreateSerializer
        return ReservationSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def check_availability(self, request):
        product_id = request.data.get('product_id')
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')

        if not all([product_id, start_date, end_date]):
            return Response(
                {"error": "product_id, start_date, and end_date are required fields."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

        is_available, message = check_availability(product, start_date, end_date)
        return Response({"available": is_available, "message": message})
