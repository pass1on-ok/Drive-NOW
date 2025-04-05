from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, Customer, FleetManager, Admin

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created: 
        if instance.userType == 'customer':
            Customer.objects.create(user=instance, licenseNumber="DefaultLicense")
        elif instance.userType == 'fleet_manager':
            FleetManager.objects.create(user=instance)
        elif instance.userType == 'admin':
            Admin.objects.create(user=instance)
