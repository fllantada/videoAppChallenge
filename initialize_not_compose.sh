#stop all
docker stop $(docker ps -q)
docker container prune -f

# Database
docker build -t db_videos_image ./Database
docker run -d -p 27017:27017 -v "$(pwd)/Database/data:/data" --name db_videos_container db_videos_image

node ./Database/script/index.js


#backend
docker build -t backend_image ./App
docker run -d -p 8080:8080 -e MONGO_URL=mongodb://db_videos_container:27017/videoApp --link db_videos_container --name backend_container backend_image

#frontend
docker build -t front_image ./Front
docker run -d -p 3000:3000  --link backend_container --name front_container front_image


echo "URL front: http://localhost:3000"


echo "URL back: http://localhost:8080"

echo "Ruta 1:GET  http://localhost:8080/api/videos  da los 5 videos mas populares"
echo "Ruta 2:GET  http://localhost:8080/api/videos/:id  da el video con el id que se le pasa"
echo "Ruta 3:POST  http://localhost:8080/api/videos/event por body se le envia una action y un videoId"
echo "Ruta 4:POST http://localhost:8080/api/auth/login por body se le envia un email y un password devuelve TOKEN acceso"
echo "Ruta 5:POST http://localhost:8080/api/auth/register por body se le envia un email y un password devuelve TOKEN acceso" 
echo "URL mongo: mongodb://localhost:27017/videoApp"
