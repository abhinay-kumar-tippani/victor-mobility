export interface EnquirySelectionEvent {
  service?: string;
  category?: string;
  city?: string;
  note?: string;
}

export function selectEnquiryOption(details: EnquirySelectionEvent) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("victor:select-enquiry", { detail: details })
    );
    const target = document.getElementById("contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      const firstInput = document.getElementById("enquiry-name-input") as HTMLInputElement | null;
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 350);
      }
    }
  }
}
