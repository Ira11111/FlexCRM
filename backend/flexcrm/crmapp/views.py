import os

from django.core.files.storage import default_storage
from django.db.models import Count
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.request import HttpRequest
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Lead, Contract, Add, Product, Customer
from .serializers import (
    LeadSerializer,
    ContractCreateSerializer,
    ContractListSerializer,
    ContractDetailSerializer,
    CustomerListSerializer,
    ProductSerializer,
    CustomerDetailSerializer,
    CustomerCreateSerializer,
    AddListSerializer,
    AddDetailSerializer,
    AddCreateSerializer,
)


class LeadViewSet(ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer


class CustomerViewSet(ModelViewSet):
    serializer_class = CustomerListSerializer
    queryset = Customer.objects.select_related('lead').prefetch_related('adds').all()
    filter_backends = [
        SearchFilter,
        OrderingFilter,
        DjangoFilterBackend
    ]
    ordering_fields = "name",
    search_fields = "name", "description"
    filterset_fields = "is_active",

    def get_queryset(self):
        if self.action == 'list':
            return Customer.objects.only("id", "name").all()
        return super().get_queryset()

    def get_serializer_class(self):
        if self.action == 'list':
            return CustomerListSerializer
        elif self.action == 'retrieve':
            return CustomerDetailSerializer
        elif self.action in ('update', 'partial_update', 'create'):
            return CustomerCreateSerializer

        return super().get_serializer_class()

    def perform_destroy(self, instance):
        instance.lead.delete()
        instance.delete()

    def get_search_fields(self):
        if self.action == "contracts":
            return ["name"]
        elif self.action == "products":
            return ["name", "description"]
        elif self.action == "adds":
            return ["name"]
        return super().get_search_fields()

    def get_ordering_fields(self):
        if self.action == "contracts":
            return ["name", "start_date", "end_date", "cost"]
        elif self.action == "products":
            return ["name", "cost"]
        elif self.action == "adds":
            return ["name", "budget", "profit"]
        return super().get_ordering_fields()

    def get_filterset_fields(self):
        if self.action == "contracts":
            return []
        elif self.action == "products":
            return ["is_active"]
        elif self.action == "adds":
            return []
        return super().get_filterset_fields()

    @action(detail=True, methods=["get"])
    def contracts(self, request, pk=None):
        customer = self.get_object()
        contracts = Contract.objects.filter(company=customer).only("id", "name", "start_date", "end_date", "cost").all()

        contracts = self.filter_queryset(contracts)

        page = self.paginate_queryset(contracts)

        if page is not None:
            serializer = ContractListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        return Response(ContractListSerializer(contracts, many=True).data)

    @action(detail=True, methods=["get"])
    def products(self, request, pk=None):
        customer = self.get_object()

        products = Product.objects.filter(contracts__company=customer).distinct()
        products = self.filter_queryset(products)

        page = self.paginate_queryset(products)

        if page is not None:
            serializer = ProductSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        return Response(ProductSerializer(products, many=True).data)

    @action(detail=True, methods=["get"])
    def adds(self, request, pk=None):
        customer = self.get_object()
        adds = customer.adds.all()

        adds = self.filter_queryset(adds)

        page = self.paginate_queryset(adds)

        if page is not None:
            serializer = AddListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        return Response(AddListSerializer(adds, many=True).data)

    @action(detail=True, methods=["get"])
    def statistics(self, request, pk=None):
        customer = self.get_object()
        contract_count = Contract.objects.filter(company=customer).count()
        adds_count = customer.adds.count()

        return Response({"contract_count": contract_count, "adds_count": adds_count})


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

    @action(detail=True, methods=["get"])
    def adds(self, request, pk=None):
        product = self.get_object()
        adds = Add.objects.filter(product=product).all()

        page = self.paginate_queryset(adds)

        if page is not None:
            serializer = AddListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        return Response(AddListSerializer(adds, many=True).data)


class AddSetView(ModelViewSet):
    queryset = Add.objects.all()
    serializer_class = AddCreateSerializer

    filter_backends = [
        SearchFilter,
        OrderingFilter,
        DjangoFilterBackend
    ]
    ordering_fields = "name", "budget", "profit"
    search_fields = "name",

    def get_queryset(self):
        if self.action == 'list':
            return Add.objects.only("name", "budget", "profit").all()
        elif self.action == 'retrieve':
            return Add.objects.prefetch_related("product").all()
        return super().get_queryset()

    def get_serializer_class(self):
        if self.action == 'list':
            return AddListSerializer
        elif self.action == 'retrieve':
            return AddDetailSerializer
        return super().get_serializer_class()


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
    serializer_class = ContractCreateSerializer
    filter_backends = [
        SearchFilter,
        OrderingFilter,
        DjangoFilterBackend
    ]
    ordering_fields = "name", "start_date", "end_date", "cost"
    search_fields = "name",

    def get_queryset(self):
        if self.action == 'list':
            return Contract.objects.only("id", "name", "start_date", "end_date", "cost").all()
        elif self.action == 'retrieve':
            return Contract.objects.select_related("company").select_related("product").all()
        return super().get_queryset()

    def get_serializer_class(self):
        if self.action == 'list':
            return ContractListSerializer
        elif self.action == 'retrieve':
            return ContractDetailSerializer

        return super().get_serializer_class()


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
            "adds_customers": AddListSerializer(adds_customers, many=True).data,
            "adds_profit": AddListSerializer(adds_profit, many=True).data,
            "customers": CustomerListSerializer(customers, many=True).data,
            "products": ProductSerializer(products, many=True).data,
        }
        return Response(statistics)
