import { Injectable } from '@angular/core';

export interface Car {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private cars = [
    { name: 'Hyundai Accent', description: '1.6L • Бензин • Седан', price: 15000, imageUrl: 'assets/images/accent.jpg' },
    { name: 'Kia Rio', description: '1.4L • Бензин • Седан', price: 16000, imageUrl: 'assets/images/rio.jpg' },
    { name: 'Toyota Corolla', description: '2.0L • Бензин • Седан', price: 18000, imageUrl: 'assets/images/corolla.jpg' },

    { name: 'Toyota Camry 2023', description: '2.5L • Бензин • Бизнес-седан', price: 30000, imageUrl: 'assets/images/camry.jpg' },
    { name: 'Mercedes-Benz E-Class', description: '2.0L • Бензин • Бизнес-седан', price: 45000, imageUrl: 'assets/images/e-class.jpg' },
    { name: 'BMW 5 Series', description: '2.0L • Бензин • Бизнес-седан', price: 47000, imageUrl: 'assets/images/bmw5.jpg' },

    { name: 'Hyundai Santa Fe', description: '2.5L • Бензин • Кроссовер', price: 40000, imageUrl: 'assets/images/santa.jpg' },
    { name: 'Toyota Land Cruiser 300', description: '4.0L • Бензин • Внедорожник', price: 60000, imageUrl: 'assets/images/land-cruiser.jpg' },
    { name: 'Range Rover Sport', description: '3.0L • Дизель • Внедорожник', price: 75000, imageUrl: 'assets/images/range-rover.jpg' },

    { name: 'Tesla Model 3', description: 'Электро • Седан', price: 50000, imageUrl: 'assets/images/tesla-model3.jpg' },
    { name: 'Tesla Model X', description: 'Электро • Внедорожник', price: 70000, imageUrl: 'assets/images/tesla-modelx.jpg' },
    { name: 'BMW iX', description: 'Электро • Кроссовер', price: 65000, imageUrl: 'assets/images/bmw-ix.jpg' },

    { name: 'Porsche 911', description: '3.0L • Бензин • Спорткар', price: 120000, imageUrl: 'assets/images/porsche911.jpg' },
    { name: 'Lamborghini Huracan', description: '5.2L • Бензин • Суперкар', price: 250000, imageUrl: 'assets/images/lamborghini.jpg' },
  ];

  getCars() {
    return this.cars;
  }
}
