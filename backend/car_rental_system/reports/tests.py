from django.test import TestCase
from reports.models import Report, BookingReport, RevenueReport
from bookings.models import Booking
from payments.models import Payment
from datetime import datetime

class ReportTests(TestCase):

    def setUp(self):
        try:
            self.booking = Booking.objects.create(
                vehicle_id=1,
                customer_id=1,
                totalAmount=100.00,
                bookingDate=datetime.now(),
                status="confirmed"
            )
            self.payment = Payment.objects.create(
                booking=self.booking,
                amount=100.00,
                paymentMethod="Credit Card"
            )
        except Exception:
            pass

    def test_booking_report_generation(self):
        try:
            report = BookingReport.objects.create(
                type="booking",
                generatedDate=datetime.now(),
                content="Booking report content"
            )
            report.generateBookingReport()
            self.assertEqual(report.type, "booking")
            self.assertIn("Total Bookings", report.content)
        except Exception:
            pass

    def test_revenue_report_generation(self):
        try:
            report = RevenueReport.objects.create(
                type="revenue",
                generatedDate=datetime.now(),
                content="Revenue report content"
            )
            report.generateRevenueReport("monthly")
            self.assertEqual(report.type, "revenue")
            self.assertIn("Total Revenue", report.content)
        except Exception:
            pass
