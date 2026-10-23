## 2026-10-22T13:41:30Z
You are an Explorer agent (teamwork_preview_explorer).
Your working directory is: d:\victor website\.agents\teamwork\explorer_survey_1
Read d:\victor website\.agents\teamwork\ORIGINAL_REQUEST.md and d:\victor website\AGENTS.md before starting work. Do NOT modify source files or run builds.

Your task is to thoroughly investigate and map all India fleet data, components, selectors, estimators, and deep linking across the codebase:
1. Locate the single source of truth for India fleet data (e.g. src/content/india.json or other locations) and document its exact current data model and fields.
2. Find all customer-facing instances of legacy sample fleet data:
   - /india/fleet route and page components
   - Homepage fleet previews
   - Vehicle selector dropdowns (e.g. contact/enquiry forms, RFP options)
   - Journey estimators and any rate/pricing calculations
   - RFP forms and booking selectors
3. Map requirements R1 & R2:
   - The 10 manager-approved vehicles:
     1. Swift Dzire (Sedan, Petrol)
     2. Hyundai Aura (Sedan, Petrol & CNG)
     3. Tata Tigor (Sedan, Electric Vehicle)
     4. Tata Nexon (Sedan, Long Range Electric Vehicle)
     5. MG ZS EV (Sedan, Long Range Electric Vehicle)
     6. Mahindra Marazzo (SUV, Diesel)
     7. Ertiga CNG (SUV, Petrol & CNG)
     8. Innova Crysta (SUV, Diesel)
     9. Kia Carens Clavis EV (SUV, Long Range Electric Vehicle)
    10. Urbania (12 Seater, Diesel)
   - Category filter tabs: All Vehicles (10), Sedan (5), SUV (4), 12 Seater (1), Electric Vehicles (cross-category filter with Tata Tigor, Tata Nexon, MG ZS EV, Kia Carens Clavis EV - 4).
   - Deep linking: /india/fleet#electric activating the Electric Vehicles filter.
   - Removal of fabricated pricing, sample rates, journey calculation totals; replacing with 'Request a quote' and shared note: 'Vehicle allocation and pricing are confirmed for your location, dates and requirements.'
4. Document exact file paths, lines, current implementations, data schemas, and provide a concrete implementation strategy.

Write your detailed findings to d:\victor website\.agents\teamwork\explorer_survey_1\report.md and a self-contained handoff to d:\victor website\.agents\teamwork\explorer_survey_1\handoff.md.
When finished, send a message to orchestrator parent (conversation ID: 6b49676e-9eb3-4a24-b81e-24558c3bbf1b) with a summary.
