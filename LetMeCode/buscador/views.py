
from django.shortcuts import render, redirect
from django.views.generic import ListView, View, TemplateView
from django.urls import reverse_lazy
from django.http import HttpResponse

class Inicio(TemplateView):
    template_name = 'index.html'
    


