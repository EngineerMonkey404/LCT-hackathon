export interface ICandidateApplication {
  applicationId?: number;

  candidateId?: number;

  direction: string;

  date: Date;

  nationality: string;

  city: string;

  experience: boolean;

  position: Position[];

  russianLanguageTestResult: number;

  informationAnalysisTestResult: number;

  computerLiteracyTestResult: number;
}

export interface Position {
  positionId?: number;
  applicationId: number;
  candidateId: number;
  value: string;
}
