from vehicles.models import Maintenance, Vehicle
from rest_framework import viewsets, generics, permissions
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import User, Customer, FleetManager, Admin
from .serializers import (
    UserSerializer, CustomerSerializer, FleetManagerSerializer, 
    AdminSerializer, CustomTokenObtainPairSerializer, RegisterSerializer
)
from rest_framework.views import APIView
from rest_framework import status

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class FleetManagerViewSet(viewsets.ModelViewSet):
    queryset = FleetManager.objects.all()
    serializer_class = FleetManagerSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=["get"], url_path="me")
    def get_my_profile(self, request):
        try:
            manager = FleetManager.objects.get(user=request.user)
            serializer = self.get_serializer(manager)
            return Response(serializer.data)
        except FleetManager.DoesNotExist:
            return Response({"detail": "FleetManager profile not found."}, status=404)

    @action(detail=True, methods=['post'], url_path='add-vehicle')
    def add_vehicle(self, request, pk=None):
        manager = self.get_object()
        vehicle_id = request.data.get('vehicle_id')
        try:
            vehicle = Vehicle.objects.get(id=vehicle_id)
            manager.managedVehicles.add(vehicle)
            return Response({'status': 'vehicle added'})
        except Vehicle.DoesNotExist:
            return Response({'error': 'Vehicle not found'}, status=404)

    @action(detail=True, methods=['post'], url_path='remove-vehicle')
    def remove_vehicle(self, request, pk=None):
        manager = self.get_object()
        vehicle_id = request.data.get('vehicle_id')
        try:
            vehicle = Vehicle.objects.get(id=vehicle_id)
            manager.managedVehicles.remove(vehicle)
            return Response({'status': 'vehicle removed'})
        except Vehicle.DoesNotExist:
            return Response({'error': 'Vehicle not found'}, status=404)

    @action(detail=True, methods=['post'], url_path='update-status')
    def update_status(self, request, pk=None):
        vehicle_id = request.data.get('vehicle_id')
        status_value = request.data.get('status')
        try:
            vehicle = Vehicle.objects.get(id=vehicle_id)
            vehicle.status = status_value
            vehicle.save()
            return Response({'status': 'vehicle status updated'})
        except Vehicle.DoesNotExist:
            return Response({'error': 'Vehicle not found'}, status=404)

    @action(detail=True, methods=['post'], url_path='schedule-maintenance')
    def schedule_maintenance(self, request, pk=None):
        vehicle_id = request.data.get('vehicle_id')
        date = request.data.get('date')
        description = request.data.get('description')
        cost = request.data.get('cost')
        try:
            vehicle = Vehicle.objects.get(id=vehicle_id)
            maintenance = Maintenance.objects.create(
                vehicle=vehicle,
                serviceDate=date,
                description=description,
                cost=cost
            )
            return Response({'status': 'maintenance scheduled'})
        except Vehicle.DoesNotExist:
            return Response({'error': 'Vehicle not found'}, status=404)

class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class UserMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def patch(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class FleetManagerMeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        fleet_manager = FleetManager.objects.get(fleet_manager=request.user)
        serializer = FleetManagerSerializer(fleet_manager)
        return Response(serializer.data)