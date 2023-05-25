export enum Role {
  CANDIDATE = "candidate",
  CURATOR = "curator",
  MENTOR = "mentor",
  TRAINEE = "trainee",
  FRAME = "frame",
}

export enum FrameApplicationStatus {
  APPROVED = "approved",
  DECLINED = "declined",
  PENDING = "pending",
  EDIT = "edit",
}

export interface WorkExperience {
  workExperienceId: number;
  applicationId: number;
  value: string;
}

export interface IFrameApplication {
  applicationId?: number;
  status?: FrameApplicationStatus;
  position?: string;
  organization: string;
  address: string;
  workExperience: WorkExperience[];
  description: string;
  frameId: number;
  curatorId?: number;
  traineesId?: number[];
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

export interface ICandidateApplication {
  applicationId?: number;
  candidateId?: number;
  direction?: string;
  date?: Date;
  nationality?: string;
  city?: string;
  experience?: boolean;
  education?: string;
  course?: string;
  position?: Position[];
  status?: FrameApplicationStatus;
  russianLanguageTestResult?: number;
  computerLiteracyTestResult?: number;
  informationAnalysisTestResult?: number;
}

export interface Position {
  applicationId: number;
  positionId: number;
  value?: string;
}

export interface ITrainee extends IUser {
  application: ICandidateApplication;
  age?: number;
  education?: string;
  course?: string;
}

export interface RegisterData {
  firstName: string;
  secondName: string;
  thirdName: string;
  email: string;
  password: string;
  image: { url: string; file: File | null };
}
