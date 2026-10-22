import GuidedEnquiryAssistant from "@/components/contact/GuidedEnquiryAssistant";
import uaeData from "@/content/uae.json";
import { LanguageProvider } from "@/i18n/LanguageContext";

export default function UaeLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider region="uae">
      {children}
      <GuidedEnquiryAssistant
        copy={uaeData.enquiryExperience.assistant}
        planningCopy={uaeData.enquiry.planningFields}
        companyName={uaeData.companyName}
        contact={uaeData.contact}
        submitLabel={uaeData.enquiry.submitLabel}
        services={uaeData.services.filter(service => service.published).map(({ slug, title }) => ({ slug, title }))}
        cities={uaeData.cities.filter(city => city.published).map(({ name }) => ({ name }))}
      />
    </LanguageProvider>
  );
}
