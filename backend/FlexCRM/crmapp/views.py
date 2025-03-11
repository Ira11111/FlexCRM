import os

from django.core.files.storage import default_storage
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
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
    filter_backends = [
        SearchFilter,
        OrderingFilter,
        DjangoFilterBackend
    ]
    ordering_fields = "name", "start_date", "end_date", "cost"
    search_fields = "name",


class CustomerViewSet(ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    filter_backends = [
        SearchFilter,
        OrderingFilter,
        DjangoFilterBackend
    ]
    ordering_fields = "name",
    search_fields = "name",
    filterset_fields = "is_active",


class ProductSetView(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    filter_backends = [
        SearchFilter,
        OrderingFilter,
        DjangoFilterBackend
    ]
    ordering_fields = "name", "cost"
    search_fields = "name", "description"
    filterset_fields = "is_active",


class AddSetView(ModelViewSet):
    queryset = Add.objects.all()
    serializer_class = AddSerializer

    filter_backends = [
        SearchFilter,
        OrderingFilter,
        DjangoFilterBackend
    ]
    ordering_fields = "name", "budget", "customers_count", "leads_count", "profit"
    search_fields = "name",
