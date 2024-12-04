from django.core.management.base import BaseCommand
from patients.models import Patient
from faker import Faker

class Command(BaseCommand):
    help = 'Generate fake data for the Patient model'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Number of fake patients to create (1000)
        num_patients = 1000

        # Create patients in batches to improve performance
        batch_size = 100  # You can adjust the batch size based on your database performance

        for batch_start in range(0, num_patients, batch_size):
            patients_to_create = []

            for _ in range(batch_size):
                patient = Patient(
                    full_name=fake.name(),
                    dob=fake.date_of_birth(minimum_age=18, maximum_age=90),  # Random age between 18 and 90
                    gender=fake.random_element(elements=('Male', 'Female')),
                    phone=fake.phone_number()[:14],  # Ensure phone number is within the correct length
                    address=fake.address(),
                    medical_history=fake.text(max_nb_chars=200)  # Random medical history text
                )
                patients_to_create.append(patient)

            # Bulk create patients in the batch
            Patient.objects.bulk_create(patients_to_create)
            self.stdout.write(self.style.SUCCESS(f'Successfully created batch of {batch_size} patients'))

        self.stdout.write(self.style.SUCCESS(f'Successfully created {num_patients} patients'))
