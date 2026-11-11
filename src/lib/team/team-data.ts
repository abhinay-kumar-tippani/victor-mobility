import type { EmployeeProfile } from "@/types/team";
import teamData from "@/content/team.json";

export function getAllEmployees(): EmployeeProfile[] {
  return (teamData.employees as EmployeeProfile[]) || [];
}

export function getPublishedEmployees(): EmployeeProfile[] {
  return getAllEmployees().filter((emp) => emp.status === "published");
}

export function getEmployeeBySlug(rawSlug: string): {
  employee: EmployeeProfile | null;
  isAlias: boolean;
  canonicalSlug: string | null;
} {
  if (!rawSlug) {
    return { employee: null, isAlias: false, canonicalSlug: null };
  }

  const normalized = rawSlug.trim().toLowerCase();
  const all = getAllEmployees();

  // 1. Direct match on canonical slug
  const directMatch = all.find(
    (emp) => emp.slug.toLowerCase() === normalized
  );
  if (directMatch) {
    return {
      employee: directMatch,
      isAlias: false,
      canonicalSlug: directMatch.slug,
    };
  }

  // 2. Alias match
  const aliasMatch = all.find(
    (emp) => emp.aliases && emp.aliases.some((a) => a.toLowerCase() === normalized)
  );
  if (aliasMatch) {
    return {
      employee: aliasMatch,
      isAlias: true,
      canonicalSlug: aliasMatch.slug,
    };
  }

  return { employee: null, isAlias: false, canonicalSlug: null };
}

export function getHomepageEmployees(): EmployeeProfile[] {
  return getPublishedEmployees()
    .filter((emp) => emp.showOnHomepage)
    .sort((a, b) => (a.homepageOrder ?? 999) - (b.homepageOrder ?? 999));
}

export function getAboutEmployees(): EmployeeProfile[] {
  return getPublishedEmployees()
    .filter((emp) => emp.showOnAbout)
    .sort((a, b) => (a.aboutOrder ?? 999) - (b.aboutOrder ?? 999));
}
