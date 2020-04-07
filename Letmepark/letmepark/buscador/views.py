from django.shortcuts import render,redirect
from django.urls import reverse_lazy
from django.http import HttpResponse
from django.views.generic import ListView,TemplateView,CreateView
from .models import Parkings
from django.db.models import Q
from django.core import serializers

# Create your views here.

class Inicio(TemplateView):
    template_name= 'index.html'

''' class ListaAjax(ListView):
    model = Parkings
    template_name='busquedaAjax.html'
        
    def get_context_data(self, **kwargs):
            context = super(ListaAjax, self).get_context_data(**kwargs)
            context['parking'] = Parkings.objects.all()
            return context '''

class BusquedaAjax(TemplateView):
    model = Parkings
    #template_name='index.html'

    def get(self, request, *args, **kwargs):
        id_tipo = request.GET['direccion']
        print (id_tipo+"entra al id tipo")
        parking = Parkings.objects.filter(
            Q(name__icontains = id_tipo)|
            Q(provider__icontains = id_tipo)
            ).distinct()
        data = serializers.serialize('json',parking,fields=('name','provider','lmpPID','address','lon','lat'))
        print(data + "entra al data del view")
        return HttpResponse(data, content_type='application/json')      