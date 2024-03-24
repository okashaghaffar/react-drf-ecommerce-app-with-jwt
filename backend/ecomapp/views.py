
from typing import Any, Dict
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from .serializer import *
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status

#for sending mails and generate tokens
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from .utils import TokenGenerator,generate_token
from django.utils.encoding import force_bytes,force_text,DjangoUnicodeDecodeError
from django.core.mail import EmailMessage
from django.conf import settings
from django.views.generic import View


# Create your views here.
@api_view(["GET"])
def getRoutes(request):
    return Response("Hello world")

@api_view(["GET"])
def getProducts(request):
    products=Products.objects.all()
    serializer=ProductSerializer(products,many=True)
    return Response(serializer.data)
@api_view(["GET"])
def getoneProduct(request,pk):
    product=Products.objects.get(_id=pk)
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email']=user.email
        # ...

        return token
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data=super().validate(attrs)
        serializer=UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v
        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])

def getUserProfile(request):
    user=request.user
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)
from django.contrib.auth.models import User
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    user=User.objects.all()
    serializer=UserSerializer(user,many=True)
    return Response(serializer.data)

@api_view(['POST'])

def registerUser(request):
    data=request.data

    try:
        user=User.objects.create(username=data['username'],first_name=data['firstname'],
                            last_name=data['lastname'],email=data['email'],password=make_password(data['password']))
        
        # email_subject="Activate Your Account"
        # print(email_subject)
        # message=render_to_string("active.html",
        #                        {  "user":user,
        #                          "domain":"http://127.0.0.1:8000/",
        #                          "uid":urlsafe_base64_encode(force_bytes(user.pk)),
        #                          "token":generate_token.make_token(user)
        #                          }
        #                          )
        # print("yahan se paas kr gya ye")
        serializer=UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    except Exception as e:
        print(e)
        message={"details":"USER ALREADY EXIST"}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["GET"])

class ActivateAccountView(View):
    def get(self,request,uidb64,token):
        try:
            uid=force_text(urlsafe_base64_decode(uidb64))
            user=User.objects.get(pk=uid)
        except Exception as e:
            user=None
        if user is not None and generate_token.check_token(user,token):
            user.is_active=True
            user.save()
            message={"details":"Account is activated"}
            return Response(message)
        return Response({"details":"not activated"})

@api_view(["POST"])
def AddProduct(request):
    try:
        data= request.data
        print(data)
        serializer=ProductSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(e)
        return Response(e)
    
@api_view(['GET'])
def getUserProducts(request,user):
    try:
        products=Products.objects.filter(user=user)
        serializer=ProductSerializer(products,many=True)
        return Response(serializer.data)
    except Exception as e:
        print(e)
        return Response(e)
    
@api_view(["POST"])
def AddOrder(request):
    try:
        data= request.data
        print(data)
        serializer=OrderSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(e)
        return Response(e)
    

@api_view(["GET","POST"])
def getOrders(request):
    orders=Order.objects.filter(user=request.data["receiver_id"],status="pending")
    serializer=OrderSerializer(orders,many=True)
    return Response(serializer.data)

@api_view(["PUT","POST"])

def updateOrderStatus(request):
    try:
        print("------>>>>>ORDER AGYA",request.data["orderid"])
        order=Order.objects.get(id=request.data["orderid"])
        order.status="delivered"
        order.save()
        return Response({"message":"updated"})
    except Exception as e:
        print(e)
        return Response(e)

    