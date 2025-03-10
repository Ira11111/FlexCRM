from rest_framework.serializers import ModelSerializer
from .models import Lead, Customer, Add, Contract, Product


class LeadSerializer(ModelSerializer):
    class Meta:
        model = Lead
        fields = "first_name", "last_name", "phone", "email",


class CustomerSerializer(ModelSerializer):
    class Meta:
        model = Customer
        fields = "name", "lead", "is_active"


class AddSerializer(ModelSerializer):
    class Meta:
        model = Add
        fields = ("name", "budget", "customers_count",
                  "profit", "product")


class ContractSerializer(ModelSerializer):
    class Meta:
        model = Contract
        fields = "name", "start_date", "end_date", "cost", "contr_file", "company"


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = "name", "description", "cost", "is_active",
