from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone

from .models import VerificationRequest
from .serializers import VerificationRequestSerializer, VerificationSubmissionSerializer
from apps.users.models import StudentProfile


class VerificationViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return VerificationRequest.objects.select_related('user').all()
        return VerificationRequest.objects.filter(user=self.request.user).select_related('user')

    def get_serializer_class(self):
        if self.action == 'create':
            return VerificationSubmissionSerializer
        return VerificationRequestSerializer

    def perform_create(self, serializer):
        req = serializer.save(user=self.request.user)
        # Update StudentProfile info
        if hasattr(self.request.user, 'student_profile'):
            profile = self.request.user.student_profile
            profile.university_name = req.university_name
            profile.student_id_number = req.student_id_number
            profile.save()

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def approve(self, request, pk=None):
        verification = self.get_object()
        verification.status = 'APPROVED'
        verification.reviewed_at = timezone.now()
        verification.save()

        # Unlock student discount on StudentProfile
        if hasattr(verification.user, 'student_profile'):
            profile = verification.user.student_profile
            profile.is_verified = True
            profile.save()

        return Response({"message": f"Student ID for {verification.user.username} approved successfully!"})

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def reject(self, request, pk=None):
        verification = self.get_object()
        reason = request.data.get('reason', 'ID card image invalid or unreadable.')
        verification.status = 'REJECTED'
        verification.rejection_reason = reason
        verification.reviewed_at = timezone.now()
        verification.save()

        if hasattr(verification.user, 'student_profile'):
            profile = verification.user.student_profile
            profile.is_verified = False
            profile.save()

        return Response({"message": f"Student ID for {verification.user.username} rejected.", "reason": reason})
