export interface WorkExperience {
  Position: string;
  CompanyName: string;
  startDate: string;
  endDate: string;
}

export interface Education {
  programme: string;
  school: string;
}
export interface Certificate {
  name: string;
  url: string;
}

export interface Languages {
  name: string;
}
export interface Skill {
  [category: string]: string[];
}

export interface Profile {
  user: User;
  completionScore: number;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  jobTitle: string;
  linkedinUrl: string;
  portfolioUrl: string;
  workExperience: WorkExperience[];
  skills: Skill[] | string[];
  yearsOfExperience: number;
  phoneNumber: string;
  education: Education[];
  certifications: Certificate[];
}
