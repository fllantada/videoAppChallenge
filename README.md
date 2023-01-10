¡Hola!

Este ejercicio está diseñado para probar tu conocimiento sobre javascript, nodejs y mongodb.

# Bosquejo de Sitio para Visualizar Contenido (Videos)

En este proyecto, bosquejaras un sitio con el concepto base de Youtube, la funcionalidad que se debera completar es la siguiente:

1. Crear una base de datos de prueba de videos. Considera lo siguiente:
   - Con un script de javascript genera la coleccion _videos_ y móntala en mongodb, esta será tu base inicial desde donde partirás a continuar con el ejercicio.
   - Deja el script que utilizaste en la carpeta _scripts_ de este proyecto.
   - La estructura de ejemplo para la coleccion de videos será:

```json
{
  "_id": "59d7a89e91e3c81400ee78ee",
  "title": "Titulo del Video",
  "author": "Autor 1",
  "views": 0,
  "youtube_id": "6EOLGg-JkhM",
  "thumbnail_url": "https://picsum.photos/200/300",
  "slug": "",
  "active": true,
  "created_date": "2021-10-01T05:00:00.000Z",
  "popularity": 100
}
```

2. Crear la url "/popular/" que es la default para el sitio, esta url debe mostrar los 5 videos mas populares basados en las siguientes reglas:

- Un like a un video le agrega 10 puntos de popularidad
- Dislikes les restan 5 puntos
- Los comentarios le agregan 1 punto
- Los videos del dia actual tienen 100 puntos más que todos los anteriores.
- En caso de que haya muchos videos empatados en la popularidad mayor, escogerlos de forma random.
- Considera que el sitio está creciendo rápidamente asi que debe ser una solución escalable

3. En esta url (/popular) debe existir la opción para iniciar sesion. Manejar el proceso de login y logout. Crea las colecciones y operaciones de backend que sean necesarias para habilitar el checkeo correspondiente de sesion.

4. Implementar la navegación a los videos individuales. En esta url (/video/:id), se debe permitir al usuario logueado:

- Dar like o dislike
- Agregar un comentario

# Formato de Entrega

Después de haberte dado el acceso a este repositorio, deberás crear una rama con el formato _'/interview/<tu_apellido>'_, aquí deberás ir agregando tus commits, no hagas PR's al branch principal.
Tienes 7 dias a partir de tener el acceso a este repositorio para ir agregando tus cambios. El progreso se validara diario, asegurate de darle push a tus cambios frecuentemente.

# Clarificaciones

- Basa tu solución en cualquier version de nodejs superior a la 12.
- Puedes utilizar cualquier librería para implementar la API de este ejercicio. Sugerimos _express_.
- Puedes utilizar cualquier librería para implementar la comunicación con mongodb. Sugerimos _mongoose_.
- Puedes utilizar cualquier tecnología para implementar el front de este ejercicio.
- El foco de este ejercicio es en el backend, el front puede estar limitado solo a las operaciones mencionadas, y no revisaremos el diseño.
- Puntos extra si puedes implementar y correr tu solución configurando docker y docker compose.
- En la última sección de este README agrega las notas que creas necesarias para que podamos ejecutar tu solución. Haz esto lo mas pronto posible en el tiempo que dedicaras a resolver este ejercicio.

# Tus notas para la ejecución...

Se puede dar de alta todo ejecutando el ./initialize_not_compose.sh (ejecuta script de cada parte individualmente) o ejecutando ./initialize_with_compose.sh (ejecuta con el compose y ejecuta el script propio para llenar la base de datos)

En general cada parte tiene sus scripts que fueron utilizados durante el desarrollo. Se dejaron para dar la posibilidad de ejecutar los contenedores de forma independiente.

3 partes principales

-App (Backend node-express) localhost:8080
-Front (Next Js) localhost:3000
-DB (mongo) :27017 mongo

DB tiene su propio readme donde explica como funciona el seed de datos

Front es una aplicacion que permite ver los videos, logearse / deslogares / registrarse ver un video. Agregar Likes, y comentarios para verificar correcto funcionamiento de la consigna.

# Enfoque al ejercicio

El ejercicio pide considerar comentarios y likes que no forman parte de el objeto Video.

Dado que estos dos campos no forman parte de la estructura de Video con la que se pedia trabajar se implemento una escucha de eventos.

Se interpreto que tanto Comentarios como Likes formaban parte de otra entidad y que opera de forma independiente a los videos.

Nuestra aplicacion escucha una ruta de evento que debe ser llamada cuando se ejecuta una de las siguientes acciones.
"addLike"
"removeLike"
"addComment"
"removeComment"

de esta manera la aplicacion aplicar las reglas de entrega asociados a Likes y comentarios modificando la popularidad. Estoy ocurren en runtime entonces hace sentido hacerlo orientado a eventos.

Para la logica de la aplicacion se utilizo arquitectura guiada por dominio definiendo
carpetas dominio, aplicacion,infraestructura en capas desacopladas a cualquier implementacion de infraestructura inyectando las dependencias definidas por el dominio.
