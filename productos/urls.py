from django.urls import path
from .views import (
    ProductoList,
    ProductoDetail,
    productos_destacados,
    lista_categorias,
    register_user,
    CustomAuthToken,
    registrar_compra  # 👈 importa la nueva vista aquí
)

urlpatterns = [
    path('', ProductoList.as_view(), name='producto-list'),
    path('<int:pk>/', ProductoDetail.as_view(), name='producto-detail'),
    path('destacados/', productos_destacados, name='productos-destacados'),
    path('categorias/', lista_categorias, name='lista-categorias'),
    path('register/', register_user, name='register-user'),
    path('login/', CustomAuthToken.as_view(), name='custom-login'),

    # ✅ Nueva ruta para registrar compras
    path('registrar-compra/', registrar_compra, name='registrar-compra'),
]