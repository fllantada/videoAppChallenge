docker stop front_container
docker rm front_container
docker rmi front_image
echo "End el stop.sh"

# Construye la imagen de Docker
docker build -t front_image .

# Ejecuta un contenedor de Docker con la carpeta /data/db montada como volumen
docker run -d -p 3000:3000  --link backend_container --name front_container front_image
echo "Termine el run.sh"

#cargar los datos



