from django.db import models
from djongo.models import DecimalField, FloatField, URLField
from djmoney.models.fields import MoneyField

# Create your models here.
class Parkings(models.Model):
    _id = models.CharField(max_length=100, primary_key=True)
    lmpPID = models.CharField(max_length=60)
    name = models.CharField(max_length=60)
    provider = models.CharField(max_length=60)
    PID = models.IntegerField()
    address =  models.CharField(max_length=500,null=True)
    lon = FloatField()
    lat = FloatField()
    country = models.CharField(max_length=160)
    region = models.CharField(max_length=160)
    area = models.CharField(max_length=160)
    who = models.CharField(max_length=160)
    is_used = models.BooleanField()
    cancelable = models.BooleanField()
    cancel_mn = models.IntegerField()
    cancel_msg = models.CharField(max_length=160)
    max_height = models.IntegerField()
    hour_price = models.CharField(max_length=160)
    day_price = FloatField()
    access_msg = models.CharField(max_length=500) 
    user_val = FloatField()
    lmp_val = FloatField()
    ben_val = FloatField()
    gen_val = FloatField()
    car_pc = models.CharField(max_length=160)
    human_pc = models.CharField(max_length=160)
    slug = models.CharField(max_length=160) 
    booking_url = models.CharField(max_length=250)
    #booking_url = models.URLField()
    
    
    class Meta:
        managed = False
        db_table = 'parkings'

    #  def str(self):
    #         return self.nombre