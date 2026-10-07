from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.db.models import Sum, Count

from apps.users.models import User
from apps.products.models import Product
from apps.orders.models import Order
from apps.reservations.models import Reservation
from apps.verification.models import VerificationRequest
from common.permissions import IsVendor, IsAdmin


class PlatformDashboardAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.is_staff or user.role == 'ADMIN':
            total_students = User.objects.filter(role='STUDENT').count()
            total_vendors = User.objects.filter(role='VENDOR').count()
            total_products = Product.objects.count()
            total_orders = Order.objects.count()
            total_revenue = Order.objects.filter(status__in=['PAID', 'COMPLETED']).aggregate(Sum('total_amount'))['total_amount__sum'] or 0.0
            pending_verifications = VerificationRequest.objects.filter(status='PENDING').count()

            return Response({
                "role": "ADMIN",
                "total_students": total_students,
                "total_vendors": total_vendors,
                "total_products": total_products,
                "total_orders": total_orders,
                "total_revenue": float(total_revenue),
                "pending_verifications": pending_verifications,
            })

        elif user.role == 'VENDOR' and hasattr(user, 'store'):
            store = user.store
            total_items = Product.objects.filter(store=store).count()
            total_orders = Order.objects.filter(items__product__store=store).distinct().count()
            total_earnings = Order.objects.filter(items__product__store=store, status__in=['PAID', 'COMPLETED']).aggregate(Sum('total_amount'))['total_amount__sum'] or 0.0
            active_rentals = Reservation.objects.filter(product__store=store, status='CONFIRMED').count()

            return Response({
                "role": "VENDOR",
                "store_name": store.name,
                "total_items": total_items,
                "total_orders": total_orders,
                "total_earnings": float(total_earnings),
                "active_rentals": active_rentals,
            })

        else:
            total_user_orders = Order.objects.filter(user=user).count()
            active_reservations = Reservation.objects.filter(user=user, status__in=['PENDING', 'CONFIRMED']).count()
            is_verified = hasattr(user, 'student_profile') and user.student_profile.is_verified

            return Response({
                "role": "STUDENT",
                "total_orders": total_user_orders,
                "active_reservations": active_reservations,
                "is_verified_student": is_verified,
            })
