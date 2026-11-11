export type EmployeeStatus = "draft" | "published" | "archived";

export interface EmployeeProfile {
  id: string;
  slug: string;
  aliases?: string[];
  fullName: string;
  givenName?: string;
  familyName?: string;
  designation: string;
  location?: string;
  photoUrl: string;
  phone?: string;
  whatsapp: string;
  email: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  bio?: string;
  status: EmployeeStatus;
  showOnHomepage: boolean;
  homepageOrder?: number;
  showOnAbout: boolean;
  aboutOrder?: number;
}
