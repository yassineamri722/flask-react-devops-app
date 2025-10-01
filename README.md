# Kubernetes-Based CI/CD & GitOps Project

This project implements a Cloud-Native CI/CD pipeline with GitOps for deploying and monitoring applications in a Kubernetes cluster.  
It ensures code quality, secure containerization, automated deployment, and observability using modern DevOps tools.

---

## Architecture Overview

The project workflow is divided into two main stages: Continuous Integration (CI) and Continuous Deployment (CD), following a GitOps approach.

![Pipeline Architecture](docs/pipeline.drawio(2).png)

---

## Continuous Integration (CI)

The CI process ensures code quality, security scanning, and containerization:

1. **GitHub Actions**  
   Automates build and test pipelines on every code push. Ensures repeatable and reliable builds.  

2. **SonarCloud**  
   Analyzes code for bugs, vulnerabilities, and code smells. Enforces quality gates before deployment.  

3. **Docker**  
   Builds container images for backend and frontend. Provides portability and consistency.  

4. **Trivy**  
   Scans container images for vulnerabilities. Ensures images are secure before publishing.  

5. **Docker Hub**  
   Stores versioned Docker images. Serves as the image registry for Kubernetes.  

---

## Continuous Deployment (CD)

Once the CI stage completes, deployment to Kubernetes is automated:

1. **ArgoCD**  
   Continuously monitors GitHub for Kubernetes manifests and syncs changes to the cluster.  

2. **Kubernetes Cluster**  
   Hosts frontend, backend, and database pods. Provides scaling, load balancing, and resilience.  

3. **Prometheus**  
   Collects application and cluster metrics. Scrapes metrics from frontend, backend, and database pods.  

4. **Grafana**  
   Visualizes metrics from Prometheus. Provides dashboards for monitoring application and infrastructure health.  

---

## GitOps Approach

- All application manifests (YAML files) are stored in GitHub.  
- ArgoCD watches the repository for changes.  
- Any update to manifests is automatically applied to the cluster.  
- Ensures a single source of truth for deployments.  

---

## Kubernetes Application Architecture

The system is deployed in a Kubernetes cluster with the following components:

![Kubernetes Pods Architecture](docs/K8s_Cluster_Arch.jpeg)

### Ingress Layer
- **Ingress Controller**  
  Routes external traffic to frontend and backend services.  

### Application Layer
- **Frontend**  
  - Deployed as a Deployment.  
  - Exposed via NodePort Service.  
  - Receives external traffic through the Ingress Controller.  

- **Backend**  
  - Deployed as a Deployment.  
  - Exposed internally via ClusterIP Service.  
  - Uses ConfigMaps for non-sensitive configurations.  
  - Uses Secrets for sensitive environment variables.  

- **Database**  
  - Deployed as a StatefulSet to maintain stable network IDs and persistent storage.  
  - Data stored in PersistentVolume (PV) via PersistentVolumeClaim (PVC).  
  - Secured with Secrets (credentials) and ConfigMaps (database configuration).  
  - Exposed internally via a ClusterIP Service.  

### GitOps Layer
- **ArgoCD Components**  
  - Server: Web UI and API.  
  - Repo Server: Manages Git repository connections.  
  - Application Controller: Applies manifests to the cluster.  
  - Redis: Stores ArgoCD state.  

- Function: Continuously syncs GitHub repository and applies changes to the cluster.  

### Monitoring Layer
- **Prometheus**  
  - Scrapes metrics from frontend, backend, and database pods.  
  - Monitors resource usage and application performance.  

- **Grafana**  
  - Connects to Prometheus.  
  - Provides dashboards for observability.  

---

## Technology Stack

- **CI/CD**: GitHub Actions, Docker, Trivy, SonarCloud  
- **GitOps**: ArgoCD  
- **Orchestration**: Kubernetes  
- **Monitoring**: Prometheus & Grafana  
- **Storage**: PVC & PV for databases  
- **Networking**: Ingress Controller, NodePort, ClusterIP  

---

## Workflow Summary

1. Developer pushes code to GitHub.  
2. GitHub Actions pipeline triggers: runs SonarCloud checks, builds Docker images, runs Trivy scans.  
3. Secure images are pushed to Docker Hub.  
4. ArgoCD detects new manifests in the GitHub repository and deploys them to Kubernetes.  
5. Frontend is accessible via Ingress, which communicates with Backend and Database.  
6. Prometheus scrapes metrics and Grafana visualizes dashboards.  

---

## Future Improvements

- Integrate Alertmanager with Prometheus for proactive alerts.  
- Enable Horizontal Pod Autoscaling (HPA) for frontend and backend.  
- Apply OPA/Gatekeeper for Kubernetes security policies.  
- Add a service mesh (Istio/Linkerd) for advanced observability and traffic management.  

---

