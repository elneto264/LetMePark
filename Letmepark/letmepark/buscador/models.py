from django.db import models

# Create your models here.
class EjemploDato(models.Model):
    id = models.AutoField(primary_key = True)
    nombre = models.CharField(max_length=20,null=True)
    latitud = models.DecimalField(max_digits=22, decimal_places=16, null=True)
    longitud = models.DecimalField(max_digits=22, decimal_places=16, null=True)
    direccion =  models.CharField(max_length=500,null=True)
    
    def __str__(self):
        return self.nombre