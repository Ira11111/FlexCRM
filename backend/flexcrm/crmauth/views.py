from rest_framework import generics
from .serializers import UserSerializer, UserDetailSerializer, CRMTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView


class RegisterUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.prefetch_related("groups")

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return UserDetailSerializer

        return super().get_serializer_class()


class CRMTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = CRMTokenObtainPairSerializer
