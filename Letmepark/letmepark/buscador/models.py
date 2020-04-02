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
        return self.nombre """