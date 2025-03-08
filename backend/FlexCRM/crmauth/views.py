from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User


class RegisterUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class AddUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
