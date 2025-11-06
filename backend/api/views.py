from datetime import datetime

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from utils.interface import Interface, InterfaceError, MicrobitNotFoundError

from . import models, serializers


class SignUpView(APIView):
    """
    Data:
        email: string
        password: string
        password_confirmation: string
    """

    def post(self, request: Request):
        serializer = serializers.SignUpSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=serializer._status or status.HTTP_400_BAD_REQUEST,
            )

        user = models.User.objects.create_user(
            serializer.data["email"], serializer.data["password"]
        )

        vacuum = models.Vacuum(owner=user)
        vacuum.save()

        tokens = RefreshToken.for_user(user)

        return Response({"access": str(tokens.access_token)})


class StartVacuumView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        # Get users vacuum model from database
        try:
            vacuum = models.Vacuum.objects.get(owner=request.user)
        except models.Vacuum.DoesNotExist:
            return Response(
                {"detail": "No vacuum belonging to your account found."},
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            interface = Interface()
        except MicrobitNotFoundError:
            return Response(
                {"detail": "Vacuum/controller is not plugged in"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Initiate a vacuum
        try:
            started = interface.start_vacuum()
        except InterfaceError:
            return Response(
                {"detail": "Vacuum is not responding. Is it turned on?"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Update information
        if started:
            vacuum.vacuum_count += 1
            vacuum.last_vacuum = datetime.now()

            vacuum.save()

            return Response("Vacuum started")
        else:
            return Response(
                {"detail": "Vacuum is already in use."}, status=status.HTTP_409_CONFLICT
            )


class GetVacuumDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            vacuum = models.Vacuum.objects.get(owner=request.user)
        except models.Vacuum.DoesNotExist:
            return Response(
                {"detail": "No vacuum belonging to your account found."},
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            interface = Interface()
        except MicrobitNotFoundError:
            return Response(
                {"detail": "Vacuum/controller is not plugged in"},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(
            {
                "temp": interface.get_temperature(),
                "vacuumOn": interface.is_vacuuming(),
                "lastVacuum": vacuum.last_vacuum,
                "vacuumCount": vacuum.vacuum_count,
            }
        )


class StopVacuumView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            vacuum = models.Vacuum.objects.get(owner=request.user)
        except models.Vacuum.DoesNotExist:
            return Response(
                {"detail": "No vacuum belonging to your account found."},
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            interface = Interface()
        except MicrobitNotFoundError:
            return Response(
                {"detail": "Vacuum/controller is not plugged in"},
                status=status.HTTP_404_NOT_FOUND,
            )

        stopped = interface.stop_vacuum()

        if stopped:
            return Response("Vacuum stopped.")
        else:
            return Response(
                {"detail": "Vacuum is not responding."}, status=status.HTTP_404_NOT_FOUND
            )
