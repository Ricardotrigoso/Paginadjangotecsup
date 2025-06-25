from django.contrib import admin
from .models import Producto, Categoria
from django.utils.html import format_html
from .models import Compra, CompraItem

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre',)

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio', 'stock', 'categoria', 'imagen_miniatura')
    search_fields = ('nombre',)
    list_filter = ('categoria',)

    def imagen_miniatura(self, obj):
        if obj.imagen:
            return format_html('<img src="{}" width="50" height="50" />', obj.imagen.url)
        return "(Sin imagen)"
    imagen_miniatura.short_description = 'Imagen'

class CompraItemInline(admin.TabularInline):
    model = CompraItem
    extra = 0

@admin.register(Compra)
class CompraAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'total', 'fecha')
    inlines = [CompraItemInline]
