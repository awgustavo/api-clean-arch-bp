
import { type FileStorage } from "../../../use-cases/ports/file-storage";

const bucketName = "plank-user-images";

export class AzureStorageFileStorage implements FileStorage {
  async createFolder (folderName: string): Promise<string> {
    console.log('sdk da azure');
    return `s3://${bucketName}/${folderName}/`;
  }
}
