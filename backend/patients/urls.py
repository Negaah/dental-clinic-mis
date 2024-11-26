from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .views import PatientViewSet, DentistViewSet, AppointmentViewSet, TreatmentViewSet, TreatmentRecordViewSet, InvoiceViewSet,MyTokenObtainPairView, MyTokenRefreshView,register

router = DefaultRouter()
router.register(r'patients', PatientViewSet)
router.register(r'dentists', DentistViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'treatments', TreatmentViewSet)
router.register(r'treatment-records', TreatmentRecordViewSet)
router.register(r'invoices', InvoiceViewSet)

urlpatterns = [
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', register, name='register'),
    path('api/', include(router.urls)),
]
