from django.urls import path
from .views import SubmitVerificationView

urlpatterns = [
    path('submit/', SubmitVerificationView.as_view(), name='submit-verification'),
]
