

// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
// import { AuthInterceptor } from './services/auth.interceptor';
// import { StorageService } from './services/storage.service'; // Путь к сервису

// // Создание инстанса интерсептора с помощью фабрики
// export function authInterceptorFactory(storageService: StorageService): AuthInterceptor {
//   return new AuthInterceptor(storageService);
// }

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient(
//       withFetch(), // подключаем fetch API
//       withInterceptors([
//         // Используем фабричную функцию для создания инстанса интерсептора
//         authInterceptorFactory
//       ]) // Используем стандартный интерсептор
//     ),
//     StorageService, // Регистрируем StorageService в DI
//   ]
// };

// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
// import { authInterceptorFn } from './services/auth.interceptor';
// import { StorageService } from './services/storage.service'; // Путь к сервису
// import { HttpInterceptorFn } from '@angular/common/http'; // Правильный импорт
// import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { TranslateModule, TranslateService } from '@ngx-translate/core'; 


// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient(
//       withFetch(), // подключаем fetch API
//       withInterceptors([
//         // Используем фабричную функцию для создания инстанса интерсептора
//         authInterceptorFn
//       ]) // Используем стандартный интерсептор
//     ),
//     StorageService, // Регистрируем StorageService в DI
//     TranslateService, // Регистрируем TranslateService
//     {
//       provide: TranslateModule,
//       useFactory: () => TranslateModule.forRoot()
//     }
    
//   ]
// };

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptorFn } from './services/auth.interceptor';
import { StorageService } from './services/storage.service'; // Путь к сервису
import { TranslateModule, TranslateService } from '@ngx-translate/core';

// Здесь authInterceptorFn — это фабричная функция, которая создает экземпляр интерсептора
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(), // подключаем fetch API
      withInterceptors([
        authInterceptorFn // Используем стандартный интерсептор
      ]) // интерсепторы для запросов
    ),
    StorageService, // Регистрируем StorageService в DI
  ]
};

