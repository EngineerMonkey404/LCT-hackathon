export interface CandidateApplication {
  applicationId?: number;

  candidateId?: number;

  direction: string;

  date: Date;

  nationality: string;

  city: string;

  experience: boolean;

  position: string[];
}
