from django.db import models
from apps.users.models import User
from apps.products.models import Product

class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reservations')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reservations')
    start_date = models.DateField()
    end_date = models.DateField()
    status_choices = (
        ('PENDING', 'Pending'),
        ('CONFIRMED', 'Confirmed'),
        ('CANCELLED', 'Cancelled'),
        ('COMPLETED', 'Completed'),
    )
    status = models.CharField(max_length=15, choices=status_choices, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
