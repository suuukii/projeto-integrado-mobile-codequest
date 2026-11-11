export type Stage = {
  id: string;
  position: number;
  title: string;
  description: string;
};

export type Track = {
  id: string;
  slug: string;
  title: string;
  description: string;
  stages: Stage[];
};

export type StageStatus = 'completed' | 'current' | 'locked';

export type StageWithStatus = Stage & {
  status: StageStatus;
};
