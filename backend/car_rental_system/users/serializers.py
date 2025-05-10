from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User, Customer, FleetManager, Admin
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'userID', 'username', 'first_name', 'last_name', 'email', 'name',
            'phoneNumber', 'address', 'userType', 'password'
        ]

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
    
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

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError("No active account found with the given credentials")

        if not user.check_password(password):
            raise serializers.ValidationError("Invalid password")

        if not user.is_active:
            raise serializers.ValidationError("User account is not active")

        attrs["user"] = user
        return super().validate(attrs)
    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "email", "name", "phoneNumber", "address", "userType", "password"]

    def create(self, validated_data):
        print(f"Password before hashing: {validated_data['password']}")
        if User.objects.filter(phoneNumber=validated_data["phoneNumber"]).exists():
            raise serializers.ValidationError("This phone number is already in use.")
        user = User(
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
            name=validated_data["name"],
            phoneNumber=validated_data["phoneNumber"],
            address=validated_data["address"],
            userType=validated_data["userType"],
        )
        user.set_password(validated_data["password"])
        print(f"Hashed password: {user.password}")  # 🔍 Вывод хешированного пароля
        user.save()
        return user