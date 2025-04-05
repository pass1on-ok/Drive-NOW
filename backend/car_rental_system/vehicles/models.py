from django.db import models

class Vehicle(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('rented', 'Rented'),
        ('maintenance', 'Maintenance'),
    ]

    BODY_TYPES = [
        # Closed body types
        ('Sedan', 'Sedan'),
        ('Two-Door Sedan', 'Two-Door Sedan'),
        ('Hatchback', 'Hatchback (Liftback)'),
        ('Coupe', 'Coupe'),
        ('Limousine', 'Limousine'),
        ('Minivan', 'Minivan'),
        ('Hardtop', 'Hardtop'),
        ('Town Car', 'Town Car'),
        ('Kombi', 'Kombi'),
        ('Fastback', 'Fastback'),

        # Open body types
        ('Phaeton', 'Phaeton'),
        ('Lando', 'Lando'),
        ('Targa', 'Targa'),
        ('Roadster', 'Roadster (Convertible, Spyder, Speedster)'),
        ('Torpedo', 'Torpedo'),
        ('Barchetta', 'Barchetta'),
    ]

    vehicleID = models.AutoField(primary_key=True)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    type = models.CharField(max_length=30, choices=BODY_TYPES, default='Sedan')  
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    rentalPrice = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='vehicle_images/', blank=True, null=True)

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
    FUEL_TYPES = [
        ('Petrol', 'Petrol'),
        ('Diesel', 'Diesel'),
        ('Electric', 'Electric'),
        ('Hybrid', 'Hybrid'),
        ('Hydrogen', 'Hydrogen'),
    ]
    seatingCapacity = models.IntegerField()
    fuelType = models.CharField(max_length=20, choices=FUEL_TYPES, default='Petrol')

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
