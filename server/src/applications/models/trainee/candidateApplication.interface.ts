export interface ICandidateApplication {
  applicationId?: number;

  candidateId?: number;

  direction: string;

  date: Date;

  nationality: string;

  city: string;

  experience: boolean;

  position: string[];
}
