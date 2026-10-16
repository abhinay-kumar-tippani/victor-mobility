import type { Metadata } from "next";
import PlanningPageShell from "@/components/planning/PlanningPageShell";
import JourneyEstimator from "@/components/planning/JourneyEstimator";
import indiaData from "@/content/india.json";

export const metadata: Metadata = {
  title: "Journey Estimator | Victor Mobility India",
  description: indiaData.planningTools.estimator.description,
};

export default function IndiaEstimatorPage() {
  return <PlanningPageShell active="estimator"><JourneyEstimator copy={indiaData.planningTools.estimator} actions={indiaData.planningTools.actions} cities={indiaData.cities.filter(city => city.published).map(city => city.name)} whatsappBaseUrl={indiaData.contact.whatsappBaseUrl} companyName={indiaData.companyName} /></PlanningPageShell>;
}
