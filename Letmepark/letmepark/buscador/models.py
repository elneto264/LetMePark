<<<<<<< HEAD
from django.db import models

# Create your models here.
class Parkings(models.Model):
    _id = models.CharField(max_length=100, primary_key=True)
    lmpPID = models.CharField(max_length=60)
    name = models.CharField(max_length=60)
    provider = models.CharField(max_length=60)
    """ id = models.AutoField(primary_key = True)
    nombre = models.CharField(max_length=20,null=True)
    latitud = models.DecimalField(max_digits=22, decimal_places=16, null=True)
    longitud = models.DecimalField(max_digits=22, decimal_places=16, null=True)
    direccion =  models.CharField(max_length=500,null=True) """
    
    class Meta:
        managed = False
        db_table = 'parkings'
    
    """ def __str__(self):
=======
from django.db import models

# Create your models here.
class Parkings(models.Model):
    _id = models.CharField(max_length=100, primary_key=True)
    lmpPID = models.CharField(max_length=60)
    name = models.CharField(max_length=60)
    provider = models.CharField(max_length=60)
    address =  models.CharField(max_length=500,null=True)
    lon = models.DecimalField(max_digits=22, decimal_places=16, null=True)
    lat = models.DecimalField(max_digits=22, decimal_places=16, null=True)
    
    
    class Meta:
        managed = False
        db_table = 'parkings'
    
    """ def __str__(self):
<<<<<<< HEAD
        return self.nombre 
        
        
    address = models.CharField(max_length=160)
    lon = models.CharField(max_length=160)
    lat = models.CharField(max_length=160)
    lat = models.CharField(max_length=160)
    country = models.CharField(max_length=160)
    region = models.CharField(max_length=160)
    area = models.CharField(max_length=160)
    address = models.CharField(max_length=160)
    lon = models.CharField(max_length=160)
    lat = models.CharField(max_length=160)
    who = models.CharField(max_length=160)
    is_used = models.CharField(max_length=160)
    cancelable = models.CharField(max_length=160)
    cancel_mn = models.CharField(max_length=160)
    
    {
        
    PID = models.CharField(max_length=160)
    country = models.CharField(max_length=160)
    region = models.CharField(max_length=160)
    area = models.CharField(max_length=160)
    address = models.CharField(max_length=160)
    lon = models.CharField(max_length=160)
    lat = models.CharField(max_length=160)
    
    
    "created":"",
    "updated":"",
    who = models.CharField(max_length=160)
    is_used = models.CharField(max_length=160)
    cancelable = models.CharField(max_length=160)
    cancel_mn = models.CharField(max_length=160)
    "cancel_msg":"La reserva puede ser cancelada o modificada hasta 25 horas antes del inicio.",
    "max_height":{"$numberInt":"200"},
    "hour_price":"",
    "day_price":{"$numberDouble":"14.25"},
    "access_msg":"Cuando entres en el parking, recoge el ticket y enseñalo con tu código de reserva en la caja central. (Planta 0). No abre 24h. Tiene acceso para personas discapacitadas. En caso de exceder el tiempo de estacionamiento, te invitamos a abonarlo directamente en el parking, según la tarifa horaria en vigor.",
    "user_val":{"$numberInt":"3"},
    "lmp_val":{"$numberInt":"4"},
    "ben_val":{"$numberInt":"2"},
    "gen_val":{"$numberDouble":"3.2"},
    "car_pc":"",
    "human_pc":"",
    "slug":"parking-placegar-parque-das-nacoes",
    "booking_url":"https://parkimeter.com/parking-lisboa/parking-placegar-parque-das-nacoes",
    }
    """
=======
>>>>>>> Desarollo
        return self.nombre """
>>>>>>> Desarollo
