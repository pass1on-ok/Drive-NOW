# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from .models import BookingReport, RevenueReport
# from bookings.models import Booking
# from payments.models import Payment

# # Signal для создания отчета по бронированиям
# @receiver(post_save, sender=Booking)
# def create_booking_report(sender, instance, created, **kwargs):
#     if created:  # Генерируем отчет только при создании нового бронирования
#         booking_report = BookingReport.objects.create()
#         booking_report.generateBookingReport()

# # Signal для создания отчета по доходам
# @receiver(post_save, sender=Payment)
# def create_revenue_report(sender, instance, created, **kwargs):
#     if created:  # Генерируем отчет только при создании нового платежа
#         revenue_report = RevenueReport.objects.create(period="monthly")  # Период можно настроить
#         revenue_report.generateRevenueReport(period="monthly")
