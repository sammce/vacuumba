from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [
    path("auth/login", TokenObtainPairView.as_view(), name="obtain-token"),
    path("token/refresh", TokenRefreshView.as_view(), name="refresh-token"),
    path("auth/signup", views.SignUpView.as_view(), name="signup"),
    path("start-vacuum", views.StartVacuumView.as_view(), name="start_vacuum"),
    path("vacuum-data", views.GetVacuumDataView.as_view(), name="vacuum-data"),
    path("stop-vacuum", views.StopVacuumView.as_view(), name="stop-vacuum"),
]
