from django.db import models
from apps.users.models import User

class VerificationRequest(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending Approval'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='verification_requests')
    student_id_number = models.CharField(max_length=50, blank=True)
    university_name = models.CharField(max_length=100, blank=True)
    id_card_url = models.URLField(max_length=500, blank=True, help_text="Image URL or uploaded ID path")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    rejection_reason = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Student ID Verification for {self.user.username} ({self.status})"
