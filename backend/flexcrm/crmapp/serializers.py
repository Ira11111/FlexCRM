from drf_spectacular.utils import extend_schema_field
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer, IntegerField, SerializerMethodField
from django.db import transaction
from .models import Lead, Customer, Ad, Contract, Product


class AddListSerializer(ModelSerializer):
    class Meta:
        model = Ad
        fields = ["id", "name", "profit", "customers_count"]


class AddCreateSerializer(ModelSerializer):
    class Meta:
        model = Ad
        fields = ("id", "name", "budget", "customers_count",
                  "profit", "product")


class AddDetailSerializer(ModelSerializer):
    products_info = SerializerMethodField("serialize_product")

    @extend_schema_field("ProductSerializer")
    def serialize_product(self, customer):
        return ProductSerializer(customer.product.all(), many=True).data

    class Meta:
        model = Ad
        fields = ("id", "name", "budget", "customers_count",
                  "profit", "products_info")


class LeadSerializer(ModelSerializer):
    class Meta:
        model = Lead
        fields = "id", "first_name", "last_name", "phone", "email"
        extra_kwargs = {
            "id": {"read_only": True}
        }


class CustomerListSerializer(ModelSerializer):
    class Meta:
        model = Customer
        fields = ["id", "name"]


class CustomerCreateSerializer(ModelSerializer):
    adds = PrimaryKeyRelatedField(queryset=Ad.objects.only("pk", "customers_count").all(), many=True)

    class Meta:
        model = Customer
        fields = ["id", "description", "name", "lead", "is_active", "adds", "contracts"]

    def create(self, validated_data):
        adds_data = validated_data.get("adds", [])
        with transaction.atomic():
            if adds_data:
                for add in adds_data:
                    add.customers_count += 1
                Ad.objects.bulk_update(adds_data, ["customers_count"])
            return super().create(validated_data)

    def update(self, instance, validated_data):
        new_data = validated_data.get("adds", [])
        cur_data = instance.adds.all()
        remove_adds = list(set(cur_data).difference(set(new_data)))
        additional_adds = list(set(new_data).difference(set(cur_data)))

        with transaction.atomic():
            for add in remove_adds:
                add.customers_count -= 1

            for add in additional_adds:
                add.customers_count += 1

            Ad.objects.bulk_update(additional_adds, ["customers_count"])
            Ad.objects.bulk_update(remove_adds, ["customers_count"])

            return super().update(instance, validated_data)


class CustomerDetailSerializer(ModelSerializer):
    contracts_amount = IntegerField(read_only=True, source='contract_count')
    lead_info = SerializerMethodField("serialize_lead")
    adds_info = SerializerMethodField("serialize_add")

    @extend_schema_field(LeadSerializer)
    def serialize_lead(self, customer):
        return LeadSerializer(customer.lead).data

    @extend_schema_field(AddListSerializer)
    def serialize_add(self, customer):
        return AddListSerializer(customer.adds.only("id", "name").all(), many=True).data

    class Meta:
        model = Customer
        fields = ["id", "name", "description", "lead_info", "is_active", "adds_info", "contracts_amount"]


class ProductSerializer(ModelSerializer):
    contracts_amount = IntegerField(read_only=True, source='contract_count')

    class Meta:
        model = Product
        fields = ["id", "name", "description", "cost", "is_active", "contracts_amount"]


class ContractCreateSerializer(ModelSerializer):
    class Meta:
        model = Contract
        fields = "name", "start_date", "end_date", "cost", "contr_file", "company", "product"

    def create(self, validated_data):
        product = validated_data.get("product", None)
        company = validated_data.get("company", None)
        contract_cost = validated_data.get("cost", 0)
        with transaction.atomic():
            adds_data = company.adds.all()
            if len(adds_data) != 0 and contract_cost > 0:
                for ad in adds_data:
                    if product in ad.product.all():
                        ad.profit += contract_cost

            Ad.objects.bulk_update(adds_data, ["profit"])
            return super().create(validated_data)


class ContractListSerializer(ModelSerializer):
    class Meta:
        model = Contract
        fields = "id", "name", "start_date", "end_date", "cost"


class ContractDetailSerializer(ModelSerializer):
    customer_info = SerializerMethodField("serialize_customer")
    product_info = SerializerMethodField("serialize_product")

    @extend_schema_field(CustomerListSerializer)
    def serialize_customer(self, contract):
        return CustomerListSerializer(contract.company).data

    @extend_schema_field(ProductSerializer)
    def serialize_product(self, customer):
        return ProductSerializer(customer.product).data

    class Meta:
        model = Contract
        fields = "id", "name", "start_date", "end_date", "cost", "contr_file", "customer_info", "product_info"
