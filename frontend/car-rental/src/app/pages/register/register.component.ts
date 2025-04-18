import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage: string = '';
  avatarPreviewUrl: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9@./+/-/_]*$')]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required]], // Для телефона
      address: ['', Validators.required],
      userType: ['customer', Validators.required],  // Пользователь по умолчанию - 'customer'
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }
  // previewAvatar(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.avatarPreviewUrl = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  // Функция отправки формы
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Пожалуйста, заполните форму корректно.';
      console.log(this.registerForm.errors); // Покажет ошибки всей формы
      console.log(this.registerForm.controls);
      return;
    }

    console.log(this.registerForm.value);

    // Делаем запрос на сервер для регистрации
    const { confirmPassword, ...formData } = this.registerForm.value;

this.http.post('http://127.0.0.1:8000/api/auth/register/', formData)
  .subscribe(
    response => {
      console.log('Регистрация прошла успешно', response);
      this.router.navigate(['/login']);
    },
    error => {
      this.errorMessage = 'Произошла ошибка при регистрации.';
      console.error(error);
    }
  );
    // const formData = this.registerForm.value;
    // this.http.post('http://127.0.0.1:8000/api/auth/register', formData)
    //   .subscribe(
    //     response => {
    //       console.log('Регистрация прошла успешно', response);
    //       this.router.navigate(['/login']);
    //     },
    //     error => {
    //       this.errorMessage = 'Произошла ошибка при регистрации.';
    //       console.error(error);
    //     }
    //   );
  }
}

// ✅ функция для проверки совпадения паролей
export const passwordMatchValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password && confirmPassword && password !== confirmPassword
    ? { mismatch: true }
    : null;
};
