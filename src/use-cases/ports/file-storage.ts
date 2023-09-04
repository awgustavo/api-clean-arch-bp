export interface FileStorage {
    createFolder(folderName: string): Promise<string>;  
}