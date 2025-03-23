import os

from django.core.files.storage import default_storage
from django.db.models import Count
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.request import HttpRequest
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Lead, Contract, Add, Product, Customer
from .serializers import (
    LeadSerializer,
    ContractSerializer,
    CustomerListSerializer,
    AddSerializer,
    ProductSerializer,
    CustomerDetailSerializer,
    CustomerCreateSerializer,
)


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
    search_fields = "name", "company", "product"
    

class CustomerViewSet(ModelViewSet):
    queryset = Customer.objects.all()
    filter_backends = [
        SearchFilter,
        OrderingFilter,
        DjangoFilterBackend
    ]
    ordering_fields = "name",
    search_fields = "name", "description"
    filterset_fields = "is_active",

    def get_queryset(self):
        if self.action in ('list', 'destroy'):
            return Customer.objects.only("id", "name").all()

        if self.action in ('update', 'partial_update', 'retrieve'):
            return Customer.objects.select_related('lead').prefetch_related('adds').all()

    def get_serializer_class(self):
        if self.action in ('list', 'destroy'):
            return CustomerListSerializer
        elif self.action in ('update', 'partial_update', 'create'):
            return CustomerCreateSerializer
        elif self.action == 'retrieve':
            return CustomerDetailSerializer


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


class StatisticsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request: HttpRequest) -> Response:
        annotate_customers = Customer.objects.annotate(contract_count=Count('contracts'))
        annotate_products = Product.objects.annotate(contract_count=Count('contracts'))

        customers = list(annotate_customers.order_by("-contract_count").all()[:10])
        products = list(annotate_products.order_by("-contract_count").all()[:10])
        adds_customers = list(Add.objects.order_by("-customers_count").all()[:10])
        adds_profit = list(Add.objects.order_by("-profit").all()[:10])

        statistics = {
            "adds_customers": AddSerializer(adds_customers, many=True).data,
            "adds_profit": AddSerializer(adds_profit, many=True).data,
            "customers": CustomerListSerializer(customers, many=True).data,
            "products": ProductSerializer(products, many=True).data,
        }
        return Response(statistics)
