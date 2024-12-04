from django.core.management.base import BaseCommand
from patients.models import Patient
from appointments.models import Appointment  # Import Appointment model
from dentists.models import Dentist          # Import Dentist model
from faker import Faker
from random import randint, choice
from datetime import timedelta
from django.utils.timezone import now

class Command(BaseCommand):
    help = 'Generate fake data for the Patient and Appointment models'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Number of fake patients and appointments to create
        num_patients = 1000
        num_appointments = 2000

        # Batch size for bulk creation
        batch_size = 100

        # Generate fake patients
        for batch_start in range(0, num_patients, batch_size):
            patients_to_create = []
            for _ in range(batch_size):
                patient = Patient(
                    full_name=fake.name(),
                    dob=fake.date_of_birth(minimum_age=18, maximum_age=90),  # Random age between 18 and 90
                    gender=fake.random_element(elements=('Male', 'Female')),
                    phone=fake.phone_number()[:14],  # Ensure phone number length
                    address=fake.address(),
                    medical_history=fake.text(max_nb_chars=200)  # Random medical history
                )
                patients_to_create.append(patient)

            Patient.objects.bulk_create(patients_to_create)
            self.stdout.write(self.style.SUCCESS(f'Created batch of {batch_size} patients'))

        # Fetch all created patients and dentists
        patients = list(Patient.objects.all())
        dentists = list(Dentist.objects.all())

        # Generate fake appointments
        for batch_start in range(0, num_appointments, batch_size):
            appointments_to_create = []
            for _ in range(batch_size):
                appointment = Appointment(
                    patient=choice(patients),
                    dentist=choice(dentists),
                    appointment_date=fake.date_between(start_date="today", end_date="+1y"),  # Future date
                    appointment_time=fake.time_object(),  # Random time
                    status=fake.random_element(elements=['Scheduled', 'Completed', 'Cancelled']),
                    notes=fake.sentence(nb_words=10),  # Random notes
                )
                appointments_to_create.append(appointment)

            Appointment.objects.bulk_create(appointments_to_create)
            self.stdout.write(self.style.SUCCESS(f'Created batch of {batch_size} appointments'))

        self.stdout.write(self.style.SUCCESS(f'Successfully created {num_patients} patients and {num_appointments} appointments'))
