docker-compose up -d

node ./Database/script/index.js

echo "Levantado el docker compose"
echo "URL front: http://localhost:3000"


echo "URL back: http://localhost:8080"

echo "Ruta 1:GET  http://localhost:8080/api/videos  da los 5 videos mas populares"
echo "Ruta 2:GET  http://localhost:8080/api/videos/:id  da el video con el id que se le pasa"
echo "Ruta 3:POST  http://localhost:8080/api/videos/event por body se le envia una action y un videoId"
echo "Ruta 4:POST http://localhost:8080/api/auth/login por body se le envia un email y un password devuelve TOKEN acceso"
echo "Ruta 5:POST http://localhost:8080/api/auth/register por body se le envia un email y un password devuelve TOKEN acceso" 
echo "URL mongo: mongodb://localhost:27017/videoApp"
