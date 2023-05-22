from django.db import models

# Create your models here.

class Sport(models.Model):
    name = models.CharField(max_length=100)
    # type = models.CharField(max_length=100)
    # content = models.CharField(max_length=100)
    # poster_path = models.CharField(max_length=100)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'sports'

    def __str__(self):
        return '{}'.format(self.name)
    
class Venue(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    google_map_id = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=100)
    # content = models.CharField(max_length=100)
    # poster_path = models.CharField(max_length=100)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'venues'

    def __str__(self):
        return '{}'.format(self.name)