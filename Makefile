start_database:
	sudo systemctl start docker.service && cd docker && sudo docker-compose up -d

stop_database:
	cd docker && sudo docker-compose down
