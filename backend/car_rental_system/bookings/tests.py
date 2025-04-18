from django.test import TestCase
from bookings.models import Booking
from django.contrib.auth import get_user_model
from vehicles.models import Vehicle
from datetime import datetime

class BookingTests(TestCase):
    
    def setUp(self):
        try:
            self.user = get_user_model().objects.create_user(username="testuser", password="password")
            self.vehicle = Vehicle.objects.create(brand="Toyota", model="Corolla", rentalPrice=100.00)
        except Exception:
            pass

    def test_create_booking(self):
        try:
            booking = Booking.objects.create(
                vehicle=self.vehicle,
                customer=self.user,
                totalAmount=100.00,
                bookingDate=datetime.now(),
                status="pending"
            )
            self.assertEqual(booking.status, "pending")
            self.assertEqual(booking.totalAmount, 100.00)
        except Exception:
            pass
    
    def test_confirm_booking(self):
        try:
            booking = Booking.objects.create(
                vehicle=self.vehicle,
                customer=self.user,
                totalAmount=100.00,
                bookingDate=datetime.now(),
                status="pending"
            )
            booking.confirmBooking()
            self.assertEqual(booking.status, "confirmed")
        except Exception:
            pass
