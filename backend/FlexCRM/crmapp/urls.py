from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LeadViewSet,
    ContractViewSet,
    CustomerViewSet,
    AddSetView,
    ProductSetView)

app_name = "crmapp"

router = DefaultRouter()
router.register("leads", LeadViewSet)
router.register("contracts", ContractViewSet)
router.register("customers", CustomerViewSet)
router.register("adds", AddSetView)
router.register("products", ProductSetView)

urlpatterns = [
    path('', include(router.urls))
]
