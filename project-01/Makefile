
## Swarm leave and init
sn: 
	@docker swarm leave --force
	@docker swarm init

### Swarm01
sb: ## Build all containers for PROD
	@docker compose -f docker-compose-swarm.yml build --no-cache

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
