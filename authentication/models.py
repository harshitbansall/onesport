from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    first_name = None
    last_name = None
    full_name = models.CharField(max_length = 100, blank = True, null = True)
    raw_password = models.CharField(max_length = 30, blank=True, null=True)
    mobile_number = models.CharField(max_length = 10, blank = True, null = True)
    is_email_verified = models.BooleanField(default=False)
    is_mobile_verified = models.BooleanField(default=False)
    class Meta:
        db_table = 'users'
    def __str__(self):
        return '{}'.format(self.full_name)
