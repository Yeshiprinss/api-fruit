 <h1 align="center">🚀 Back End E-Commerce Fruteria 🚀</h1>

<h2 align="center">📃 Información General 📃</h2>

<p>Back End correspondiente a proyecto Factoria F5 🚀</p>
<p>En este repositorio se encuentra la parte del Back-end de dicho proyecto el cual consiste en una tienda online el cual fué construido utilizando Node.js, Express, MySQL</p>
<h2> Tecnologías utilizadas 💻 </h2>
<ul>
  <li>Node.js</li>
  <li>Express</li>
  <li>MySQL</li>
</ul>
<p>Se utilizaron librerias adicionales</p>
<ul>
  <li>Coudinary: Para subir imagenes al servidor cloudinary</li>
  <li>Multer: para subir imagenes locales</li>
  <li>bcryptjs: para encriptar las contraseñas de los usuarios</li>
</ul>

<h2> Instalación y comandos 🔧</h2>
<ul>
  <li> git clone https://github.com/Yeshiprinss/api-fruit.git </li>
  <li> cd /api </li>
  <li> npm install </li>
  <li> npm run dev </li>
</ul>

<h2> Deploy Back 🚀 </h2>

Link Deploy https://e-commerce-back-bsale-production.up.railway.app/api/v1/products/

<h2> End Points 💻</h2>

Se debe utilizar las siguientes rutas:

- [x] __GET /products__:
  - Obtiene un listado de los productos desde la base de datos.
- [x] __GET /products/{name}__:
  - Obtiene el detalle de un producto en particular.
  - Obtiene el filtrado de productos puede ser 1 o mas.
- [x] __GET /products/category/{category}__:
  - Obtiene los productos según la categoria seleccionada.
- [x] __GET /categories__:
  - Obtener todos las categorias de la base de datos

<h2> Documentación API📃</h2>

<p>Para ver la documentación de la API</p>

<p>https://e-commerce-back-bsale-production.up.railway.app/api/v1/docs/</p>


