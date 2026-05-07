# CI/CD Pipeline Setup Guide

## What's Been Done
✅ Docker Compose configured for local development  
✅ Backend npm lint script added  
✅ GitHub Actions workflows created:
- **pr-checks.yml**: Runs on pull requests to `dev` (linting, npm audit, snyk, tests, build Docker)
- **deploy.yml**: Runs on merges to `main` (builds and pushes to Docker Hub)

## What You Need to Do

### 1. Create Docker Hub Repositories

You need 2 public repositories on Docker Hub:
- `benjidsv/frontend`
- `benjidsv/backend`

Visit https://hub.docker.com and create these repositories.

### 2. Push to GitHub

```bash
# Configure git
git config user.email "benjamin.arbousset@gmail.com"
git config user.name "Benji Arbousset"

# Create initial commit
git add .
git commit -m "Initial CI/CD pipeline setup"

# Add your GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub (create main and dev branches)
git branch dev
git push -u origin main
git push -u origin dev
```

### 3. Set Up GitHub Secrets

In your GitHub repository, go to **Settings → Secrets and Variables → Actions** and add:

| Secret Name | Value |
|---|---|
| `DOCKER_USERNAME` | `benjidsv` |
| `DOCKER_PASSWORD` | Your Docker Hub password/token |
| `REACT_APP_API_URL` | `http://localhost:3001` (or your backend URL) |
| `SNYK_TOKEN` | Your Snyk token (optional, get from https://snyk.io) |

### 4. Test Locally

```bash
# Build and run with Docker Compose
docker compose build
docker compose up
```

Frontend: http://localhost:3000  
Backend: http://localhost:3001

### 5. Test CI/CD Pipeline

1. Create a feature branch:
   ```bash
   git checkout -b feature/test
   ```

2. Make a change and push:
   ```bash
   git add .
   git commit -m "Test feature"
   git push -u origin feature/test
   ```

3. Create a Pull Request from `feature/test` → `dev`
   - This triggers `pr-checks.yml` workflow
   - Check Actions tab to see the workflow run

4. Merge to `main`:
   ```bash
   git checkout main
   git merge dev
   git push origin main
   ```
   - This triggers `deploy.yml` workflow
   - Images should be pushed to Docker Hub

## Notes

- The frontend Dockerfile runs on port 3000
- The backend Dockerfile runs on port 3001  
- Tests in the workflow use `--watchAll=false` to prevent hanging
- Snyk scan continues on error (won't block merge) - you can make it strict later
- npm audit uses `--audit-level=moderate` - adjust as needed

## Commands to Remember

```bash
# Local testing
docker compose build
docker compose up

# Check if services are running
curl http://localhost:3001
curl http://localhost:3000
```

## Troubleshooting

If workflows fail:
1. Check the Actions tab on GitHub for error logs
2. Verify all GitHub Secrets are set correctly
3. Ensure Docker Hub repositories exist and are public
4. Check that DOCKER_USERNAME and DOCKER_PASSWORD are correct
