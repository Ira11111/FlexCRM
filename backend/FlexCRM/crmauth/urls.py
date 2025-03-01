from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CreateUserView

app_name = "crmauth"

urlpatterns = [
    path('register/', CreateUserView.as_view(), name="register"),
    path('token/obtain/', TokenObtainPairView.as_view(), name="token_obtain"),
    path('token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
]
