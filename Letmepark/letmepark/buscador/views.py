from django.shortcuts import render,redirect
from django.urls import reverse_lazy
from django.http import HttpResponse
from django.views.generic import ListView,TemplateView,CreateView

# Create your views here.

class Inicio(TemplateView):
    template_name= 'index.html'