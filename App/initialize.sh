docker stop backend_container
docker rm backend_container
docker rmi backend_image
echo "End el stop.sh"

# Construye la imagen de Docker
docker build -t backend_image .

# Ejecuta un contenedor de Docker con la carpeta /data/db montada como volumen
docker run -d -p 8080:8080 -e MONGO_URL=mongodb://db_videos_container:27017/videoApp --link db_videos_container --name backend_container backend_image
echo "Termine el run.sh"

#cargar los datos



