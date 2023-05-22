export interface IFrameApplication {
  applicationId: number;
  position: string;
  organization: string;
  address: string;
  workExperience: WorkExperience[];
  description: string;
  frameId: number;
  curatorId?: number;
}

export interface WorkExperience {
  workExperienceId: number;
  applicationId: number;
  value: string;
}
