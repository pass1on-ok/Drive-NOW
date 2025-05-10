from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookingViewSet
from .views import MyBookingsView

router = DefaultRouter()
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('my-bookings/', MyBookingsView.as_view(), name='my-bookings'),
]