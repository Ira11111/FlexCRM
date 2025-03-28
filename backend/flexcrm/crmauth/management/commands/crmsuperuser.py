from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission, User
from rest_framework_simplejwt.tokens import RefreshToken


class Command(BaseCommand):
    help = 'Создает пользователя со всеми разрешениями в приложении'

    def add_arguments(self, parser):
        # Обязательные аргументы
        parser.add_argument('username', type=str, help='Имя пользователя')
        parser.add_argument('password', type=str, help='Пароль')

    def handle(self, *args, **options):
        username = options['username']
        password = options['password']
        if User.objects.filter(username=username).exists():
            self.stderr.write("Пользователь с таким username существует")
            return

        user = User.objects.create_user(
            username=username,
            password=password
        )
        group, created = Group.objects.get_or_create(name="super_group")

        if created:
            for permission in Permission.objects.all():
                group.permissions.add(permission)

        user.groups.add(group)
        user.save()

        token = RefreshToken.for_user(user)
        token['user_group'] = 'super_group'

        self.stdout.write("Пользователь создан!")
