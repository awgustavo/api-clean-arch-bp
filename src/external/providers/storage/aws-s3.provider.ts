import { S3 } from "@aws-sdk/client-s3";
import { CustomInjectable } from "../../../shared/dependency-injection/dependency-injection";
import { type FileStorage } from "../../../use-cases/ports/file-storage";

const bucketName = "plank-user-images";

@CustomInjectable()
export class AwsS3FileStorage implements FileStorage {
  async createFolder (folderName: string): Promise<string> {
    await new S3().putObject({
      Key: `${folderName}/`,
      Bucket: bucketName
    });
    return `s3://${bucketName}/${folderName}/`;
  }
}
