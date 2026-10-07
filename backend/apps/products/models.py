from django.db import models
from apps.vendors.models import VendorStore


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Product(models.Model):
    SIZE_CHOICES = (
        ('XS', 'Extra Small'),
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', 'Extra Large'),
        ('XXL', 'Double Extra Large'),
        ('FREE', 'Free Size'),
    )

    store = models.ForeignKey(VendorStore, on_delete=models.CASCADE, related_name='products')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Buy Price")
    rental_price_per_day = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, help_text="Rental Price per Day")
    size = models.CharField(max_length=10, choices=SIZE_CHOICES, default='M')
    image_url = models.URLField(max_length=500, blank=True, help_text="Product image URL")
    stock_quantity = models.PositiveIntegerField(default=1)
    is_available_for_rent = models.BooleanField(default=True)
    is_available_for_buy = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.store.name})"
