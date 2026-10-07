from django.db import models
from apps.users.models import User
from apps.orders.models import Order


class Transaction(models.Model):
    PAYMENT_METHOD_CHOICES = (
        ('TELEBIRR', 'Telebirr'),
        ('CHAPA', 'Chapa Card/Mobile Money'),
        ('CBE_BIRR', 'CBE Birr'),
        ('CASH', 'Cash on Pickup'),
    )
    STATUS_CHOICES = (
        ('PENDING', 'Pending Payment'),
        ('SUCCESS', 'Payment Successful'),
        ('FAILED', 'Payment Failed'),
        ('REFUNDED', 'Refunded'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='transactions', null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, default='TELEBIRR')
    reference = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Txn #{self.reference} - {self.payment_method} ({self.amount} ETB)"
