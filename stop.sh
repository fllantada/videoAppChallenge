#stop all
docker stop $(docker ps -q)
docker container prune -f