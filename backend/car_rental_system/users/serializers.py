from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Customer, FleetManager, Admin

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['userID', 'name', 'email', 'phoneNumber', 'userType']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class FleetManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = FleetManager
        fields = '__all__'

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'