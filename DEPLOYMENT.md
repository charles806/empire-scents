# AkuSparkle Deployment Guide

This guide covers deploying the AkuSparkle application to **Hostless.cloud** with **AWS RDS (MySQL)** as the database.

## Architecture Overview

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────┐
│   Client    │────▶│  Hostless.cloud  │────▶│  AWS RDS    │
│  (Browser)  │     │  (Docker/PHP)    │     │  (MySQL)    │
└─────────────┘     └──────────────────┘     └─────────────┘
```

## Prerequisites

1. **Hostless.cloud Account** - Sign up at [hostless.cloud](https://hostless.cloud)
2. **AWS Account** - For RDS MySQL instance
3. **Docker** - For building and testing locally
4. **Git** - For version control
5. **GitHub/GitLab Account** - For repository hosting

## Step 1: Set Up AWS RDS MySQL

### 1.1 Create RDS Instance

1. Go to AWS Console → RDS → Create database
2. Choose **Standard Create**
3. Engine: **MySQL** (version 8.0+)
4. Template: **Free Tier** (for testing) or **Production**
5. DB Instance Identifier: `akusparkle-db`
6. Master username: `admin`
7. Master password: Generate a strong password (save it!)
8. Instance class: `db.t3.micro` (free tier) or larger for production
9. Storage: 20 GB (minimum)
10. **Important**: Enable **Public Access** = Yes (for Hostless.cloud to connect)
11. VPC Security Group: Create new, allow inbound on port 3306 from anywhere (0.0.0.0/0) or restrict to Hostless.cloud IPs
12. Database name: `akusparkle`

### 1.2 Note the Endpoint

After creation, note the **Endpoint** (e.g., `akusparkle-db.xxxxxx.us-east-1.rds.amazonaws.com:3306`)

### 1.3 Initialize Database

Connect to the database and run the schema:

```bash
# Using MySQL client
mysql -h your-rds-endpoint -u admin -p akusparkle < api/schema.sql
```

Or use a tool like MySQL Workbench / DBeaver.

## Step 2: Configure Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
APP_ENV=production

# AWS RDS Configuration
DB_HOST=akusparkle-db.xxxxxx.us-east-1.rds.amazonaws.com:3306
DB_NAME=akusparkle
DB_USER=admin
DB_PASS=your-secure-password-here
```

**Never commit `.env` to git!** It's in `.gitignore`.

## Step 3: Test Locally with Docker

```bash
# Start local development environment
docker-compose up -d

# Check logs
docker-compose logs -f app

# Access at http://localhost:8080
```

The local setup uses a local MySQL container (not AWS RDS).

## Step 4: Deploy to Hostless.cloud

### Option A: Git-based Deployment (Recommended)

1. Push your repository to GitHub or GitLab:
   ```bash
   git add .
   git commit -m "Prepare for Hostless.cloud deployment"
   git push origin main
   ```

