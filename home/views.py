import time
from datetime import datetime, timedelta

from django.shortcuts import render
from django.views.generic import TemplateView

from .models import Sport, Venue


class Logo(TemplateView):
    def get(self, request):
        return render(request, 'logo.html')
    
class Home(TemplateView):
    def get(self, request):
        all_sports = Sport.objects.all()
        context = {"all_sports":all_sports}
        return render(request, 'home.html', context=context)
    

class ChooseVenue(TemplateView):
    def get(self, request):
        all_venues = Venue.objects.all()
        context = {"all_venues":all_venues}
        return render(request, 'chooseVenue.html', context=context)


class Book(TemplateView):
    def get(self, request):
        # 4 days
        # 5 pm to 12 am
        todayDate = datetime.today()
        # next4dates = range(todayDate.day, todayDate.day+4)
        context = {
            "next4dates":[todayDate + timedelta(days=x) for x in range(4)],
            "timeSlots":[(datetime(day=1,month=1,year=2023,hour=5,minute=0)+timedelta(minutes=30*x)).strftime("%H:%M") for x in range(15)],
            }
        return render(request, 'book.html', context=context)
    

class ContactUs(TemplateView):
    def get(self, request):
        return render(request, 'contactUs.html')