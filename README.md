# TP-UX-UI

Proyecto práctico integrador de la materia *Experiencia e Interfaces de Usuario*.

**Integrantes**:
- Enrique, Walter Ignacio - 71471
- Gomez Alameda, Romina Abigail - 85296
- Storello Chiofalo, Ignacio - 85408

**Descripción**:
- Prototipo de interfaz web que demuestra manejo de una lista de productos y un carrito de compras simple. El proyecto está implementado con HTML, CSS y JavaScript en el navegador y utiliza un archivo `data.json` como fuente de datos de productos.

**Características principales**:
- Listado de productos cargados desde `data.json`.
- Interacción con carrito de compras (añadir, eliminar, ver total) a través de `carrito.js`.
- Lógica de la aplicación organizada en `app.js`.
- Plantillas/páginas en `index.html`.
- Estilos en `css/style.css` y recursos en la carpeta `img/`.

**Tecnologías**:
- HTML (estático)
- CSS (estilos y diseño)
- JavaScript (funcionalidad del frontend)
- JSON (datos de ejemplo en `data.json`)

**Estructura del repositorio** (resumen):
- `index.html` - página principal del prototipo.
- `app.js` - lógica principal de la aplicación.
- `carrito.js` - funciones relacionadas con el carrito de compras.
- `data.json` - datos de ejemplo (productos).
- `css/style.css` - estilos del sitio.
- `img/` - imágenes y recursos gráficos.

**Cómo ejecutar**:
- Opción rápida: abrir `index.html` directamente en el navegador.
- Servidor local (recomendado para evitar problemas de CORS): si tenés Python instalado, ejecutá desde la raíz del proyecto:

```powershell
python -m http.server 8000
# luego abrir http://localhost:8000 en el navegador
```

**Notas**:
- Este repositorio es una entrega/ejercicio para la materia; adaptalo libremente para fines de desarrollo y evaluación.
