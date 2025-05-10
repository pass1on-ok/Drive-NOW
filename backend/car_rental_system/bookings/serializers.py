from rest_framework import serializers
from .models import Booking
from vehicles.models import Vehicle
from vehicles.serializers import VehicleSerializer


class BookingSerializer(serializers.ModelSerializer):
    vehicle = VehicleSerializer(read_only=True)
    vehicle_id = serializers.PrimaryKeyRelatedField(
        queryset=Vehicle.objects.all(), write_only=True
    )

    class Meta:
        model = Booking
        fields = '__all__'

    def create(self, validated_data):
        vehicle = validated_data.pop('vehicle_id')
        booking = Booking.objects.create(vehicle=vehicle, **validated_data)
        return booking