from django.urls import path
from .views import AdminDashboardReportView

urlpatterns = [
    path('dashboard/', AdminDashboardReportView.as_view(), name='admin-reports'),
]
