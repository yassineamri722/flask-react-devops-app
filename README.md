## Architecture Overview

The project uses the following workflow:

![Architecture Diagram](docs/pipeline.drawio(2).png)

### Continuous Integration (CI)

1. **GitHub Actions** checks out the code.
2. **SonarCloud** scans the code for quality, bugs, and security vulnerabilities.
3. **Docker** builds the backend and frontend images.
4. **Trivy** scans the Docker images for vulnerabilities.
5. Images are pushed to **Docker Hub**.

### Continuous Deployment (CD)

1. **ArgoCD** syncs the application manifests from GitHub.
2. Application is deployed into a **Kubernetes cluster**.
3. **Prometheus** collects metrics from the deployed application.
4. **Grafana** displays application and infrastructure metrics for monitoring.

### GitOps Approach

- Application manifests are stored in Github.
- ArgoCD continuously monitors Github to apply updates to the cluster automatically.
