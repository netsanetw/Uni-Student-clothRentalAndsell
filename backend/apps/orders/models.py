from django.db import models
from apps.users.models import User
from apps.products.models import Product
from apps.reservations.models import Reservation


class Order(models.Model):
    ORDER_TYPE_CHOICES = (
        ('RENTAL', 'Rental'),
        ('PURCHASE', 'Direct Purchase'),
    )
    STATUS_CHOICES = (
        ('PENDING', 'Pending Payment'),
        ('PAID', 'Paid / Confirmed'),
        ('PROCESSING', 'Processing'),
        ('READY_FOR_PICKUP', 'Ready for Pickup'),
        ('PICKED_UP', 'Picked Up'),
        ('RETURNED', 'Returned'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    order_type = models.CharField(max_length=15, choices=ORDER_TYPE_CHOICES, default='RENTAL')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    pickup_qr_code = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.user.username} ({self.status})"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    reservation = models.ForeignKey(Reservation, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product.name} x {self.quantity} (Order #{self.order.id})"
