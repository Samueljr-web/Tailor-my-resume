export interface WorkExperience {
  position: string;
  companyName: string;
}

export interface Education {
  programme: string;
  school: string;
}
export interface Skill {
  name: string;
}

export interface Profile {
  address: string;
  linkedin: string;
  yearsOfExperience: number;
  skills: Skill[];
  workExperience: WorkExperience[];
  education: Education[];
}
