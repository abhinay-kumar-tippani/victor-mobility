# BRIEFING — 2026-10-22T13:38:00Z

## Mission
Supervise the end-to-end replacement of Victor Mobility's sample fleet dataset across the India website with the authoritative 10-vehicle manager-approved list, update imagery with verified-license assets, prune unsupported UAE sample fleet data, and support EV deep linking with quote enquiries.

## 🔒 My Identity
- Archetype: sentinel
- Working directory: d:\victor website\.agents\teamwork\sentinel
- Orchestrator: 6b49676e-9eb3-4a24-b81e-24558c3bbf1b
- Victory Auditor: to be spawned on victory claim

## 🔒 Key Constraints
- No technical decisions — relay only
- Victory Audit is MANDATORY before reporting completion
- Preserve original logo, tagline "On Time Every Time.", brand colors from src/content/brand.json
- Single shared source of truth for 10 manager-approved vehicles
- Never show simulated submission success or invent pricing/rates
- Prune UAE unsupported vehicles while preserving RTL and English/Arabic localization
- Run progress reporting cron (*/8 * * * *) and liveness check cron (*/10 * * * *)
- Independent verification via teamwork_preview_victory_auditor before reporting completion

## User Context
- **Last user request**: Replace Victor Mobility's sample fleet dataset across India website with 10 manager-approved vehicles, licensed imagery, UAE fleet pruning, EV deep linking, multi-language localization, and verification.
- **Pending clarifications**: none
- **Delivered results**: none

## Project Status
- **Phase**: in progress (Project Orchestrator 6b49676e-9eb3-4a24-b81e-24558c3bbf1b actively initializing and planning)

## Victory Audit Status
- **Triggered**: no
- **Verdict**: pending
- **Retry count**: 0

## Artifact Index
- d:\victor website\.agents\teamwork\ORIGINAL_REQUEST.md — Authoritative record of user requirements
