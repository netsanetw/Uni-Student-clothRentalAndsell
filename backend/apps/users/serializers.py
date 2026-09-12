from rest_framework import serializers
from .models import User, StudentProfile, VendorProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'phone_number')
