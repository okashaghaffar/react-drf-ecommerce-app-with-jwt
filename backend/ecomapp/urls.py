
from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
  path("",getRoutes,name="getRoutes"),
  path("products",getProducts,name="getProducts"),
  path("products/<int:pk>",getoneProduct,name="getoneProducts"),
   path('user/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
   path("user/profile",getUserProfile,name="getUserProfile"),
   path("users/",getUsers,name="getUsers"),
   path("users/register",registerUser,name="registerUser"),
   path("activate/<uidb64>/<token>",ActivateAccountView,name="ActivateAccountView"),
   path("addproduct",AddProduct,name="AddProduct"),
   path("userproducts/<int:user>",getUserProducts,name="getUserProducts"),
   path("addorder",AddOrder,name="AddOrder"),
   path("getorders",getOrders,name="getOrders"),
   path("updatestatus",updateOrderStatus,name="updateOrderStatus"),








    # path('user/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


]