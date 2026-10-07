from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User, StudentProfile, VendorProfile


class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = ('university_name', 'student_id_number', 'is_verified')


class VendorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorProfile
        fields = ('business_name', 'license_number', 'is_approved')


class UserSerializer(serializers.ModelSerializer):
    student_profile = StudentProfileSerializer(read_only=True)
    vendor_profile = VendorProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'role', 'phone_number', 'student_profile', 'vendor_profile')
        read_only_fields = ('id', 'role')


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    university_name = serializers.CharField(required=False, write_only=True, allow_blank=True)
    student_id_number = serializers.CharField(required=False, write_only=True, allow_blank=True)
    business_name = serializers.CharField(required=False, write_only=True, allow_blank=True)
    license_number = serializers.CharField(required=False, write_only=True, allow_blank=True)

    class Meta:
        model = User
        fields = (
            'username', 'email', 'password', 'role', 'first_name', 'last_name', 'phone_number',
            'university_name', 'student_id_number', 'business_name', 'license_number'
        )

    def create(self, validated_data):
        university_name = validated_data.pop('university_name', '')
        student_id_number = validated_data.pop('student_id_number', '')
        business_name = validated_data.pop('business_name', '')
        license_number = validated_data.pop('license_number', '')
        password = validated_data.pop('password')

        role = validated_data.get('role', 'STUDENT')
        user = User(**validated_data)
        user.set_password(password)
        user.save()

        if role == 'STUDENT':
            StudentProfile.objects.create(
                user=user,
                university_name=university_name,
                student_id_number=student_id_number
            )
        elif role == 'VENDOR':
            VendorProfile.objects.create(
                user=user,
                business_name=business_name,
                license_number=license_number
            )

        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        token['role'] = user.role
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'role': self.user.role,
            'phone_number': self.user.phone_number,
        }
        return data
