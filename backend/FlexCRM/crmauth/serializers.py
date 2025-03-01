from django.contrib.auth.models import User, Group, Permission
from rest_framework.serializers import ModelSerializer


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["pk", "username", "password", "email"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        admin_group, created = Group.objects.get_or_create(name="Admins")

        if created:
            for p in ("add_user", "change_user", "delete_user", "view_user"):
                permission = Permission.objects.get(code_name=p)
                admin_group.permissions.add(permission)

        user.groups.add(admin_group)
        return user
