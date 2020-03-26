from django.shortcuts import render,redirect
from django.urls import reverse_lazy
from django.http import HttpResponse
from django.views.generic import ListView,TemplateView,CreateView
from .models import EjemploDato

# Create your views here.

class Inicio(TemplateView):
    template_name= 'index.html'

    
def buscar(request):
    
    if request.GET["buscar"]:
        #mensaje="Articulo buscado: %r" %request.GET["prd"]
        direccion= request.GET["buscar"]
        busqueda= EjemploDato.objects.filter(nombre__icontains=direccion) #icontains es como el like de sql asi: like nombre ="raqueta"
        return render(request,"resultadosbusqueda.html",{"busqueda": busqueda, "query":direccion})
    else:
        mensaje="No has introducido nada"

    return HttpResponse(mensaje)