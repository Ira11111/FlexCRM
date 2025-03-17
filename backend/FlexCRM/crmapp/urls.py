from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LeadViewSet,
    ContractViewSet,
    CustomerViewSet,
    AddSetView,
    ProductSetView,
    StatisticsView,
)

app_name = "crmapp"

router = DefaultRouter()
router.register("leads", LeadViewSet)
router.register("contracts", ContractViewSet)
router.register("customers", CustomerViewSet)
router.register("adds", AddSetView)
router.register("products", ProductSetView)

urlpatterns = [
    path('statistics/', StatisticsView.as_view(), name="statistics"),
    path('', include(router.urls)),
]
