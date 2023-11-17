start_database:
	sudo systemctl start docker.service && cd docker && sudo docker-compose up -d

stop database:
	sudo docker-compose down
