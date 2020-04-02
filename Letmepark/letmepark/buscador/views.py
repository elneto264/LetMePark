from django.shortcuts import render,redirect
from django.urls import reverse_lazy
from django.http import HttpResponse
from django.views.generic import ListView,TemplateView,CreateView
from .models import Parkings
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


class Buscar(ListView):
    model = Parkings
    template_name = 'resultadosbusqueda.html'

    def get_queryset(self):
        query = self.request.GET.get('campobuscar')
        if query:
            object_list = self.model.objects.filter(
                  Q(name__icontains = query) |
                  Q(provider__icontains = query)|
                  Q(lmpPID__icontains  = query)
                  #Q(longitud__icontains = query)
            ).distinct()
            return object_list
        else:
            return self.model.objects.none()

    def get_context_data(self,**kwargs):
        contexto = {}
        contexto['busqueda'] = self.get_queryset()
        return contexto

    def get(self,request,*args,**kwargs):
        return render(request,self.template_name,self.get_context_data())    

