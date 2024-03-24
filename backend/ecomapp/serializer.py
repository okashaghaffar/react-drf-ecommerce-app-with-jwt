from rest_framework import serializers


from django.contrib.auth.models import User

from .models import *
from rest_framework_simplejwt.tokens import RefreshToken


class ProductSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model=Products
        fields="__all__"
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user'] = UserSerializer(instance.user).data
        return data
class UserSerializer(serializers.ModelSerializer):
    # name=serializers.SerializerMethodField(read_only=True)
    # # _id=serializers.SerializerMethodField(read_only=True)
    # isAdmin=serializers.SerializerMethodField(read_only=True)

    class Meta:
        model=User
        fields="__all__"

    # def get_name(self,obj):
    #     firstname=obj.firstname
    #     lastname=obj.lastname
    #     name = firstname+" "+lastname

    #     if name ==" ":
    #         name="Set Your Name"

        # return name
    # def get__id(self,obj):
    #     return obj.id
    
    # def get_isAdmin(self,obj):
    #     return obj.is_staff



class UserSerializerWithToken(serializers.ModelSerializer):
    token=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=User
        fields="__all__"

    def get_token(self,obj):
        token=RefreshToken.for_user(obj)
        return str(token.access_token)
    
class OrderSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    product = serializers.PrimaryKeyRelatedField(queryset=Products.objects.all())

    class Meta:
        model=Order
        fields="__all__"
    def to_representation(self, instance):
      
        data = super().to_representation(instance)
        data['reciever'] = UserSerializer(instance.reciever).data 
        data['product'] = ProductSerializer(instance.product).data   
        return data