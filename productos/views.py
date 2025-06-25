from rest_framework import generics, filters, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from .models import Producto, Categoria, Compra, CompraItem
from .serializers import ProductoSerializer, CategoriaSerializer

# Listar todos los productos con búsqueda y ordenamiento
class ProductoList(generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['nombre', 'descripcion', 'categoria__nombre']
    ordering_fields = ['precio', 'stock', 'creado']

    def get_serializer_context(self):
        return {'request': self.request}

# Detalle de producto
class ProductoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    def get_serializer_context(self):
        return {'request': self.request}

# Login personalizado con token
class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        })

# Lista de productos destacados
@api_view(['GET'])
def productos_destacados(request):
    productos = Producto.objects.filter(destacado=True)
    serializer = ProductoSerializer(productos, many=True, context={'request': request})
    return Response(serializer.data)

# Lista de categorías
@api_view(['GET'])
def lista_categorias(request):
    categorias = Categoria.objects.all()
    serializer = CategoriaSerializer(categorias, many=True)
    return Response(serializer.data)

# Registro de usuario
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username and password:
        if User.objects.filter(username=username).exists():
            return Response({"error": "El nombre de usuario ya está en uso"}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(username=username, password=password)
        token = Token.objects.create(user=user)
        return Response({
            "token": token.key,
            "user_id": user.pk,
            "username": user.username
        })
    return Response({"error": "Usuario o contraseña faltante"}, status=status.HTTP_400_BAD_REQUEST)

# Registrar una compra
@api_view(['POST'])
def registrar_compra(request):
    data = request.data
    try:
        nombre = data.get('nombre')
        direccion = data.get('direccion')
        tarjeta = data.get('tarjeta')
        total = data.get('total')
        productos = data.get('productos', [])

        if not all([nombre, direccion, tarjeta, total, productos]):
            return Response({'error': 'Faltan datos'}, status=400)

        if len(str(tarjeta)) != 16 or not str(tarjeta).isdigit():
            return Response({'error': 'Tarjeta inválida'}, status=400)

        # Crear la compra principal
        compra = Compra.objects.create(
            nombre=nombre,
            direccion=direccion,
            tarjeta=tarjeta,
            total=total
        )

        for item in productos:
            try:
                producto = Producto.objects.get(id=item['id'])
                CompraItem.objects.create(
                    compra=compra,
                    producto=producto,
                    nombre=producto.nombre,  # ✅ Obtenido del modelo
                    cantidad=item['cantidad'],
                    precio=item['precio']
                )
            except Producto.DoesNotExist:
                return Response(
                    {'error': f"Producto con ID {item['id']} no existe"},
                    status=400
                )

        return Response({'mensaje': 'Compra registrada correctamente'}, status=200)

    except Exception as e:
        print("Error al registrar compra:", e)
        return Response({'error': 'No se pudo registrar la compra'}, status=500)