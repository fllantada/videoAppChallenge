# README

Este proyecto utiliza Docker para configurar una base de datos de MongoDB. Para inicializar la base de datos, ejecute `npm run initialize`. Este comando ejecutará el script `initialize.sh`, que realiza lo siguiente:

1. Crea un volumen en el host para almacenar los datos.
2. Arranca un contenedor de MongoDB y monta el volumen.
3. Ejecuta el script `index.js`, que utiliza la librería [faker](https://www.npmjs.com/package/faker) y una conexión a la base de datos para generar 100 registros mock de vídeos.
4. Queda corriendo el contenedor de mongo con la string "mongodb://localhost:27017"

Nota: el script `initialize.sh` solo debe ejecutarse una vez. Frenar y Arancar la base de datos estan los comandos npm run start y npm run stop que hacen un docker start y stop respectivamente.

Nota2: En caso de necesitar restablecer toda la base de datos al mockk inicial ejecute nuevamente npm run initialize

Resumen:

```bash
#Inicia de cero y recarga la Base Datos
npm run initialize
```

```bash
#Inicia el contenedor
npm run start
```

```bash
#Frena el contenedor
npm run stop
```
