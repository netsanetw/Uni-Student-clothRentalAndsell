from rest_framework.views import APIView
from rest_framework.response import Response

class SubmitVerificationView(APIView):
    def post(self, request):
        return Response({"message": "Submit verification ID"})
