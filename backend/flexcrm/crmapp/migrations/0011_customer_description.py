# Generated by Django 5.1.6 on 2025-03-18 14:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crmapp', '0010_alter_contract_company_alter_contract_product'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='description',
            field=models.TextField(blank=True, max_length=1000, null=True),
        ),
    ]
