# Flex-Pick-to-light-Labor
Flex BGE cooperation on subject "real Industry in education". Simple logistics process flow with pick to light system
Cooperation details:
  -3-5 station (order selection, kitting, assembly, verification, completion) simulation
  -architecture details: thin client: webbrowser (Chrome - only) + server (Windows 2012, IIS, MS SQL)
  -developer tools: github, javascript, visual studio code, docker
 
Create docker image:
  docker-compose build

Create/run docker container:
  docker run -d --name flexptlbgeweb -p 80:5000 flexptlbgeweb
