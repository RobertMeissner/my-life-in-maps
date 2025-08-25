export interface IFileReader {
  readFile(filePath: string): Promise<string>;

  fileExists(filePath: string): Promise<boolean>;
}
