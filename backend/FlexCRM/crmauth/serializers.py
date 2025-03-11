from django.contrib.auth.models import User, Group, Permission
from rest_framework.serializers import ModelSerializer, ValidationError, CharField

GROUP_PERMS = {
    "Admins": ("add_user", "change_user", "delete_user", "view_user"),
    "Operators": ("add_customer", "change_customer", "view_customer"),
    "Managers": ("add_contract", "change_contract", "view_contract"),
    "Marketers": ("add_add", "change_add", "view_add", "change_product", "add_product", "view_product"),
}


def check_group_name(group_name: str):
    if group_name not in GROUP_PERMS.keys():
        raise ValidationError("There is no such group")


def check_email_in_system(email: str):
    if User.objects.filter(email=email).exists():
        raise ValidationError("User with this email already exists")


class UserSerializer(ModelSerializer):
    user_group = CharField(write_only=True, required=True, validators=[check_group_name])

    class Meta:
        model = User
        fields = ["pk", "username", "password", "email", "user_group"]
        extra_kwargs = {
            "email": {
                "required": True,
                "validators": [check_email_in_system]
            },
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        group_name = validated_data.pop("user_group")
        group, created = Group.objects.get_or_create(name=group_name)
        for p in GROUP_PERMS.get(group_name):
            permission = Permission.objects.get(codename=p)
            group.permissions.add(permission)

        user = User.objects.create_user(**validated_data)
        user.groups.add(group)
        user.save()
        return user
