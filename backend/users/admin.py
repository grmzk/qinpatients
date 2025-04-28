from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class UserAdmin(UserAdmin):
    list_filter = ["is_staff", "is_active", "groups"]
    search_fields = ["username", "first_name", "last_name"]
    list_display = ['username', 'last_name', 'first_name', 'patronymic',
                    'is_active', 'is_staff']
    fieldsets = [
        [None, {"fields": ["username", "password"]}],
        ["Personal info", {"fields": ["first_name", "last_name",
                                      "patronymic"]}],
        ["Permissions", {"fields": ["is_active", "is_staff", "is_superuser",
                                    "groups", "user_permissions"]}],
        ["Important dates", {"fields": ["last_login", "date_joined"]}],
    ]

    def get_fieldsets(self, request, obj=None):
        if request.user.is_superuser:
            return super().get_fieldsets(request, obj)
        if obj:
            self.readonly_fields = ['username']
        if obj and obj.is_superuser:
            return []
        return [
            [None, {"fields": ["username", "password"]}],
            ["Personal info", {"fields": ["first_name", "last_name",
                                          "patronymic"]}],
            ["Permissions", {"fields": ["is_active"]}],
        ]
