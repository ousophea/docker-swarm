**Project Overview**

This project sets up a Docker Compose environment with two services:

1.  **Node.js Service:**

      - Builds the Node.js application from the `Dockerfile_without_multi_stage` file.
      - Exposes port 8080.
      - Deploys 4 replicas with a restart policy and update configuration.
      - Connects to the `external_network`.

2.  **Nginx Proxy Service:**

      - Builds the Nginx proxy from the `Dockerfile.nginx` file.
      - Exposes port 81.
      - Depends on the Node.js service.
      - Deploys on manager nodes.
      - Connects to the `external_network`.

**Prerequisites**

  - Docker
  - Docker Compose
  - GitLab (or a Git repository)

**Getting Started**

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/ousophea/docker-swarm.git
    cd docker-swarm
    ```

2.  **Build and Run the Services:**

    ```bash
    docker-compose up --build
    ```

**Configuration**

  - **Environment Variables:** You can set environment variables in a `.env` file or directly in the `docker-compose.yml` file.
  - **Network:** The `external_network` is defined as an external network, allowing other services to connect to it.

**Deployment to GitLab**

1.  **Create a GitLab Project:**
    Create a new GitLab project and push your code to the remote repository.

2.  **Configure CI/CD Pipeline:**
    Set up a CI/CD pipeline in your GitLab project to automatically build, test, and deploy your Docker images. You can use GitLab CI/CD or other deployment tools.

**Additional Considerations:**

  - **Security:** Consider using security best practices, such as:
      - Using a non-root user in your Docker images.
      - Keeping your Docker images up-to-date.
      - Scanning your images for vulnerabilities.
  - **Performance:** Optimize your Docker images and Docker Compose configuration for performance.
  - **Monitoring:** Implement monitoring tools to track the health and performance of your services.

**For more information, refer to the Docker Compose documentation:** [https://docs.docker.com/compose/](https://www.google.com/url?sa=E&source=gmail&q=https://docs.docker.com/compose/)
