// "use client";

// import { PageHeader } from "@/features/upload/components/page-header";
// import { UploadDropzone } from "@/features/upload/components/upload-dropzone";
// import { UploadedFilesList } from "@/features/upload/components/uploaded-files-list";
// import { InfoCards } from "@/features/upload/components/info-cards";
// import { useFileUpload } from "@/features/upload/hooks/use-file-upload";
// import type { DataUploadPageProps } from "@/features/upload/types";

// export default function DataUploadPage({ onDataUpload }: DataUploadPageProps) {
//   const {
//     isDragActive,
//     uploadedFiles,
//     handleDrag,
//     handleDrop,
//     handleFileInput,
//   } = useFileUpload({ onDataUpload });

//   return (
//     <div className="p-6 space-y-6">
//       <PageHeader />

//       <UploadDropzone
//         isDragActive={isDragActive}
//         onDragEnter={handleDrag}
//         onDragLeave={handleDrag}
//         onDragOver={handleDrag}
//         onDrop={handleDrop}
//         onFileInput={handleFileInput}
//       />

//       <UploadedFilesList files={uploadedFiles} />

//       <InfoCards />
//     </div>
//   );
// }
"use client";

import { PageHeader } from "@/features/upload/components/page-header";
import { UploadDropzone } from "@/features/upload/components/upload-dropzone";
import { UploadedFilesList } from "@/features/upload/components/uploaded-files-list";
import { InfoCards } from "@/features/upload/components/info-cards";
import { useFileUpload } from "@/features/upload/hooks/use-file-upload";

export default function DataUploadPage() {
  // no props needed
  const {
    isDragActive,
    uploadedFiles,
    rejectedFiles,
    handleDrag,
    handleDrop,
    handleFileInput,
    removeFile,
    clearRejected,
  } = useFileUpload(); // no argument needed

  return (
    <div className="p-6 space-y-6">
      <PageHeader />
      <UploadDropzone
        isDragActive={isDragActive}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onFileInput={handleFileInput}
      />
      <UploadedFilesList
        files={uploadedFiles}
        onRemove={removeFile}
        rejectedFiles={rejectedFiles}
        onClearRejected={clearRejected}
      />
      <InfoCards />
    </div>
  );
}
