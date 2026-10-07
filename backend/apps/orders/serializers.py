from rest_framework import serializers
from .models import Order, OrderItem
from apps.products.models import Product
from apps.products.serializers import ProductSerializer
from apps.users.serializers import UserSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'reservation', 'quantity', 'unit_price', 'subtotal')


class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'user', 'order_type', 'total_amount', 'discount_amount', 'status', 'pickup_qr_code', 'items', 'created_at')


class OrderItemCreateSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(default=1, min_value=1)
    reservation_id = serializers.IntegerField(required=False, allow_null=True)


class OrderCreateSerializer(serializers.Serializer):
    order_type = serializers.ChoiceField(choices=Order.ORDER_TYPE_CHOICES, default='RENTAL')
    items = OrderItemCreateSerializer(many=True)

    def create(self, validated_data):
        user = self.context['request'].user
        items_data = validated_data.pop('items')
        order_type = validated_data.get('order_type', 'RENTAL')

        total_amount = 0
        discount_amount = 0

        # Create Order container first
        order = Order.objects.create(
            user=user,
            order_type=order_type,
            total_amount=0,
            status='PENDING'
        )

        for item_data in items_data:
            try:
                product = Product.objects.get(id=item_data['product_id'])
            except Product.DoesNotExist:
                raise serializers.ValidationError({"product": f"Product ID {item_data['product_id']} not found."})

            qty = item_data.get('quantity', 1)
            unit_price = product.rental_price_per_day if order_type == 'RENTAL' else product.price
            unit_price = unit_price or product.price
            subtotal = float(unit_price) * qty
            total_amount += subtotal

            OrderItem.objects.create(
                order=order,
                product=product,
                reservation_id=item_data.get('reservation_id'),
                quantity=qty,
                unit_price=unit_price,
                subtotal=subtotal
            )

        # Apply 10% Student Discount if student is verified
        if hasattr(user, 'student_profile') and user.student_profile.is_verified:
            discount_amount = total_amount * 0.10
            total_amount = total_amount - discount_amount

        order.discount_amount = discount_amount
        order.total_amount = total_amount
        order.pickup_qr_code = f"QR-RENTAL-{order.id}-{user.id}"
        order.save()

        return order
