from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth import get_user_model
from .models import Customer, FleetManager, Admin
from .serializers import UserSerializer, CustomerSerializer, FleetManagerSerializer, AdminSerializer

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class FleetManagerViewSet(viewsets.ModelViewSet):
    queryset = FleetManager.objects.all()
    serializer_class = FleetManagerSerializer

class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
