from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Coupon
from .serializers import CouponSerializer

class CouponViewSet(viewsets.ModelViewSet):
    queryset = Coupon.objects.filter(active=True)
    serializer_class = CouponSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'validate_coupon']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def validate_coupon(self, request):
        code = request.data.get('code', '').strip()
        try:
            coupon = Coupon.objects.get(code__iexact=code, active=True)
            return Response({
                "valid": True,
                "code": coupon.code,
                "discount_percentage": float(coupon.discount_percentage)
            })
        except Coupon.DoesNotExist:
            return Response({"valid": False, "error": "Invalid or expired coupon code."}, status=status.HTTP_404_NOT_FOUND)
