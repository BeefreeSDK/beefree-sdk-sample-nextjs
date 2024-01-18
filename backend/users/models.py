from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
import uuid

from .managers import CustomUserManager

class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = None
    email = models.EmailField(_("email address"), unique=True)
    displayname = models.CharField(max_length=100)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class Template(models.Model):

    class Type(models.TextChoices):
        email = 'email'
        page = 'page'
        popup = 'popup'

    id = models.UUIDField(
        primary_key = True, 
        default = uuid.uuid4,
        editable = False, 
        unique=True
        )
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    # user_id = models.ForeignKey(to=CustomUser.id, related_name='templates', on_delete=models.CASCADE)
    user_id = models.TextField()
    html = models.TextField()
    json = models.TextField()
    type = models.CharField(max_length=5, choices=Type.choices, default='email')
    image_blob = models.BinaryField()

    class Meta:
        ordering = ['created_date']

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)