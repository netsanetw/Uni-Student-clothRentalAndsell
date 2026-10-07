from rest_framework import serializers
from .models import VendorStore
from apps.users.serializers import UserSerializer

class VendorStoreSerializer(serializers.ModelSerializer):
    vendor = UserSerializer(read_only=True)

    class Meta:
        model = VendorStore
        fields = ('id', 'vendor', 'name', 'description', 'address', 'phone_number', 'rating', 'created_at')
        read_only_fields = ('id', 'vendor', 'rating', 'created_at')
