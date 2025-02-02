export type FileContent = string | ArrayBuffer;

export interface FileReaderService {
  readAsText(file: File): Promise<string>;
  readAsArrayBuffer(file: File): Promise<ArrayBuffer>;
}
