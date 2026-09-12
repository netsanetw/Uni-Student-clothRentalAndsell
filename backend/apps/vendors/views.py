from rest_framework.views import APIView
from rest_framework.response import Response

class VendorDashboardView(APIView):
    def get(self, request):
        return Response({"message": "Vendor dashboard data"})
