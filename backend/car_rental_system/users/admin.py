from django.contrib import admin
from .models import User, Customer, FleetManager, Admin

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "userType")

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "licenseNumber")

@admin.register(FleetManager)
class FleetManagerAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "managerID")

@admin.register(Admin)
class AdminAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "adminID")
# admin.site.register(User)
# admin.site.register(Customer)
# admin.site.register(FleetManager)
# admin.site.register(Admin)
