from django.shortcuts import render
from rest_framework import viewsets
from .models import Report, BookingReport, RevenueReport
from .serializers import ReportSerializer, BookingReportSerializer, RevenueReportSerializer

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer

class BookingReportViewSet(viewsets.ModelViewSet):
    queryset = BookingReport.objects.all()
    serializer_class = BookingReportSerializer

class RevenueReportViewSet(viewsets.ModelViewSet):
    queryset = RevenueReport.objects.all()
    serializer_class = RevenueReportSerializer

