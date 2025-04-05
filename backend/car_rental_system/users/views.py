from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User, Customer, FleetManager, Admin
from .serializers import (
    UserSerializer, CustomerSerializer, FleetManagerSerializer, 
    AdminSerializer, CustomTokenObtainPairSerializer, RegisterSerializer
)

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

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
