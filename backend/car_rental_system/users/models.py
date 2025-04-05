from django.contrib.auth.models import AbstractUser, Permission
from django.db import models
from django.contrib.auth.hashers import make_password

class User(AbstractUser):
    userID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    phoneNumber = models.CharField(max_length=15, unique=True)
    address = models.TextField()
    
    USER_TYPES = [
        ('customer', 'Customer'),
        ('fleet_manager', 'Fleet Manager'),
        ('admin', 'Admin'),
    ]
    userType = models.CharField(max_length=20, choices=USER_TYPES, default='customer')

    def save(self, *args, **kwargs):
        if self.password and not self.password.startswith("pbkdf2_sha256$"):
            self.set_password(self.password)
        super().save(*args, **kwargs)

    def updateProfile(self, name, phoneNumber, address, password=None):
        self.name = name
        self.phoneNumber = phoneNumber
        self.address = address
        if password:  
            self.set_password(password)
        self.save()
        
    def __str__(self):
        return f"{self.username} ({self.get_userType_display()})"
    
    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    licenseNumber = models.CharField(max_length=50, unique=False)
    rentalHistory = models.TextField(blank=True, null=True)

    def viewAvailableVehicles(self):
        from vehicles.models import Vehicle
        return Vehicle.objects.filter(status="available")

    def bookVehicle(self, vehicle, start_date, end_date):
        from bookings.models import Booking
        return Booking.objects.create(
            customer=self, vehicle=vehicle, startDate=start_date, endDate=end_date
        )

    def cancelBooking(self, booking):
        booking.cancelBooking()

    def viewRentalHistory(self):
        from bookings.models import Booking
        return Booking.objects.filter(customer=self)
    
    def __str__(self):
        return f"Customer - {self.user.username}"
    
    class Meta:
        verbose_name = "Customer"
        verbose_name_plural = "Customers"


class FleetManager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    managedVehicles = models.ManyToManyField("vehicles.Vehicle", blank=True)

    def addVehicle(self, vehicle):
        self.managedVehicles.add(vehicle)

    def removeVehicle(self, vehicle):
        self.managedVehicles.remove(vehicle)

    def updateVehicleStatus(self, vehicle, status):
        vehicle.status = status
        vehicle.save()

    def scheduleMaintenance(self, vehicle, date, description, cost):
        from vehicles.models import Maintenance
        return Maintenance.objects.create(
            vehicle=vehicle, serviceDate=date, description=description, cost=cost
        )
    
    def __str__(self):
        return f"Fleet Manager - {self.user.username}"
    
    class Meta:
        verbose_name = "Fleet Manager"
        verbose_name_plural = "Fleet Managers"


class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    permissions = models.ManyToManyField(Permission, blank=True)

    def resolveDispute(self, dispute):
        dispute.status = "resolved"
        dispute.save()

    def manageUsers(self, user, action):
        if action == "delete":
            user.delete()
        elif action == "deactivate":
            user.is_active = False
            user.save()

    def viewReports(self):
        from reports.models import Report
        return Report.objects.all()
    
    def __str__(self):
        return f"Admin - {self.user.username}"
    
    class Meta:
        verbose_name = "Admin"
        verbose_name_plural = "Admins"

    


# class Customer(User):
#     licenseNumber = models.CharField(max_length=50, unique=True)
#     rentalHistory = models.TextField(blank=True, null=True)

#     def viewAvailableVehicles(self):
#         from vehicles.models import Vehicle
#         return Vehicle.objects.filter(status="available")

#     def bookVehicle(self, vehicle, start_date, end_date):
#         from bookings.models import Booking
#         return Booking.objects.create(
#             customer=self, vehicle=vehicle, startDate=start_date, endDate=end_date
#         )

#     def cancelBooking(self, booking):
#         booking.cancelBooking()

#     def viewRentalHistory(self):
#         from bookings.models import Booking
#         return Booking.objects.filter(customer=self)
    
#     def __str__(self):
#         return f"Customer - {self.username}"
    
#     class Meta:
#         verbose_name = "Customer"
#         verbose_name_plural = "Customers"
    

# class FleetManager(User):
#     managerID = models.AutoField(primary_key=True)
#     managedVehicles = models.ManyToManyField("vehicles.Vehicle", blank=True)

#     def addVehicle(self, vehicle):
#         self.managedVehicles.add(vehicle)

#     def removeVehicle(self, vehicle):
#         self.managedVehicles.remove(vehicle)

#     def updateVehicleStatus(self, vehicle, status):
#         vehicle.status = status
#         vehicle.save()

#     def scheduleMaintenance(self, vehicle, date, description, cost):
#         from vehicles.models import Maintenance
#         return Maintenance.objects.create(
#             vehicle=vehicle, serviceDate=date, description=description, cost=cost
#         )
    
#     def __str__(self):
#         return f"Fleet Manager - {self.username}"
    
#     class Meta:
#         verbose_name = "Fleet Manager"
#         verbose_name_plural = "Fleet Managers"



# class Admin(User):
#     adminID = models.AutoField(primary_key=True)
#     permissions = models.ManyToManyField(Permission, blank=True)

#     def resolveDispute(self, dispute):
#         dispute.status = "resolved"
#         dispute.save()

#     def manageUsers(self, user, action):
#         if action == "delete":
#             user.delete()
#         elif action == "deactivate":
#             user.is_active = False
#             user.save()

#     def viewReports(self):
#         from reports.models import Report
#         return Report.objects.all()
    
#     def __str__(self):
#         return f"Admin - {self.username}"
    
#     class Meta:
#         verbose_name = "Admin"
#         verbose_name_plural = "Admins"
