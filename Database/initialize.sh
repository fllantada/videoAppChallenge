if [ ! -d "./data" ]; then
  # Crea la carpeta /data/db en el host
  echo "Creando carpeta /data en el host"
  mkdir data
fi

docker stop db_videos_container
docker rm db_videos_container
docker rmi db_videos_image
echo "End el stop.sh"

# Construye la imagen de Docker
docker build -t db_videos_image .

# Ejecuta un contenedor de Docker con la carpeta /data/db montada como volumen
docker run -d -p 27017:27017 -v "$(pwd)/data:/data" --name db_videos_container db_videos_image
echo "Termine el run.sh"

#cargar los datos

