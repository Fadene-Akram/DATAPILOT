export interface DataState {
  rows: number;
  missingValues: number;
  duplicates: number;
  outliers: number;
  features: number;
}

export interface Operation {
  id: number;
  op: string;
  time: string;
  rows_affected: number;
}

export interface ToolSimulation {
  rows?: number;
  missingValues?: number;
  duplicates?: number;
  outliers?: number;
  features?: number;
}

export interface CleaningTool {
  id: number;
  name: string;
  icon: any;
  desc: string;
  simulation: ToolSimulation;
}

export interface EdaPageProps {
  data: any;
}

export interface StatCardData {
  label: string;
  value: string | number;
  icon: any;
}
