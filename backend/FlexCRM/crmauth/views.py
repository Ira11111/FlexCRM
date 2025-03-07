from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from django.contrib.auth.models import User, Group, Permission

GROUP_PERMS = {
    "Admins": ("add_user", "change_user", "delete_user", "view_user"),
    "Operators": ("add_customer", "change_customer", "view_customer"),
    "Managers": ("add_contract", "change_contract", "view_contract"),
    "Marketers": ("add_add", "change_add", "view_add", "change_product", "add_product", "view_product"),
}


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        new_user = serializer.save()
        user_group_name = request.data.get("user_group")

        if self.request.user.is_authenticated:
            if not request.user.groups.filter(name="Admins").exists():
                return Response({"detail": "Only admins can add new users"}, status=status.HTTP_403_FORBIDDEN)

        user_group, created = Group.objects.get_or_create(name=user_group_name)
        if created:
            for p in GROUP_PERMS.get(user_group_name):
                permission = Permission.objects.get(codename=p)
                user_group.permissions.add(permission)

        new_user.groups.add(user_group)

        user_serializer = self.serializer_class(new_user)
        return Response({"user": user_serializer.data}, status=status.HTTP_201_CREATED)
