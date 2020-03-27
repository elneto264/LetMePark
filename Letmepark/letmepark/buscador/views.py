from django.shortcuts import render,redirect
from django.urls import reverse_lazy
from django.http import HttpResponse
from django.views.generic import ListView,TemplateView,CreateView
from .models import EjemploDato
from django.db.models import Q

# Create your views here.

class Inicio(TemplateView):
    template_name= 'index.html'

    
""" def buscar(request):
    
    if request.GET["buscar"]:
        #mensaje="Articulo buscado: %r" %request.GET["prd"]
        direccion= request.GET["buscar"]
        busqueda= EjemploDato.objects.filter(nombre__icontains=direccion) #icontains es como el like de sql asi: like nombre ="raqueta"
        return render(request,"resultadosbusqueda.html",{"busqueda": busqueda, "query":direccion})
    else:
        mensaje="No has introducido nada"

    return HttpResponse(mensaje) """


# def buscar(request):
#     queryset = request.GET.get("buscar")
#     #EjemploDato = EjemploDato.objects.filter(estado = True)
#     if queryset:
#         dato = EjemploDato.objects.filter(
#             Q(nombre__icontains = queryset) |
#             Q(direccion__icontains = queryset)
#         )
#         return render(request, 'resultadosbusqueda.html',{'dato':dato})
#     else: 
#         mensaje ="No encontrado"
#     return HttpResponse(mensaje)




def buscar(request):
    
    if request.GET["campobuscar"]: 
        q = request.GET["campobuscar"]
        print ('Entro en el if'+ q)
        #querys = (Q(direccion__nombre__icontains=q) | Q(longitud__latitud__icontains=q))
        #querys = Q(nombre__icontains=q)               
        #ejemplodato = EjemploDato.objects.filter(querys)
        ejemplodato = EjemploDato.objects.filter(
            Q(nombre__icontains = q) |
            Q(direccion__icontains = q)|
            Q(latitud__icontains = q)|
            Q(longitud__icontains = q)
        ).distinct()
        return render(request, "resultadosbusqueda.html", {'busqueda': ejemplodato})
    else:
        mensaje="No has introducido nada"

    return HttpResponse(mensaje) 