# Generated by Django 2.2.10 on 2020-04-20 06:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Parkings',
            fields=[
                ('_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('lmpPID', models.CharField(max_length=60)),
                ('name', models.CharField(max_length=60)),
                ('provider', models.CharField(max_length=60)),
                ('address', models.CharField(max_length=500, null=True)),
                ('lon', models.FloatField()),
                ('lat', models.FloatField()),
                ('country', models.CharField(max_length=160)),
                ('region', models.CharField(max_length=160)),
                ('area', models.CharField(max_length=160)),
                ('PID', models.CharField(max_length=160)),
                ('who', models.CharField(max_length=160)),
            ],
            options={
                'db_table': 'parkings',
                'managed': False,
            },
        ),
    ]
