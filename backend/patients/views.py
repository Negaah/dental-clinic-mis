
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserRegistrationSerializer
from .models import Patient, Dentist, Appointment, Treatment, TreatmentRecord, Invoice
from .serializers import PatientSerializer, DentistSerializer, AppointmentSerializer, TreatmentSerializer, TreatmentRecordSerializer, InvoiceSerializer



@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Custom token obtain view (optional)
class MyTokenObtainPairView(TokenObtainPairView):
    pass

# Token refresh view (auto-generate new access token from refresh token)
class MyTokenRefreshView(TokenRefreshView):
    pass




class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class DentistViewSet(viewsets.ModelViewSet):
    queryset = Dentist.objects.all()
    serializer_class = DentistSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class TreatmentViewSet(viewsets.ModelViewSet):
    queryset = Treatment.objects.all()
    serializer_class = TreatmentSerializer

class TreatmentRecordViewSet(viewsets.ModelViewSet):
    queryset = TreatmentRecord.objects.all()
    serializer_class = TreatmentRecordSerializer

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
