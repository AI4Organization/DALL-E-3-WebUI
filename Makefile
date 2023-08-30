.PHONY: start-server-local
start-server-local:
	npm run build && npm run start

.PHONY: start-docker-compose-local
start-docker-compose-local:
	docker-compose up --build -d
