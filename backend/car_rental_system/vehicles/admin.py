from django.contrib import admin
from .models import Vehicle, Car, Bike
from django.utils.safestring import mark_safe

class VehicleAdmin(admin.ModelAdmin):
    list_display = ('brand', 'model', 'status', 'show_image')

    def show_image(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="50" height="50" />')
        return "No Image"
    show_image.short_description = "Image"

admin.site.register(Vehicle, VehicleAdmin)

admin.site.register(Car)
admin.site.register(Bike)
