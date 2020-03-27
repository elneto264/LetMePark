from django.shortcuts import render,redirect
from django.urls import reverse_lazy
from django.http import HttpResponse
from django.views.generic import ListView,TemplateView,CreateView
from .models import EjemploDato
from django.db.models import Q

# Create your views here.

class Inicio(TemplateView):
    template_name= 'index.html'

    
def buscar(request):
    
    if request.GET["campobuscar"]: 
        q = request.GET["campobuscar"]
        print ('Entro en el if'+ q)
        #querys = (Q(direccion__nombre__icontains=q) | Q(longitud__latitud__icontains=q))
        #querys = Q(nombre__icontains=q)               
        #ejemplodato = EjemploDato.objects.filter(querys)
        ejemplodato = EjemploDato.objects.filter(direccion__icontains=q)
        return render(request, "resultadosbusqueda.html", {'busqueda': ejemplodato})
    else:
        mensaje="No has introducido nada"

    return HttpResponse(mensaje)    
    

''' def buscar(request):
    
    if request.GET["campobuscar"]:
        
        direccion= request.GET["campobuscar"]
        busqueda= EjemploDato.objects.filter(nombre__icontains=direccion) 
        return render(request,"resultadosbusqueda.html",{"busqueda": busqueda, "query":direccion})
    else:
        mensaje="No has introducido nada"

    return HttpResponse(mensaje) '''

