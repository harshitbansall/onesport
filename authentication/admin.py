from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import User
class UserAdmin(admin.ModelAdmin):
    list_display = ('username','full_name','date_joined','is_superuser',)
    readonly_fields = ('id',)
    model = User

admin.site.register(User,UserAdmin)