from django.db import models

# Create your models here.


class Patient(models.Model):
    full_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=20)
    dob = models.DateField()
    gender = models.CharField(max_length=10)
    def __str__(self):
        return self.full_name