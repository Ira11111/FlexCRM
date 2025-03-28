from rest_framework import generics
from rest_framework.viewsets import ModelViewSet
from .serializers import UserSerializer, CRMTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView


class RegisterUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class CRMTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = CRMTokenObtainPairSerializer
