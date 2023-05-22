from django.contrib import admin

# Register your models here.
from .models import Sport, Venue

admin.site.register(Sport)
admin.site.register(Venue)
