export type ResolutionPath = 'A' | 'B' | 'C' | 'D';
export type ClaimLegitimacy = 'HIGH' | 'LOW';
export type RelationshipValue = 'HIGH' | 'LOW';

export interface PathConfig {
  name: string;
  hex: string;
  tailwind: string;
  icon: string;
  description: string;
}
