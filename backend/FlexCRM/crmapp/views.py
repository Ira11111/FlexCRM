from rest_framework.viewsets import ModelViewSet
from .models import Lead, Contract, Add, Product, Customer
from .serializers import (
    LeadSerializer,
    ContractSerializer,
    CustomerSerializer,
    AddSerializer,
    ProductSerializer,
)


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