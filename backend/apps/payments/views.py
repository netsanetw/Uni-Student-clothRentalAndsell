import uuid
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Transaction
from .serializers import TransactionSerializer, PaymentCheckoutSerializer
from apps.orders.models import Order


class TransactionViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TransactionSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return Transaction.objects.select_related('user', 'order').all()
        return Transaction.objects.filter(user=self.request.user).select_related('order')

    @action(detail=False, methods=['post'])
    def process_payment(self, request):
        serializer = PaymentCheckoutSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        order_id = serializer.validated_data['order_id']
        payment_method = serializer.validated_data['payment_method']

        try:
            order = Order.objects.get(id=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response({"error": "Order not found."}, status=status.HTTP_404_NOT_FOUND)

        reference = f"TXN-{payment_method}-{uuid.uuid4().hex[:10].upper()}"

        transaction = Transaction.objects.create(
            user=request.user,
            order=order,
            amount=order.total_amount,
            payment_method=payment_method,
            reference=reference,
            status='SUCCESS'
        )

        # Update order status to PAID
        order.status = 'PAID'
        order.save()

        return Response({
            'message': 'Payment processed successfully!',
            'transaction': TransactionSerializer(transaction).data
        }, status=status.HTTP_201_CREATED)
