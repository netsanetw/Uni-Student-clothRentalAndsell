from django.db import models
from apps.users.models import User

class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    reference = models.CharField(max_length=100, unique=True)
    status_choices = (
        ('PENDING', 'Pending'),
        ('SUCCESS', 'Success'),
        ('FAILED', 'Failed'),
    )
    status = models.CharField(max_length=15, choices=status_choices, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
