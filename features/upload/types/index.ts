export interface DataUploadPayload {
  files: string[];
  timestamp: Date;
}

export interface DataUploadPageProps {
  onDataUpload: (data: DataUploadPayload) => void;
}
