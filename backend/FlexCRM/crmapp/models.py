from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class Lead(models.Model):
    first_name = models.CharField(null=False, blank=False, max_length=50)
    last_name = models.CharField(null=False, blank=False, max_length=50)
    phone = PhoneNumberField(null=False, blank=False)
    email = models.EmailField(null=False, blank=False)


class Customer(models.Model):
    is_active = models.BooleanField(default=True)
    name = models.CharField(null=False, blank=False, max_length=50)
    lead = models.OneToOneField(Lead, on_delete=models.DO_NOTHING)


class Product(models.Model):
    name = models.CharField(null=False, blank=False, max_length=50)
    description = models.TextField(blank=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)


class Add(models.Model):
    name = models.CharField(null=False, blank=False, max_length=50)
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    leads_count = models.IntegerField()
    customers_count = models.IntegerField()
    profit = models.DecimalField(max_digits=10, decimal_places=2)
    product = models.OneToOneField(Product, on_delete=models.DO_NOTHING)


def cont_file_path(instance: "Contract", filename: str):
    return f"contracts/{instance.pk}/{filename}"


class Contract(models.Model):
    name = models.CharField(null=False, blank=False, max_length=50)
    start_date = models.DateField()
    end_date = models.DateField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    contr_file = models.FileField(upload_to=cont_file_path)