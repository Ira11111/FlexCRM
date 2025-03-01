from django.urls import path
from .views import CreateUserView

app_name = "crmauth"

urlpatterns = [
    path('register/', CreateUserView.as_view(), name="register"),
]
