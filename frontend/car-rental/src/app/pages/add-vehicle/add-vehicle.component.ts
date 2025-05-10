import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent {
  form: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private router: Router
  ) {
    this.form = this.fb.group({
      brand: [''],
      model: [''],
      type: ['Sedan'],
      status: ['available'],
      rentalPrice: [''],
      image: [null],  // Изменено на null
      seatingCapacity: [''],
      fuelType: ['Petrol']
    });
  }

  // Обработчик для выбора файла
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.form.patchValue({
        image: file
      });
    }
  }

  onSubmit() {
    const vehicleData = this.form.value;
    
    // Создаем FormData для отправки файла
    const formData = new FormData();
    formData.append('brand', vehicleData.brand);
    formData.append('model', vehicleData.model);
    formData.append('type', vehicleData.type);
    formData.append('status', vehicleData.status);
    formData.append('rentalPrice', vehicleData.rentalPrice);
    formData.append('seatingCapacity', vehicleData.seatingCapacity);
    formData.append('fuelType', vehicleData.fuelType);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.carService.createVehicle(formData).subscribe({
      next: () => this.router.navigate(['/fleet-dashboard']),
      error: () => alert('Ошибка при добавлении автомобиля.')
    });
  }
}