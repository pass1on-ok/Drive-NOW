from rest_framework import serializers
from .models import Report, BookingReport, RevenueReport

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'

class BookingReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingReport
        fields = '__all__'

class RevenueReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = RevenueReport
        fields = '__all__'
