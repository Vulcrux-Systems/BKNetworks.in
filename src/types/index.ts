export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Solution {
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Office {
  type: string;
  address: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  productInterest: string;
  serviceInterest: string;
  projectDetails: string;
}

export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  date: string;
  timeSlot: string;
  message: string;
}

export interface ProjectRequirementsFormData {
  // Client Info
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany: string;
  clientRole: string;
  // Project Overview
  projectTitle: string;
  projectDescription: string;
  projectObjectives: string;
  // Technical
  requiredServices: string[];
  preferredTechnologies: string[];
  targetPlatforms: string[];
  // Scope
  projectSize: string;
  teamSize: string;
  technicalComplexity: string;
  // Timeline & Budget
  startDate: string;
  completionDate: string;
  timelineFlexibility: string;
  budgetRange: string;
  budgetNotes: string;
  // Additional
  existingInfrastructure: string;
  complianceRequirements: string;
  additionalNotes: string;
}
