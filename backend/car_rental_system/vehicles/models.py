from django.db import models

class Vehicle(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('rented', 'Rented'),
        ('maintenance', 'Maintenance'),
    ]

    vehicleID = models.AutoField(primary_key=True)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    type = models.CharField(max_length=50)  # Например, "Car", "Bike", "SUV"
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    rentalPrice = models.DecimalField(max_digits=10, decimal_places=2)

    def updateAvailability(self, status):
        self.status = status
        self.save()

    def getVehicleDetails(self):
        return f"{self.brand} {self.model} ({self.type}) - {self.status}"

    def updateRentalPrice(self, price):
        self.rentalPrice = price
        self.save()

    def __str__(self):
        return f"{self.brand} {self.model} - {self.status}"


class Car(Vehicle):
    seatingCapacity = models.IntegerField()
    fuelType = models.CharField(max_length=50)

    def calculateRentalPrice(self):
        return self.rentalPrice

class Bike(Vehicle):
    engineCapacity = models.IntegerField()
    isElectric = models.BooleanField(default=False)

    def calculateRentalPrice(self):
        return self.rentalPrice
    

class Maintenance(models.Model):
    maintenanceID = models.AutoField(primary_key=True)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    serviceDate = models.DateField()
    description = models.TextField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)

    def scheduleMaintenance(self, date, description, cost):
        self.serviceDate = date
        self.description = description
        self.cost = cost
        self.save()

    def getMaintenanceHistory(self):
        return Maintenance.objects.filter(vehicle=self.vehicle)

    def __str__(self):
        return f"Maintenance for {self.vehicle} on {self.serviceDate}"
