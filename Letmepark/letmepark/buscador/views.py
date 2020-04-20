from django.http import HttpResponse
from django.views.generic import TemplateView
from .models import Parkings
from django.core import serializers

# Create your views here.

class Inicio(TemplateView):
    template_name= 'index.html'


class BusquedaAjax(TemplateView):
    model = Parkings

    def get(self, request, *args, **kwargs):

        lon1 = request.GET['lon1']
        lon2 = request.GET['lon2']  
        lat1 = request.GET['lat1']  
        lat2 = request.GET['lat2']   

        kwargs = {'lon__gte': lon1,'lon__lte': lon2,'lat__gte': lat1,'lat__lte': lat2} 
        parking = Parkings.objects.filter(**kwargs)   
            
        data = serializers.serialize('json',parking,fields=('name','provider','lmpPID','address','lon','lat', 'country', 'region', 'area', 'PID', 'who', 'is_used', 'cancelable', 'cancel_mn', 'cancel_msg', 'max_height', 'hour_price', 'day_price', 'access_msg', 'user_val', 'lmp_val', 'ben_val', 'gen_val', 'car_pc', 'human_pc', 'slug','booking_url'))
        #data = serializers.serialize('json',parking,fields=('name','provider','lmpPID','address','lon','lat', 'country', 'region', 'area'))
        return HttpResponse(data, content_type='application/json')      