from rest_framework import serializers
from .models import Producto, Categoria

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    imagen = serializers.SerializerMethodField()
    categoria_nombre = serializers.StringRelatedField(source='categoria', read_only=True)

    class Meta:
        model = Producto
        fields = '__all__'  # incluye todos los campos + imagen absoluta + nombre de categoría

    def get_imagen(self, obj):
        request = self.context.get('request')
        if obj.imagen and request:
            return request.build_absolute_uri(obj.imagen.url)
        return None