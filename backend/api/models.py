from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user

    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)

        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self._create_user(email, password, **extra_fields)


# Create your models here.
class User(AbstractUser):
    objects = UserManager()

    username = None
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []


class Vacuum(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, help_text="The owner of this vacuum"
    )
    last_vacuum = models.DateTimeField(blank=True, null=True)
    vacuum_count = models.PositiveIntegerField(default=0)
