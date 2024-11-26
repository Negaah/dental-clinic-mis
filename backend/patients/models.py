from django.db import models
# مدل بیماران
class Patient(models.Model):
    full_name = models.CharField(max_length=200)
    dob = models.DateField()
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')])
    phone = models.CharField(max_length=15)
    address = models.TextField(default="Afghanista")
    medical_history = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# مدل پزشکان
class Dentist(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    years_of_experience = models.PositiveIntegerField()
    office_hours = models.TextField()

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.specialization}"

# مدل قرار ملاقات‌ها
class Appointment(models.Model):
    STATUS_CHOICES = [
        ('Scheduled', 'Scheduled'),
        ('Completed', 'Completed'),
        ('Canceled', 'Canceled')
    ]
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    dentist = models.ForeignKey(Dentist, on_delete=models.CASCADE)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Scheduled')
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Appointment on {self.appointment_date} for {self.patient}"

# مدل درمان‌ها
class Treatment(models.Model):
    treatment_name = models.CharField(max_length=100)
    description = models.TextField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.treatment_name

# مدل سوابق درمان
class TreatmentRecord(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    dentist = models.ForeignKey(Dentist, on_delete=models.CASCADE)
    treatment = models.ForeignKey(Treatment, on_delete=models.CASCADE)
    date = models.DateField()
    notes = models.TextField(blank=True, null=True)

# مدل صورتحساب‌ها
class Invoice(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_status = models.CharField(max_length=10, choices=[('Paid', 'Paid'), ('Pending', 'Pending')])
    payment_date = models.DateField(blank=True, null=True)
