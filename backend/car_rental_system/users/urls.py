from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FleetManagerMeView, UserViewSet, CustomerViewSet, FleetManagerViewSet, AdminViewSet, RegisterView, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserMeView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'customers', CustomerViewSet)
router.register(r'fleet-managers', FleetManagerViewSet)
router.register(r'admins', AdminViewSet)

urlpatterns = [
    path('users/me/', UserMeView.as_view(), name='user-me'),
    path('', include(router.urls)),
    path('auth/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('fleet-managers/me/', FleetManagerMeView.as_view()),
]