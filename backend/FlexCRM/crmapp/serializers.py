from drf_spectacular.utils import extend_schema_field
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer, IntegerField, SerializerMethodField
from .models import Lead, Customer, Add, Contract, Product


class AddListSerializer(ModelSerializer):
    class Meta:
        model = Add
        fields = ["id", "name"]


class AddSerializer(ModelSerializer):
    class Meta:
        model = Add
        fields = ("id", "name", "budget", "customers_count",
                  "profit", "product")


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
    adds = PrimaryKeyRelatedField(queryset=Add.objects.only("pk", "customers_count").all(), many=True)

    class Meta:
        model = Customer
        fields = ["id", "name", "description", "lead", "adds"]

    def create(self, validated_data):
        adds_data = validated_data.get("adds", [])
        if adds_data:
            for add in adds_data:
                add.customers_count += 1
            Add.objects.bulk_update(adds_data, ["customers_count"])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        new_data = validated_data.get("adds", [])
        print(new_data)

        cur_data = instance.adds.all()
        remove_adds = list(set(cur_data).difference(set(new_data)))
        additional_adds = list(set(new_data).difference(set(cur_data)))

        for add in remove_adds:
            add.customers_count -= 1

        for add in additional_adds:
            add.customers_count += 1

        Add.objects.bulk_update(additional_adds, ["customers_count"])
        Add.objects.bulk_update(remove_adds, ["customers_count"])

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
        fields = ["name", "description", "lead_info", "is_active", "adds_info", "contracts_amount"]


class ContractSerializer(ModelSerializer):
    class Meta:
        model = Contract
        fields = "name", "start_date", "end_date", "cost", "contr_file", "company", "product"


class ProductSerializer(ModelSerializer):
    contracts_amount = IntegerField(read_only=True, source='contract_count')

    class Meta:
        model = Product
        fields = ["id", "name", "description", "cost", "is_active", "contracts_amount"]
