---
title: "Best free hosting platform for Node.js applications"
description: "Five places to host a Node.js app for free in 2026. What each free tier actually gives you, and where each one breaks."
date: "2026-11-13"
updated: "2026-11-28"
tags: ["nodejs", "hosting", "free-tier", "postgres", "reverhost"]
author: "Md. Zahin Afsar"
---

"Free" means something different on every hosting platform. Sometimes it means a trial. Sometimes it means $1 of credit. Sometimes it means your app falls asleep and the first visitor waits a minute.

So I picked five platforms and asked the same questions of each one:

- Does the app stay on?
- Is there a Postgres database, and does it expire?
- Do I need a credit card?
- Can I use it for something real?

Pricing pages change often. Everything below was checked against each platform's own pricing page and docs in late November 2026. Check again before you commit.

## 1. [Render](https://render.com)

The safe default. Real containers, Git push to deploy, and a dashboard that has been polished for years.

**Wins**
- Free web services run Express, NestJS, Fastify, Next.js and anything else that serves HTTP.
- 750 free instance hours per workspace per month, with 512 MB of RAM and 0.1 CPU.
- Free Postgres (1 GB) and a free Key Value instance on the same platform.
- Mature, well documented, a big community behind it.

**Breaks**
- Free web services spin down after 15 minutes without traffic. The next visitor waits about a minute.
- Free Postgres expires 30 days after you create it. You get a 14 day grace period to upgrade, then it is deleted with its data. One per workspace, no backups.
- Free Key Value does not persist to disk. A restart wipes it.
- Background workers, cron jobs and persistent disks are paid only.
- 5 GB of bandwidth per month on the free workspace.

Great for trying things. Less great for anything you want to leave running.

## 2. [Reverhost](https://reverhost.com)

Containers with Postgres and S3 storage built into every project, driven by a CLI made for coding agents. Formerly EasyHost. Disclosure: I built it.

**Wins**
- 3 free projects, each with up to 2 always-on apps. No sleeping.
- Postgres with no expiry and an S3 compatible bucket inside the same project as the app.
- Builds from a Dockerfile, with templates for Express, NestJS, Next.js, Nuxt, SvelteKit, Bun and other languages.
- Agents get full access through one CLI: deploy, env vars, logs, database queries and file storage, all with `--json` output and no prompts.
- No credit card needed.

**Breaks**
- 512 MB of RAM and 1 CPU per app.
- Small free storage: a 128 MB database and a 256 MB bucket per project.
- One region. No edge network.
- No Git integration and no preview deployments. You deploy with the CLI.

Good if you want the app, database and storage in one place and let your agent run all of it.

## 3. [Railway](https://railway.com)

The nicest developer experience on this list. The free plan is small.

**Wins**
- No credit card for the trial or the Free plan.
- 30 day trial with a one-time $5 credit, and services do not sleep during it.
- Postgres, Redis, MySQL and MongoDB with one click, also on the Free plan.
- Beautiful dashboard, fast deploys from Git.

**Breaks**
- After the trial, the Free plan gives you $1 of usage per month. That is roughly 100 MB of RAM running all month. When it runs out, your services stop until the next cycle.
- Free plan limits: 1 project, 3 services, 0.5 GB of RAM per service and a 0.5 GB volume.
- Free services and databases sleep after 5 to 10 minutes without traffic.
- No custom domains on the Free plan.
- The trial does not roll into Free on its own. You switch plans and redeploy.

Hobby is $5 a month with $5 of usage included. Great once a project earns money. As a free host it is mostly a trial.

## 4. [Vercel](https://vercel.com)

The best experience for Next.js, and it also runs Node.js backends like Express as functions.

**Wins**
- Global CDN, preview deployments for every branch, Git push to deploy.
- Hobby includes 100 GB of data transfer, 1M function invocations and 4 hours of Active CPU per month.
- Blob storage on the free plan (1 GB), plus Workflows and Queues for background work.
- Best-in-class Next.js support.

**Breaks**
- The Terms of Service limit Hobby to personal or non-commercial use.
- Code runs as functions, not a long running server. Each invocation stops after 300 seconds, so long-lived connections and in-memory state don't fit well.
- No native Postgres. Databases come from Marketplace providers, with their own limits.
- Cron jobs on Hobby run at most once a day.
- Go over a Hobby limit and the feature stops until the 30 day window resets. You cannot buy extra usage.

Pick it for a Next.js frontend. Think twice for a plain Express or NestJS API.

## 5. [Northflank](https://northflank.com)

A container platform built for teams, with a free Sandbox plan that is surprisingly generous.

**Wins**
- 2 services, 2 jobs, 1 database and 2 projects for free.
- Always on. No sleeping.
- Deploy from Git, a Dockerfile, buildpacks or a container image, so any language works.
- You can also connect one cluster on your own cloud account.

**Breaks**
- A payment method is required before you can create any resource, even on the free plan.
- Sandbox compute is limited, and horizontal scaling and autoscaling are not included.
- Free jobs run one at a time, and Northflank says free projects should not be used for production.
- The dashboard is built for platform teams. More knobs than a side project needs.

Good if you want real containers that stay on and don't mind a card on file and a steeper learning curve.

## Honorable mentions: Fly.io and Koyeb

Fly.io has a Free plan. New accounts get $1 of credit with no card, or $5 of usage every month once you add one, with up to 3 Machines. The cheapest always-on Machine is about $2.19 a month, so $5 goes a reasonable way.

Koyeb has one free instance per organization: 512 MB of RAM, 0.1 CPU, Frankfurt or Washington, D.C. It scales to zero after an hour without traffic, and you can't turn that off. Free Postgres is capped at 5 hours of active time. Signing up needs a credit card, verified with a $29 hold that is cancelled right away.

## So which one

- You want the most mature platform and don't mind your app sleeping: **Render**.
- You want the app, Postgres and storage in one project, managed by your agent: **Reverhost**.
- You're ready to pay a few dollars for a great experience: **Railway**.
- It's a Next.js frontend for a personal project: **Vercel**.
- You want always-on containers with team-grade tooling: **Northflank**.

Free tiers keep shrinking. Pick the one whose limits you can live with, and read the pricing page again before you launch.
