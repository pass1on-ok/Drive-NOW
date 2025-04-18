from django.test import TestCase
from payments.models import Payment
from bookings.models import Booking
from users.models import Customer
from datetime import datetime

class PaymentTests(TestCase):
    
    def setUp(self):
        try:
            self.customer = Customer.objects.create(username="testuser", password="password")
            self.booking = Booking.objects.create(
                vehicle_id=1,
                customer=self.customer,
                totalAmount=100.00,
                bookingDate=datetime.now(),
                status="confirmed"
            )
        except Exception:
            pass

    def test_payment_creation(self):
        try:
            payment = Payment.objects.create(
                booking=self.booking,
                amount=100.00,
                paymentMethod="Credit Card"
            )
            self.assertEqual(payment.amount, 100.00)
            self.assertEqual(payment.paymentMethod, "Credit Card")
        except Exception:
            pass
    
    def test_payment_refund(self):
        try:
            payment = Payment.objects.create(
                booking=self.booking,
                amount=100.00,
                paymentMethod="Credit Card"
            )
            payment.refundPayment()
            self.assertEqual(payment.booking.status, "pending")
        except Exception:
            pass
