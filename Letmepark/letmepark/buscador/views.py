from django.http import HttpResponse
from django.views.generic import TemplateView
from .models import Parkings
<<<<<<< HEAD
from django.db.models import Q
=======
>>>>>>> Desarollo
from django.core import serializers

# Create your views here.

class Inicio(TemplateView):
    template_name= 'index.html'

<<<<<<< HEAD
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
=======

class BusquedaAjax(TemplateView):
    model = Parkings

    def get(self, request, *args, **kwargs):

        lon1 = request.GET['lon1']
        lon2 = request.GET['lon2']  
        lat1 = request.GET['lat1']  
        lat2 = request.GET['lat2']   

        kwargs = {'lon__gte': lon1,'lon__lte': lon2,'lat__gte': lat1,'lat__lte': lat2} 
        parking = Parkings.objects.filter(**kwargs)   
            
        data = serializers.serialize('json',parking,fields=('name','provider','lmpPID','address','lon','lat'))
>>>>>>> Desarollo
        return HttpResponse(data, content_type='application/json')      