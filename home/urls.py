from django.urls import path

from .views import Book, ChooseVenue, ContactUs, Home, Logo

urlpatterns = [
    path('', Logo.as_view(), name='Logo'),
    path('home', Home.as_view(), name='Home'),
    path('chooseVenue', ChooseVenue.as_view(), name='ChooseVenue'),
    path('book', Book.as_view(), name='Book'),
    path('contactUs', ContactUs.as_view(), name='ContactUs'),


]
