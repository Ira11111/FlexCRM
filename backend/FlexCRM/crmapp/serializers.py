from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer, IntegerField
from .models import Lead, Customer, Add, Contract, Product
from django.db.models import F


class LeadSerializer(ModelSerializer):
    class Meta:
        model = Lead
        fields = "id", "first_name", "last_name", "phone", "email"
        extra_kwargs = {
            "id": {"read_only": True}
        }


class CustomerSerializer(ModelSerializer):
    contracts = IntegerField(read_only=True, source='contract_count')
    adds = PrimaryKeyRelatedField(queryset=Add.objects.only("pk", "customers_count").all(), many=True)

    class Meta:
        model = Customer
        fields = ["id", "name", "lead", "is_active", "adds", "contracts"]

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
        fields = ("id", "name", "budget", "customers_count",
                  "profit", "product")


class ContractSerializer(ModelSerializer):
    class Meta:
        model = Contract
        fields = "id", "name", "start_date", "end_date", "cost", "contr_file", "company", "product"


class ProductSerializer(ModelSerializer):
    contracts = IntegerField(read_only=True, source='contract_count')

    class Meta:
        model = Product
        fields = ["id", "name", "description", "cost", "is_active", "contracts"]
