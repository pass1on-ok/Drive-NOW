from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReportViewSet, BookingReportViewSet, RevenueReportViewSet

router = DefaultRouter()
router.register(r'reports', ReportViewSet)
router.register(r'booking-reports', BookingReportViewSet)
router.register(r'revenue-reports', RevenueReportViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
