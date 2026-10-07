from rest_framework import serializers
from .models import Transaction
from apps.users.serializers import UserSerializer
from apps.orders.serializers import OrderSerializer


class TransactionSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    order = OrderSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = ('id', 'user', 'order', 'amount', 'payment_method', 'reference', 'status', 'created_at')


class PaymentCheckoutSerializer(serializers.Serializer):
    order_id = serializers.IntegerField()
    payment_method = serializers.ChoiceField(choices=Transaction.PAYMENT_METHOD_CHOICES, default='TELEBIRR')
