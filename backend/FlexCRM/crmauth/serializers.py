from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer, ValidationError


def check_group_name(group: str):
    if group not in ("Operators", "Managers", "Marketers"):
        raise ValidationError("There is no such group")


def check_email_in_system(email: str):
    if User.objects.filter(email=email).exists():
        raise ValidationError("User with this email already exists")


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["pk", "username", "password", "email"]
        extra_kwargs = {
            "email": {
                "required": True,
                "validators": [check_email_in_system]
            },
            "password": {"write_only": True},
            "user_group": {
                "required": False,
                "validators": [check_group_name]
            }
        }
