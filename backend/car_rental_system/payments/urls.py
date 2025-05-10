from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PaymentViewSet
from .views import MyPaymentsView

router = DefaultRouter()
router.register(r'payments', PaymentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('my-payments/', MyPaymentsView.as_view(), name='my-payments'),
]
