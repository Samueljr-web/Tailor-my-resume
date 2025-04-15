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

export interface Languages {
  name: string;
}
export interface Skill {
  [category: string]: string[];
}

export interface Profile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  jobTitle: string;
  linkedinUrl: string;
  workExperience: WorkExperience[];
  skills: Skill[];
  yearsOfExperience: number;
  phoneNumber: string;
  education: Education;
}
