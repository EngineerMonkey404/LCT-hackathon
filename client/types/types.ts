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

export interface Organization {
  name: string;
  coordinates: number[];
  address: string;
}

export const organizations: Organization[] = [
  {
    name: "Московская дирекция транспортного обслуживания",
    coordinates: [],
    address: "Ул пушкина Дом калатушкина",
  },

  {
    name: 'Автономная некоммерческая организация "Московский экспортный центр"',
    coordinates: [],
    address: "Ул пушкина Дом калатушкина",
  },
  {
    name: 'Автономная некоммерческая организация "Проектный офис по развитию туризма и гостеприимства Москвы',
    coordinates: [],
    address: "Ул пушкина Дом калатушкина",
  },
];

export enum Direction {
  HR = "HR-город",
  ECONOMY = "Городская экономика",
  MEDIA = "Медийный город",
  SOCIAL = "Социальный город",
  COMFORT = "Комфортный городская среда",
  RIGHT = "Правовое пространство",
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
  direction?: Direction;
  organization: string;
  address: string;
  workExperience: WorkExperience[];
  description: string;
  frameId: number;
  curatorId?: number;
  traineesId?: number[];
  mentorId?: number;
}

export interface IUser {
  userId?: number;
  firstName?: string;
  secondName?: string;
  thirdName?: string;
  email?: string;
  password?: string;
  direction?: Direction;
  role?: Role;
  direction?: Direction;
  organization?: string;
}

export interface ICandidateApplication {
  applicationId?: number;
  candidateId?: number;
  direction?: Direction;
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
  role: string;
  password: string;
  direction?: Direction;
  organization?: Organization;
  image: { url: string; file: File | null };
}
