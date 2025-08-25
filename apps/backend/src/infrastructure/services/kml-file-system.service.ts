import { IFileReader } from '../../domain/services/file-reader.interface';

export class KmlFileSystemService implements IFileReader {
  readFile(filePath: string): Promise<string> {
    console.log(`readFile ${filePath}`);
    return Promise.resolve('');
  }

  fileExists(filePath: string): Promise<boolean> {
    console.log(`fileExistshand o ${filePath}`);
    return Promise.resolve(false);
  }
}