2. Go to [Hostless.cloud Dashboard](https://dashboard.hostless.cloud)
3. Click "New Project" → "Import from Git"
4. Select your repository
5. Hostless will automatically detect the `Dockerfile` in the root
6. Configure the project:
   - **Build Command**: (leave empty - uses Dockerfile)
   - **Start Command**: (leave empty - uses Dockerfile CMD)
   - **Port**: 8080 (Hostless sets PORT automatically)
   - **Health Check Path**: `/health.php`

7. Add Environment Variables in Hostless dashboard:
   ```
   DB_HOST=your-rds-endpoint:3306
   DB_NAME=akusparkle
   DB_USER=admin
   DB_PASS=your-secure-password
   APP_ENV=production
   ```

8. Click "Deploy"

### Option B: Using Docker Hub / Container Registry

1. Build and push your image:
   ```bash
   docker build -t your-dockerhub-username/akusparkle:latest .
   docker push your-dockerhub-username/akusparkle:latest
   ```

2. In Hostless dashboard:
   - Create new project
   - Select "Deploy from Docker Image"
   - Enter: `your-dockerhub-username/akusparkle:latest`
   - Add environment variables (same as above)
   - Set Health Check Path: `/health.php`
   - Deploy

### Option C: Direct Server Deployment (if you have SSH access)

```bash
# On your server
git clone https://github.com/yourusername/akusparkle.git
cd akusparkle
cp .env.example .env
# Edit .env with production values
docker-compose -f docker-compose.prod.yml up -d
```

## Step 5: Configure Custom Domain (Optional)

1. In Hostless dashboard, go to your project settings
2. Add custom domain: `akusparkle.com` or `shop.akusparkle.com`
3. Configure DNS:
   - Type: CNAME
   - Name: `www` or `@`
   - Value: `your-project.hostless.run`
4. Enable HTTPS (Let's Encrypt auto-provisioned)

## Step 6: Verify Deployment

1. Visit your deployed URL (e.g., `https://your-project.hostless.run`)
2. Test:
   - Homepage loads
   - Products page shows products
   - Admin login works (username: `admin`, password: `AkuSpakle123!`)
   - Cart functionality
   - Payment page
   - Health check: `https://your-project.hostless.run/health.php`

## Database Management

### Run Migrations

```bash
# For future schema changes
docker-compose exec app php api/migrate.php
```

### Backup Database

```bash
# Automated backup (add to cron)
mysqldump -h your-rds-endpoint -u admin -p akusparkle > backup_$(date +%F).sql
```

### Restore Database

```bash
mysql -h your-rds-endpoint -u admin -p akusparkle < backup_2024-01-15.sql
```

## Security Checklist

- [ ] Use strong database password (20+ chars)
- [ ] Restrict RDS security group to Hostless.cloud IPs only
- [ ] Enable RDS encryption at rest
- [ ] Enable RDS automated backups (7+ days retention)
- [ ] Use HTTPS only (enforced by Hostless.cloud)
- [ ] Set secure session cookies (already configured)
- [ ] Rotate admin password after first login
- [ ] Consider AWS Secrets Manager for production credentials

## Troubleshooting

### Database Connection Failed

1. Check RDS security group allows port 3306 from Hostless.cloud
2. Verify endpoint, username, password in Hostless environment variables
3. Check RDS is "Available" status
4. Test connection: `telnet your-rds-endpoint 3306`

### App Not Loading

1. Check Hostless.cloud logs in dashboard
2. Verify Docker image built correctly
3. Check environment variables are set in Hostless dashboard
4. Verify `docker-compose.prod.yml` ports match (8080)
5. Check health endpoint: `curl https://your-project.hostless.run/health.php`

### Port Issues

Hostless.cloud sets the `PORT` environment variable automatically. The application must listen on this port. Our Dockerfile and entrypoint script handle this automatically.

### CORS Issues

The `config.php` automatically allows:
- `localhost` (any port)
- `*.pxxl.app` domains (legacy)
- Hostless.cloud domains

Add your custom domain to the CORS allowlist in `api/config.php` if needed.

## CI/CD Pipeline (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Hostless.cloud

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build and push Docker image
        run: |
          docker build -t ${{ secrets.DOCKER_USERNAME }}/akusparkle:${{ github.sha }} .
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push ${{ secrets.DOCKER_USERNAME }}/akusparkle:${{ github.sha }}
      
      - name: Deploy to Hostless.cloud
        # Hostless.cloud supports Git-based deployment automatically
        # Or use their API/CLI if available
        run: echo "Push to main triggers auto-deploy on Hostless.cloud"
```

## Monitoring

- **Hostless.cloud**: Built-in metrics in dashboard
- **AWS RDS**: CloudWatch metrics (CPU, connections, storage)
- **Application**: Add error tracking (Sentry) and uptime monitoring

## Cost Estimation (Monthly)

| Service | Free Tier | Production Estimate |
|---------|-----------|---------------------|
| Hostless.cloud | Free tier available (never sleeps) | $0-20/month |
| AWS RDS (db.t3.micro) | 750 hrs/month | ~$15/month |
| AWS RDS Storage (20GB) | 20 GB | ~$2/month |
| Data Transfer | 1 GB | ~$1-5/month |
| **Total** | **$0** | **~$18-42/month** |

## Support

- Hostless.cloud Docs: [docs.hostless.cloud](https://docs.hostless.cloud)
- AWS RDS Docs: [docs.aws.amazon.com/rds](https://docs.aws.amazon.com/rds)
- Project Issues: GitHub Issues