from rest_framework import serializers
from .models import VerificationRequest
from apps.users.serializers import UserSerializer


class VerificationRequestSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = VerificationRequest
        fields = ('id', 'user', 'student_id_number', 'university_name', 'id_card_url', 'status', 'rejection_reason', 'submitted_at', 'reviewed_at')
        read_only_fields = ('id', 'user', 'status', 'reviewed_at')


class VerificationSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VerificationRequest
        fields = ('student_id_number', 'university_name', 'id_card_url')
