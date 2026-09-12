from django.db import models
from apps.users.models import User

class VerificationRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='verification_requests')
    id_card_image = models.ImageField(upload_to='student_ids/')
    status_choices = (
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    )
    status = models.CharField(max_length=10, choices=status_choices, default='PENDING')
    submitted_at = models.DateTimeField(auto_now_add=True)
