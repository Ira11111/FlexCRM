from django.contrib.auth.models import User, Group, Permission
from drf_spectacular.utils import extend_schema_field
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from django.db import transaction
from rest_framework.serializers import (
    ModelSerializer,
    ValidationError,
    CharField,
    SerializerMethodField,
    ListField,
    CharField,
    EmailField,
)

GROUP_PERMS = {
    "Admins": ("add_user", "change_user", "delete_user", "view_user",
               "view_customer", "view_lead", "view_product", "view_ad",
               "view_contract"),

    "Operators": ("add_customer", "change_customer", "view_customer", "delete_customer", "add_lead",
                  "change_lead", "view_lead", "delete_lead", "view_ad", "view_product", "view_contract"),

    "Managers": ("add_contract", "change_contract", "view_contract", "delete_contract", "view_customer",
                 "view_lead", "view_ad", "view_product"),

    "Marketers": ("add_ad", "change_ad", "view_ad", "delete_ad", "change_product",
                  "add_product", "view_product", "view_customer", "view_contract", "view_lead"),
}


def check_group_name(group_name: str):
    if group_name not in GROUP_PERMS.keys():
        raise ValidationError("There is no such group")


class GroupDetailSerializer(ModelSerializer):
    permissions = SerializerMethodField("get_permissions", read_only=True)

    @extend_schema_field(ListField(child=CharField()))
    def get_permissions(self, group):
        return list(group.permissions.values_list("name", flat=True))

    class Meta:
        model = Group
        fields = ["name", "permissions"]


class GroupListSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = ["name"]


class UserSerializer(ModelSerializer):
    user_group = CharField(write_only=True, required=True, validators=[check_group_name])
    group = SerializerMethodField("serialize_group", read_only=True)
    email = EmailField(
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="User with this email already exists"
            )
        ]
    )

    @extend_schema_field(GroupListSerializer)
    def serialize_group(self, user):
        group = user.groups.first()
        return GroupListSerializer(group).data

    class Meta:
        model = User
        fields = ["pk", "username", "password", "email", "user_group", "group"]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        group_name = validated_data.pop("user_group")
        group, created = Group.objects.get_or_create(name=group_name)
        if created:
            for p in GROUP_PERMS.get(group_name):
                permission = Permission.objects.get(codename=p)
                group.permissions.add(permission)

        user = User.objects.create_user(**validated_data)
        user.groups.add(group)
        user.save()
        return user

    def update(self, instance, validated_data):
        group_name = validated_data.get("user_group")
        cur_group = instance.groups.first()

        with transaction.atomic():
            if cur_group.name != group_name:
                group, created = Group.objects.get_or_create(name=group_name)
                if created:
                    for p in GROUP_PERMS.get(group_name):
                        permission = Permission.objects.get(codename=p)
                        group.permissions.add(permission)

                instance.groups.remove(cur_group)
                instance.groups.add(group)

        return super().update(instance, validated_data)


class UserDetailSerializer(ModelSerializer):
    group = SerializerMethodField("serialize_group", read_only=True)

    @extend_schema_field(GroupDetailSerializer)
    def serialize_group(self, user):
        group = user.groups.first()
        return GroupDetailSerializer(group).data

    class Meta:
        model = User
        fields = ["pk", "username", "password", "email", "group"]


class CRMTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)  # Получаем стандартный токен

        group = Group.objects.get(user=user)
        token['user_group'] = group.name

        return token
