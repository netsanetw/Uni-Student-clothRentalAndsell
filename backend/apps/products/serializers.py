from rest_framework import serializers
from .models import Category, Product
from apps.vendors.serializers import VendorStoreSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug')


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    store = VendorStoreSerializer(read_only=True)

    class Meta:
        model = Product
        fields = (
            'id', 'store', 'category', 'name', 'description',
            'price', 'rental_price_per_day', 'size', 'image_url',
            'stock_quantity', 'is_available_for_rent', 'is_available_for_buy', 'created_at'
        )


class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'id', 'category', 'name', 'description',
            'price', 'rental_price_per_day', 'size', 'image_url',
            'stock_quantity', 'is_available_for_rent', 'is_available_for_buy'
        )
