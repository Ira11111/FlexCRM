# Generated by Django 5.1.6 on 2025-03-10 06:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crmapp', '0003_remove_add_leads_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='contract',
            name='company',
            field=models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, to='crmapp.customer'),
            preserve_default=False,
        ),
    ]
