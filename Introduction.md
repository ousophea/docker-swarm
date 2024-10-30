**Docker Swarm Setup**

This configuration file defines a Docker Swarm service for a Node.js application and an Nginx proxy.

**Prerequisites:**

* A Docker Swarm cluster set up.
* Docker Compose installed on your machine.

**Configuration Breakdown:**

**Services:**

1. **nodejs:**
   - Builds the Node.js image from the `Dockerfile_without_multi_stage` file.
   - Exposes port 8080.
   - Sets the `NODE_ENV` environment variable to `test`.
   - Deploys 4 replicas with a maximum of 3 restart attempts on failure.
   - Connects to the `external_network`.

2. **proxy:**
   - Builds the Nginx proxy image from the `Dockerfile.nginx` file.
   - Exposes port 81.
   - Depends on the `nodejs` service.
   - Deploys the service on manager nodes.
   - Connects to the `external_network`.

**Networks:**

- **external_network:**
  - An external network that both services will connect to. This allows them to communicate with each other and other services on the network.

**Deployment:**

1. **Create the Docker Compose file:**
   - Save the provided configuration as a `docker-compose.yml` file in your project directory.

2. **Start the Services:**
   - Run the following command in your terminal:
     ```bash
     docker-compose up -d
     ```
   - This will start the Node.js and Nginx services on your Docker Swarm cluster.

**Additional Notes:**

- **Environment Variables:**
  - You can use environment variables to customize the behavior of your services. For example, you can set the `NODE_ENV` variable to `production` to enable production mode.
- **Scaling:**
  - You can scale the number of replicas for each service using the `docker-compose scale` command. For example, to scale the `nodejs` service to 8 replicas, you would run:
     ```bash
     docker-compose scale nodejs=8
     ```
- **Network Configuration:**
  - The `external_network` is defined as an external network, meaning it's managed outside of this Docker Compose file. You'll need to ensure that this network exists on your Docker Swarm cluster.
- **Security:**
  - Consider additional security measures such as network segmentation, access control, and encryption to protect your services.

By following these steps and understanding the configuration, you can effectively deploy and manage your Node.js application and Nginx proxy on your Docker Swarm cluster.
