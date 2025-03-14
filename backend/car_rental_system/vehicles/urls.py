from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VehicleViewSet, CarViewSet, BikeViewSet

router = DefaultRouter()
router.register(r'vehicles', VehicleViewSet)
router.register(r'cars', CarViewSet)
router.register(r'bikes', BikeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
