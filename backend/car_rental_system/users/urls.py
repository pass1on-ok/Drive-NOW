from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CustomerViewSet, FleetManagerViewSet, AdminViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'customers', CustomerViewSet)
router.register(r'fleet-managers', FleetManagerViewSet)
router.register(r'admins', AdminViewSet)

urlpatterns = [
    path('', include(router.urls)),
]