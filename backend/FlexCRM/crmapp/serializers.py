from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer
from .models import Lead, Customer, Add, Contract, Product
from django.db.models import F


class LeadSerializer(ModelSerializer):
    class Meta:
        model = Lead
        fields = "first_name", "last_name", "phone", "email",


class CustomerSerializer(ModelSerializer):
    adds = PrimaryKeyRelatedField(queryset=Add.objects.only("pk", "customers_count").all(), many=True)

    class Meta:
        model = Customer
        fields = "name", "lead", "is_active", "adds"

    def create(self, validated_data):
        adds_data = validated_data.get("adds", [])
        if adds_data:
            for add in adds_data:
                add.customers_count += 1
            Add.objects.bulk_update(adds_data, ["customers_count"])

        return super().create(validated_data)


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
