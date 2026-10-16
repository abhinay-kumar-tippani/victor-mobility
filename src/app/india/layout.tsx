import GuidedEnquiryAssistant from "@/components/contact/GuidedEnquiryAssistant";
import indiaData from "@/content/india.json";

export default function IndiaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <GuidedEnquiryAssistant
        copy={indiaData.enquiryExperience.assistant}
        planningCopy={indiaData.enquiry.planningFields}
        companyName={indiaData.companyName}
        contact={indiaData.contact}
        submitLabel={indiaData.enquiry.submitLabel}
        services={indiaData.services.filter(service => service.published).map(({ slug, title }) => ({ slug, title }))}
        cities={indiaData.cities.filter(city => city.published).map(({ name }) => ({ name }))}
      />
    </>
  );
}
