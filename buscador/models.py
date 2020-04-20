from django.db import models
from djongo.models import DecimalField, FloatField

# Create your models here.
class Parkings(models.Model):
    _id = models.CharField(max_length=100, primary_key=True)
    lmpPID = models.CharField(max_length=60)
    name = models.CharField(max_length=60)
    provider = models.CharField(max_length=60)
    address =  models.CharField(max_length=500,null=True)
    lon = FloatField()
    lat = FloatField()
    
    
    class Meta:
        managed = False
        db_table = 'parkings'