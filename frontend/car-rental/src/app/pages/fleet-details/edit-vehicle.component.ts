import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CarService, Vehicle } from '../../services/car.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-vehicle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {
  vehicleForm!: FormGroup;
  vehicleID!: number;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vehicleID = Number(this.route.snapshot.paramMap.get('id'));
    this.loadVehicle();
  }

  loadVehicle(): void {
    this.loading = true;
    this.carService.getVehicleById(this.vehicleID.toString()).subscribe({
      next: (vehicle: Vehicle) => {
        this.vehicleForm = this.fb.group({
          brand: [vehicle.brand, Validators.required],
          model: [vehicle.model, Validators.required],
          type: [vehicle.type],
          fuelType: [vehicle.fuelType],
          seatingCapacity: [vehicle.seatingCapacity],
          rentalPrice: [vehicle.rentalPrice, [Validators.required, Validators.min(0)]],
          
          description: [vehicle.description],
          status: [vehicle.status]
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Не удалось загрузить автомобиль';
        this.loading = false;
      }
    });
  }

  // onSubmit(): void {
  //   if (this.vehicleForm.invalid) return;

  //   const updatedVehicle: Partial<Vehicle> = this.vehicleForm.value;
  //   this.carService.updateVehicle(this.vehicleID, updatedVehicle).subscribe({
  //     next: () => {
  //       this.router.navigate(['/fleet']);
  //     },
  //     error: () => {
  //       this.error = 'Ошибка при обновлении автомобиля';
  //     }
  //   });
  // }
  onSubmit(): void {
  if (this.vehicleForm.invalid) return;

//   const updatedVehicle: Partial<Vehicle> = {
//     ...this.vehicleForm.value,
//     rentalPrice: parseFloat(this.vehicleForm.value.rentalPrice),
//     seatingCapacity: parseInt(this.vehicleForm.value.seatingCapacity)
//   };
// //   if (!updatedVehicle.image?.startsWith('http')) {
// //   delete updatedVehicle.image;
// // }

//   console.log('Отправляемые данные:', updatedVehicle); // Добавь это
//   this.carService.updateVehicle(this.vehicleID, updatedVehicle).subscribe({
//     next: () => {
//       this.router.navigate(['/fleet']);
//     },
//     error: () => {
//       this.error = 'Ошибка при обновлении автомобиля';
//     }
//   });
const updatedVehicle: Partial<Vehicle> = {
  ...this.vehicleForm.value,
  rentalPrice: parseFloat(this.vehicleForm.value.rentalPrice),
  seatingCapacity: parseInt(this.vehicleForm.value.seatingCapacity, 10)
};

console.log('Отправляемые данные:', updatedVehicle);

this.carService.updateVehicle(this.vehicleID, updatedVehicle).subscribe({
  next: () => {
    this.router.navigate(['/fleet']);
  },
  error: (err) => {
    this.error = `Ошибка при обновлении автомобиля: ${err.message}`;
    console.log(err); // Подробности ошибки
  }
});
}

}
