import django_filters
from .models import Product


class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr='lte')
    min_rental_price = django_filters.NumberFilter(field_name="rental_price_per_day", lookup_expr='gte')
    max_rental_price = django_filters.NumberFilter(field_name="rental_price_per_day", lookup_expr='lte')
    category_slug = django_filters.CharFilter(field_name="category__slug", lookup_expr='exact')

    class Meta:
        model = Product
        fields = ['category', 'category_slug', 'size', 'is_available_for_rent', 'is_available_for_buy']
