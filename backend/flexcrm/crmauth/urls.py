from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterUserView, AddUserView, CRMTokenObtainPairView

app_name = "crmauth"

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name="register"),
    path('users/', AddUserView.as_view(), name="add_user"),
    path('token/obtain/', CRMTokenObtainPairView.as_view(), name="token_obtain"),
    path('token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
]
