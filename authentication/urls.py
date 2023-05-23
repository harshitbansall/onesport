from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from .views import (ObtainTokenPairWithColorView, UpdatePassword,
                    UpdateProfile, UserCreate, authLogin, authLogout)

urlpatterns = [
    path('token/obtain', ObtainTokenPairWithColorView.as_view(), name='token_create'),
    path('login', authLogin.as_view(), name='login'),
    path('logout', authLogout.as_view(), name='login'),
    path('updateProfile', UpdateProfile.as_view(), name='updateProfile'),
    path('updatePassword', UpdatePassword.as_view(), name='updatePassword'),
    path('signup', UserCreate.as_view(), name='userCreate'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
