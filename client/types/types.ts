export enum Role {
  CANDIDATE = "candidate",
  CURATOR = "curator",
  MENTOR = "mentor",
  TRAINEE = "trainee",
  FRAME = "frame",
}

export interface IFrameApplication {
  applicationId?: number;
  job: string;
  organization: string;
  address: string;
  workExperience: string[];
  description: string[];
  frameId: number;
  curatorId?: number;
}

export interface IUser {
  userId?: number;
  firstName?: string;

  secondName?: string;
  thirdName?: string;
  email?: string;
  password?: string;
  role?: Role;
}
