from django.contrib import admin
from .models import Report, BookingReport, RevenueReport
# Register your models here.
admin.site.register(Report)
admin.site.register(BookingReport)
admin.site.register(RevenueReport)