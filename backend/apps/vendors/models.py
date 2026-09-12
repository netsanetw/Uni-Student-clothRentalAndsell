from django.db import models
from apps.users.models import User

class VendorStore(models.Model):
    vendor = models.OneToOneField(User, on_delete=models.CASCADE, related_name='store')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
