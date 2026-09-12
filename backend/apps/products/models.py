from django.db import models
from apps.vendors.models import VendorStore

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    store = models.ForeignKey(VendorStore, on_delete=models.CASCADE, related_name='products')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    rental_price_per_day = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_available_for_rent = models.BooleanField(default=True)
    is_available_for_buy = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
