from rest_framework.views import APIView
from rest_framework.response import Response

class OrderCreateView(APIView):
    def post(self, request):
        return Response({"message": "Order checkouts"})
