from django.test import TestCase
from vehicles.models import Vehicle, Car, Bike

class VehicleTests(TestCase):

    def setUp(self):
        # Создаем тестовые машины и мотоциклы
        self.car = Car.objects.create(
            brand="Toyota", model="Corolla", rentalPrice=100.00, type="Sedan", seatingCapacity=5, fuelType="Petrol"
        )
        self.bike = Bike.objects.create(
            brand="Honda", model="CBR500", rentalPrice=50.00, type="Roadster", engineCapacity=500, isElectric=False
        )

    def test_car_creation(self):
        """ Test creating a car should pass """
        self.assertEqual(self.car.brand, "Toyota")
        self.assertEqual(self.car.seatingCapacity, 5)

    def test_bike_creation(self):
        """ Test creating a bike should pass """
        self.assertEqual(self.bike.brand, "Honda")
        self.assertEqual(self.bike.engineCapacity, 500)
    
    def test_update_vehicle_status(self):
        """ Test updating vehicle status should pass """
        self.car.updateAvailability("rented")
        self.assertEqual(self.car.status, "rented")
