from rest_framework import serializers
from .models import Users
from .models import UserProfile
from .models import Startup
#from .models import StartupRoles
class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ("First Name", "Last Name", "Email", "Password", "ProfileID", "StartupID")


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ("Profile Description")


class StartupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Startup
        fields = ("id", "Startup Name")
'''
class StartupRolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = StartupRoles
        fields = ("Role title", "Role Description", "StartupID")
'''