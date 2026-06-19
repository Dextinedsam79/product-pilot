export type ArtifactType = 'brd' | 'prd' | 'user-stories' | 'acceptance-criteria' | 'test-cases';

export interface Project {
  id: string;
  name: string;
  idea: string;
  createdAt: number;
  artifacts: Artifact[];
}

export interface Artifact {
  id: string;
  type: ArtifactType;
  content: string;
  createdAt: number;
}
