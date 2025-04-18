from django.shortcuts import render
from rest_framework import viewsets
from .models import Payment
from .serializers import PaymentSerializer
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    # permission_classes = [permissions.IsAuthenticated]

    # def get_queryset(self):
    #     user = self.request.user
    #     # Filter payments based on logged-in user (assuming user model is related to Payment model)
    #     return Payment.objects.filter(customer=user)

    # @action(detail=False, methods=['get'])
    # def user_payments(self, request):
    #     user = request.user
    #     payments = Payment.objects.filter(customer=user)
    #     serializer = self.get_serializer(payments, many=True)
    #     return Response(serializer.data)
