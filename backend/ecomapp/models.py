from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, timedelta
# Create your models here.
class Products(models.Model):
    user=models.ForeignKey(User,on_delete=models.SET_NULL, null=True)
    productname=models. CharField(max_length=150)
    image=models. ImageField(null=True, blank=True)
    productbrand=models.CharField(max_length=100, null=True, blank=True)
    productcategory=models.CharField(max_length=100, null=True, blank=True)
    productinfo=models.TextField(null=True, blank=True)
    rating=models.DecimalField(max_digits=8,decimal_places=2, null=True, blank=True)
    numReviews=models.IntegerField(null=True, blank=True, default=0)
    price=models.DecimalField(max_digits=7,decimal_places=2, null=True, blank=True)
    stockcount=models.IntegerField(null=True, blank=True, default=0)
    createdAt=models.DateTimeField(auto_now_add=True)
    _id= models.AutoField(primary_key=True, editable=False)

    def str_(self):
        return self.productname
class Order(models.Model):
    id=models.AutoField(primary_key=True,editable=False)
    user=models.ForeignKey(User,on_delete=models.SET_NULL, null=True,related_name="ordered_by")
    product=models.ForeignKey(Products,on_delete=models.SET_NULL, null=True)
    date = models.DateField(auto_now_add=True)
    delivery_date = models.DateTimeField(default=datetime.now() + timedelta(days=3))
    reciever=models.ForeignKey(User,on_delete=models.SET_NULL, null=True,related_name="recieved_by")
    status=models.CharField(max_length=100,default="pending")

