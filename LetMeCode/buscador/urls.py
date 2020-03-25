from django.urls import path, include
from .views import *
from buscador.views import Inicio



urlpatterns = [
    path('',Inicio.as_view(), name= 'index'),
   
]