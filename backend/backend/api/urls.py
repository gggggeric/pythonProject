# pythonProject/backend/api/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('encrypt/', views.encrypt_view, name='encrypt'),
    path('decrypt/', views.decrypt_view, name='decrypt'),
]
