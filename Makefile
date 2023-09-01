.PHONY: start-server-local
start-server-local:
	npm run build && npm run start

.PHONY: start-docker-compose-local
start-docker-compose-local:
	docker-compose up --build -d

# stop local services
.PHONY: stop-docker-compose-local
stop-docker-compose-local:
	docker-compose -f docker-compose.yml down

# prune local services
.PHONY: prune-docker-compose-local
prune-docker-compose-local:
	docker-compose -f docker-compose.yml down && yes | docker volume prune