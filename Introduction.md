**Understanding the Docker Swarm Code**

This Docker Compose file defines a multi-service application deployed on a Docker Swarm cluster. Let's break down the components:

**Network Creation**

```dockerfile
docker network create -d overlay --attachable external_network
```

- **`docker network create`**: This command creates a new network.
- **`-d overlay`**: Specifies the driver for the network, in this case, the overlay driver, which is ideal for multi-host networks.
- **`--attachable`**: Makes the network attachable, allowing services to join and leave the network dynamically.
- **`external_network`**: Assigns a name to the network.

**Services**

**Node.js Service**

```dockerfile
# ...
build:
  context: .
  dockerfile: Dockerfile
image: sample_app:v2
restart: unless-stopped
environment:
  NODE_ENV: test
ports:
  - "8080:8080"
deploy:
  replicas: 4
  restart_policy:
    condition: on-failure
    delay: 10s
    max_attempts: 3
  update_config:
    parallelism: 2
    delay: 10s
networks:
  external_network:
    aliases:
      - nodejs
```

- **Build**: Builds the image from the specified Dockerfile.
- **Image**: The built image is tagged as `sample_app:v2`.
- **Restart Policy**: Restart the container unless explicitly stopped.
- **Environment**: Sets the `NODE_ENV` environment variable to `test`.
- **Ports**: Maps port 8080 of the container to port 8080 of the host.
- **Deploy**:
  - **Replicas**: Deploys 4 replicas of the service.
  - **Restart Policy**: Restarts failed containers up to 3 times.
  - **Update Config**: Controls the update strategy for replicas.
- **Networks**: Attaches the service to the `external_network`.

**Proxy Service**

```dockerfile
# ...
build:
  context: .
  dockerfile: Dockerfile
image: nginx_proxy:v1
ports:
  - "81:80"
depends_on:
  - nodejs
deploy:
  placement:
    constraints:
      - node.role == manager
networks:
  external_network:
```

- **Build**: Builds the image from the specified Dockerfile.
- **Image**: The built image is tagged as `nginx_proxy:v1`.
- **Ports**: Maps port 81 of the host to port 80 of the container.
- **Depends On**: Ensures the nodejs service starts before the proxy service.
- **Deploy**:
  - **Placement**: Restricts the service to manager nodes.
- **Networks**: Attaches the service to the `external_network`.

**Networks**

```dockerfile
networks:
  external_network:
    external: true
```

- **External Network**: Declares the `external_network` as an external network, meaning it's already defined outside of this Compose file, possibly on the Swarm cluster itself.

**How it Works**

1. **Network Creation**: The `external_network` is created using the overlay driver, allowing communication between services across different nodes in the Swarm cluster.
2. **Service Deployment**:
   - The `nodejs` service is deployed with 4 replicas, each running on a different node (if available).
   - The `proxy` service is deployed on a manager node, acting as a reverse proxy for the `nodejs` service.
3. **Service Communication**: Both services are connected to the `external_network`, enabling them to communicate with each other.
4. **Load Balancing**: Docker Swarm's built-in load balancing distributes traffic across the `nodejs` replicas.
5. **Service Discovery**: Services can discover each other within the network, simplifying service-to-service communication.

**Key Points**

- **Overlay Network**: Ideal for multi-host networks, providing efficient communication between services.
- **Service Deployment**: Docker Swarm handles the deployment and scaling of services across the cluster.
- **Load Balancing**: Built-in load balancing ensures efficient traffic distribution.
- **Service Discovery**: Services can easily find and communicate with each other.
