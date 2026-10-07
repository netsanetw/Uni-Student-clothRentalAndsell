from django.urls import path
from .views import PlatformDashboardAnalyticsView

urlpatterns = [
    path('analytics/', PlatformDashboardAnalyticsView.as_view(), name='dashboard-analytics'),
]
