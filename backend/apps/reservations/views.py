from rest_framework.views import APIView
from rest_framework.response import Response

class ReservationCreateView(APIView):
    def post(self, request):
        return Response({"message": "Reservation endpoint"})
