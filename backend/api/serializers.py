from rest_framework import serializers, status
from rest_framework.exceptions import ValidationError

from .models import User


class SignUpSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()
    password_confirmation = serializers.CharField()

    def validate(self, raw_data: dict):
        pwd = raw_data["password"]
        pwd_confirmation = raw_data["password_confirmation"]

        if pwd != pwd_confirmation:
            self._status = status.HTTP_403_FORBIDDEN

            raise ValidationError("Passwords do not match")

        return raw_data

    def validate_password(self, password: str):
        if len(password) < 8:
            raise ValidationError("Password must be at least 8 characters long")

        upper = False
        lower = False
        for char in password:
            if char.isupper():
                upper = True
            elif char.islower():
                lower = True

        if not (upper and lower):
            raise ValidationError(
                "Password must contain at least 1 uppercase and lowercase letter."
            )

        return password

    def validate_email(self, email: str):
        try:
            User.objects.get(email=email)
            self._status = status.HTTP_403_FORBIDDEN

            raise ValidationError("An account with that email already exists")
        except User.DoesNotExist:
            return email
