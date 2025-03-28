from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter
from .views import RegisterUserView, CRMTokenObtainPairView, UserViewSet

app_name = "crmauth"

router = DefaultRouter()

router.register("users", UserViewSet)

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name="register"),
    path('token/obtain/', CRMTokenObtainPairView.as_view(), name="token_obtain"),
    path('token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
    path('', include(router.urls)),
]
