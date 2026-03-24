export type ConceptTypeId =
  | 'function'
  | 'seller'
  | 'customer-identity'
  | 'situation'
  | 'business-model';

export interface ConceptTypeDefinition {
  id: ConceptTypeId;
  nameKo: string;
  nameEn: string;
  description: string;
  icon: string;
  examples: string[];
  color: string;
}

export interface Question {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea';
  required: boolean;
  maxLength?: number;
}

export type Answers = Record<string, string>;

export interface ConceptResult {
  title: string;
  subtitle: string;
  explanation: string;
  applicationTip: string;
  strength: string;
}

export type WizardStep = 'product' | 'select' | 'questions' | 'result';

export interface ConceptRecommendation {
  typeId: ConceptTypeId;
  typeNameKo: string;
  icon: string;
  approachTitle: string;
  approachDescription: string;
  previewExample: string;
  color: string;
}
