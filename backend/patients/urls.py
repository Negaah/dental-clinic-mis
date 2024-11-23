from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .views import MyTokenObtainPairView, MyTokenRefreshView,PatientViewSet,register

router = DefaultRouter()
router.register(r'patient', PatientViewSet)

urlpatterns = [
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', register, name='register'),
    path('api/', include(router.urls)),
]
