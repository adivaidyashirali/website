export type NavItem = { label: string; to: string; description?: string };

export const primaryNav: NavItem[] = [
  { label: "About", to: "/about", description: "Who we are and what guides us" },
  { label: "Clinic", to: "/healthcare", description: "Jataveda Clinic — consultations and dispensary" },
  { label: "Swarna Prashana", to: "/swarna-prashana", description: "A classical practice for children" },
  { label: "Our Approach", to: "/our-approach", description: "How we work with patients and families" },
  { label: "Contact", to: "/contact", description: "Visit, call or send an enquiry" },
];
