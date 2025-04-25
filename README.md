# Car Rental System

## Description

Car Rental System is a web application for car rentals, including a frontend built with **Angular** and a backend built with **Django**. The system allows users to:

- View available cars for rent.
- Book cars for specific dates.
- Make payments for the rental.
- View the history of their bookings and payments.
- Manage their profile.

### Tech Stack

- **Frontend**:
  - **Angular** — for building a Single Page Application (SPA).
  - **TypeScript** — for type-safe development.
  - **Bootstrap** — for responsive UI design.
  - **RxJS** — for handling asynchronous data streams.
  - **HTML, CSS** — for layout and styling.

- **Backend**:
  - **Django** — for building the API using Django REST Framework (DRF).
  - **Python** — the programming language used for the backend.
  - **SQLite/PostgreSQL** — for database management (depending on the configuration).
  - **JWT (JSON Web Tokens)** — for user authentication and authorization.

## Installation

### 1. Clone the repository

To get started, clone the repository:

```
git clone https://github.com/pass1on-ok/Car-Rental-System.git
Navigate to the project directory:

cd Car-Rental-System
2. Install and run the frontend
Install dependencies:
Go to the frontend directory:

cd frontend
Install the dependencies:

npm install
Run the frontend:
To start the frontend in development mode, run:

ng serve
The app will be available at http://localhost:4200.

3. Install and run the backend
Install dependencies:
Go to the backend directory:

cd backend
Create a virtual environment:

python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
Install the dependencies:


pip install -r requirements.txt
Run the backend:
Run database migrations:


python manage.py migrate
Start the server:


python manage.py runserver
The API will be available at http://localhost:8000.

4. API Configuration
Your API requests will interact with the following endpoints:

POST /api/bookings/: Create a new booking.

GET /api/bookings/: Get a list of bookings.

POST /api/payments/: Create a new payment.

GET /api/payments/: Get payment details.

POST /api/auth/login/: User login (returns JWT token).

POST /api/auth/register/: User registration.

5. Network Configuration
Ensure that the frontend and backend ports do not conflict. By default, the frontend runs on port 4200, and the backend runs on port 8000. You can change the ports in the configuration if needed.

Project Structure
Frontend
src/app/pages: Page components (e.g., profile, booking, payment pages).

src/app/services: Services for backend communication (e.g., BookingService, AuthService).

src/app/models: Data models (e.g., Booking, User interfaces).

src/app/components: Reusable components (e.g., booking form).

Backend
car_rental_system/settings.py: Django settings (including database and API configurations).

car_rental_system/urls.py: URL routing for API endpoints.

api/views.py: Logic to handle API requests.

api/serializers.py: Serializers to convert data models to JSON.

api/models.py: Database models (e.g., Booking, Payment, User).

api/permissions.py: Permissions and API protection.

Development
Running Tests
For frontend tests:

ng test
For backend tests:

python manage.py test
Linting
To check code quality with linters, run:

For frontend:

ng lint
For backend:


flake8 .
CI/CD Pipeline
For automatic deployment and testing, use GitHub Actions or GitLab CI. CI/CD configuration files can be found in the .github/workflows or .gitlab-ci.yml directories.

Important Files
Frontend:

src/app/app.component.ts: Main application component.

src/app/pages/booking/booking.component.ts: Booking page component.

src/app/services/booking.service.ts: Service for handling bookings.

Backend:

car_rental_system/settings.py: Django settings.

api/views.py: Views for handling API requests.

api/serializers.py: Data serialization.

api/models.py: Database models.
