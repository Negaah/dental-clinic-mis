from django.contrib import admin
from .models import Patient, Dentist, Appointment, Treatment, TreatmentRecord, Invoice

# Customizing Patient admin
@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'dob', 'gender', 'phone', 'address')
    search_fields = ('full_name', 'phone')
    list_filter = ('gender', 'dob')

# Customizing Dentist admin
@admin.register(Dentist)
class DentistAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'specialization', 'phone_number', 'email', 'years_of_experience')
    search_fields = ('first_name', 'last_name', 'specialization', 'email')
    list_filter = ('specialization', 'years_of_experience')

# Customizing Appointment admin
@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('patient', 'dentist', 'appointment_date', 'appointment_time', 'status')
    search_fields = ('patient__full_name', 'dentist__first_name', 'dentist__last_name')
    list_filter = ('status', 'appointment_date', 'dentist')

# Customizing Treatment admin
@admin.register(Treatment)
class TreatmentAdmin(admin.ModelAdmin):
    list_display = ('treatment_name', 'cost')
    search_fields = ('treatment_name',)

# Customizing TreatmentRecord admin
@admin.register(TreatmentRecord)
class TreatmentRecordAdmin(admin.ModelAdmin):
    list_display = ('patient', 'dentist', 'treatment', 'date')
    search_fields = ('patient__full_name', 'dentist__first_name', 'dentist__last_name', 'treatment__treatment_name')
    list_filter = ('date', 'dentist', 'treatment')

# Customizing Invoice admin
@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('patient', 'appointment', 'total_amount', 'paid_amount', 'payment_status', 'payment_date')
    search_fields = ('patient__full_name', 'appointment__id')
    list_filter = ('payment_status', 'payment_date')
