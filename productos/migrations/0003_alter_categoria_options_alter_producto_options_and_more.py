# Generated by Django 5.2.1 on 2025-05-28 17:43

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0002_categoria_producto_categoria'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='categoria',
            options={'ordering': ['nombre'], 'verbose_name_plural': 'Categorías'},
        ),
        migrations.AlterModelOptions(
            name='producto',
            options={'ordering': ['-creado']},
        ),
        migrations.AddField(
            model_name='producto',
            name='actualizado',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='producto',
            name='creado',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='producto',
            name='destacado',
            field=models.BooleanField(default=False),
        ),
    ]
