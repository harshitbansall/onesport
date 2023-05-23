import json
from os import access

import requests
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import HttpResponse, redirect, render
from django.views.generic import TemplateView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User
from .serializers import MyTokenObtainPairSerializer, UserSerializer


class ObtainTokenPairWithColorView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    serializer_class = MyTokenObtainPairSerializer

class UserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    def post(self, request):
        data = {}
        requestRawData = request.data
        data['full_name'] = requestRawData.get('full_name').title()
        data['username'] = requestRawData.get('username').lower()
        data['password'] = requestRawData.get('password')
        data['raw_password'] = requestRawData.get('password')
        data['email'] = requestRawData.get('email')
        serializer = UserSerializer(data = data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return HttpResponse("User Created.")
        else:
            return HttpResponse("Error")

class authLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    def post(self, request):
        username, password = request.POST['username'], request.POST['password']
        user = authenticate(username=username, password=password)
        if user is None:
            return HttpResponse("Those credentials do not exist")
        login(request, user)
        accessData = json.loads(requests.post(f"{request.scheme}://{request.get_host()}/auth/token/obtain", data={"username":username,"password":password}).text)
        request.session['access'] = accessData['access']
        request.session['refresh'] = accessData['refresh']
        return HttpResponse("You have successfully logged in with username " + username)

class UpdateProfile(APIView):
    def put(self, request):
        current_user = request.user
        current_user.full_name = request.data.get("full_name")
        current_user.username = request.data.get("username")
        current_user.email = request.data.get("email") if request.data.get("email") != None else ""
        current_user.mobile_number = request.data.get("mobile_number") if request.data.get("mobile_number") != "None" else ""
        current_user.save()
        return HttpResponse(f"{request.user.full_name} Profile Details Updated Successfully.")

class authLogout(APIView):
    def post(self, request):
        del request.session['access']
        del request.session['refresh']
        logout(request)
        return HttpResponse("You have been Logged Out.")

class UpdatePassword(APIView):
    def put(self, request):
        current_user = request.user
        if request.data.get("old_password") == current_user.raw_password:
            current_user.set_password(request.data.get("new_password"))
            current_user.raw_password = request.data.get("new_password")
            current_user.save()
            return HttpResponse(f"{request.user.full_name}'s Password Updated Successfully.")
        else:
            return HttpResponse(f"Old Password Do Not Match.")
