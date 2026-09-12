from rest_framework.views import APIView
from rest_framework.response import Response

class AdminDashboardReportView(APIView):
    def get(self, request):
        return Response({"stats": {}})
