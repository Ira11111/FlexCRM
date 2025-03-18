from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class Product(models.Model):
    name = models.CharField(null=False, blank=False, max_length=50)
    description = models.TextField(blank=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)


class Add(models.Model):
    name = models.CharField(null=False, blank=False, max_length=50)
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    customers_count = models.IntegerField(default=0)
    profit = models.DecimalField(max_digits=10, decimal_places=2)
    product = models.ManyToManyField(Product)


class Lead(models.Model):
    first_name = models.CharField(null=False, blank=False, max_length=50)
    last_name = models.CharField(null=False, blank=False, max_length=50)
    phone = PhoneNumberField(null=False, blank=False)
    email = models.EmailField(null=False, blank=False)


class Customer(models.Model):
    is_active = models.BooleanField(default=True)
    name = models.CharField(null=False, blank=False, max_length=50)
    lead = models.OneToOneField(Lead, on_delete=models.CASCADE)
    adds = models.ManyToManyField(Add)


def cont_file_path(instance: "Contract", filename: str):
    return f"contracts/{filename}"


class Contract(models.Model):
    name = models.CharField(null=False, blank=False, max_length=50)
    start_date = models.DateField()
    end_date = models.DateField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    contr_file = models.FileField(upload_to=cont_file_path)
    company = models.ForeignKey(Customer, on_delete=models.DO_NOTHING, related_name='contracts')
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING, related_name='contracts')
