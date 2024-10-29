start: ## Start all containers
	@docker compose -f docker-compose.yml up --force-recreate -d

### Swarm
sb: ## Build all containers for PROD
	@docker compose -f docker-compose-swarm.yml build --no-cache


sn: ## swarm leave and init
	@docker swarm leave --force
	@docker swarm init
ss: ## swarm start
	@docker stack deploy -c docker-compose-swarm.yml swarmSampleApp

sr:
	@docker stack rm swarmSampleApp


### Swarm02
sb02: ## Build all containers for PROD
	@docker compose -f docker-compose-swarm02.yml build --no-cache

ss02: ## swarm start
	@docker stack deploy -c docker-compose-swarm02.yml swarmSampleApp02

sr02:
	@docker stack rm swarmSampleApp02
