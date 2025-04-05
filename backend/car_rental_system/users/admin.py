from django.contrib import admin
from .models import User, Customer, FleetManager, Admin

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'phoneNumber', 'userType')
    search_fields = ('username', 'email', 'phoneNumber')
    list_filter = ('userType',)

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('get_username', 'get_email', 'licenseNumber')
    search_fields = ('user__username', 'user__email', 'licenseNumber')

    def get_username(self, obj):
        return obj.user.username
    get_username.admin_order_field = 'user__username'
    get_username.short_description = 'Username'

    def get_email(self, obj):
        return obj.user.email
    get_email.admin_order_field = 'user__email'
    get_email.short_description = 'Email'

@admin.register(FleetManager)
class FleetManagerAdmin(admin.ModelAdmin):
    list_display = ('get_username', 'get_email')
    search_fields = ('user__username', 'user__email')

    def get_username(self, obj):
        return obj.user.username
    get_username.admin_order_field = 'user__username'
    get_username.short_description = 'Username'

    def get_email(self, obj):
        return obj.user.email
    get_email.admin_order_field = 'user__email'
    get_email.short_description = 'Email'

@admin.register(Admin)
class AdminAdmin(admin.ModelAdmin):
    list_display = ('get_username', 'get_email')
    search_fields = ('user__username', 'user__email')

    def get_username(self, obj):
        return obj.user.username
    get_username.admin_order_field = 'user__username'
    get_username.short_description = 'Username'

    def get_email(self, obj):
        return obj.user.email
    get_email.admin_order_field = 'user__email'
    get_email.short_description = 'Email'


# from django.contrib import admin
# from .models import User, Customer, FleetManager, Admin

# @admin.register(User)
# class UserAdmin(admin.ModelAdmin):
#     list_display = ("username", "email", "userType")

# @admin.register(Customer)
# class CustomerAdmin(admin.ModelAdmin):
#     list_display = ("username", "email", "licenseNumber")

# @admin.register(FleetManager)
# class FleetManagerAdmin(admin.ModelAdmin):
#     list_display = ("username", "email", "managerID")

# @admin.register(Admin)
# class AdminAdmin(admin.ModelAdmin):
#     list_display = ("username", "email", "adminID")
# admin.site.register(User)
# admin.site.register(Customer)
# admin.site.register(FleetManager)
# admin.site.register(Admin)
