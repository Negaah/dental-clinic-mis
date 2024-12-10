from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Patient, Dentist, Appointment, Treatment, TreatmentRecord, Invoice


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )
        return user
class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class DentistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dentist
        fields = '__all__'


class AppointmentSerializer(serializers.ModelSerializer):
    # Read-only fields for displaying names instead of IDs
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)
    dentist_name = serializers.CharField(source='dentist.full_name', read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'dentist', 'patient_name', 'dentist_name', 
                  'appointment_date', 'appointment_time', 'status', 'notes']
        extra_kwargs = {
            'patient': {'write_only': True},  # Patient ID used for creation/update
            'dentist': {'write_only': True},  # Dentist ID used for creation/update
        }



class TreatmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Treatment
        fields = '__all__'

class TreatmentRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TreatmentRecord
        fields = '__all__'

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'
