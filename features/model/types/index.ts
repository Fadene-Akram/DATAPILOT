export interface Hyperparameter {
  name: string;
  type: "float" | "int" | "select";
  default: any;
  min?: number;
  max?: number;
  options?: string[];
}

export interface Algorithm {
  id: string;
  name: string;
  hyperparameters: Hyperparameter[];
}

export interface TaskType {
  name: string;
  algorithms: Algorithm[];
}

export interface TrainedModel {
  id: string;
  name: string;
  trainMetrics: Record<string, number>;
  valMetrics: Record<string, number>;
  overfittingStatus: "none" | "mild" | "severe";
  underfittingStatus: "none" | "mild" | "severe";
}

// For components that accept models from context (which may have different types)
export interface BaseModel {
  id: string;
  name: string;
}

export interface ModelBuildPageProps {
  data: any;
}

export type TaskTypeKey =
  | "classification"
  | "regression"
  | "clustering"
  | "anomaly_detection"
  | "dimensionality_reduction";
