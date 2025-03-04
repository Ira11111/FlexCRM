import os

from django.core.files.storage import default_storage
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.viewsets import ModelViewSet
from .models import Lead, Contract, Add, Product, Customer
from .serializers import (
    LeadSerializer,
    ContractSerializer,
    CustomerSerializer,
    AddSerializer,
    ProductSerializer,
)


@receiver(post_save, sender=Contract)
def make_new_file_path(sender, instance, created, **kwargs):
    if created and instance.contr_file:
        old_path = instance.contr_file.name
        new_path = "contracts/contract_{pk}/{filename}".format(
            pk=instance.pk,
            filename=os.path.basename(old_path),
        )
        default_storage.save(new_path, default_storage.open(old_path))
        default_storage.delete(old_path)

        instance.contr_file.name = new_path
        instance.save(update_fields=['contr_file'])


class LeadViewSet(ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer


class ContractViewSet(ModelViewSet):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer


class CustomerViewSet(ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def get_queryset(self):
        if self.action == 'list':
            return Customer.objects.filter(is_active=True).all()

        elif self.action in ['update', 'partial_update', 'retrieve']:
            return Customer.objects.all()

        return Customer.objects.none()


class ProductSetView(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        if self.action == 'list':
            return Product.objects.filter(is_active=True).all()

        elif self.action in ['update', 'partial_update', 'retrieve']:
            return Product.objects.all()

        return Product.objects.none()


class AddSetView(ModelViewSet):
    queryset = Add.objects.all()
    serializer_class = AddSerializer