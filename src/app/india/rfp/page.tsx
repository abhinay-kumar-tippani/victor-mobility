import type { Metadata } from "next";
import PlanningPageShell from "@/components/planning/PlanningPageShell";
import RfpDesk from "@/components/planning/RfpDesk";
import indiaData from "@/content/india.json";

export const metadata: Metadata = {
  title: "Corporate RFP Desk | Victor Mobility India",
  description: indiaData.planningTools.rfp.description,
};

export default function IndiaRfpPage() {
  return <PlanningPageShell active="rfp"><RfpDesk copy={indiaData.planningTools.rfp} actions={indiaData.planningTools.actions} cities={indiaData.cities.filter(city => city.published).map(city => city.name)} services={indiaData.services.filter(service => service.published).map(service => service.title)} vehicles={indiaData.fleetVehicles?.map(v => `${v.name} (${v.cabType}, ${v.fuelType})`)} whatsappBaseUrl={indiaData.contact.whatsappBaseUrl} companyName={indiaData.companyName} /></PlanningPageShell>;
}
