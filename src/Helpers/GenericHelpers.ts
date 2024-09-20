import * as path from "node:path";
import {baseOriginalImageURL, GetImageQualityMap, sleepTimer} from "../GlobalConfigValues.ts";
import fs from "node:fs";
import axios from "axios";
import {ServiceResult} from "../Types/Interfaces.ts";


export const GetFileType = async (imageURL: string): Promise<string | null> => {
    return path.extname(imageURL);
}

export const GetFileNameWithoutExtension = async (imageURL: string): Promise<string> => {
    return path.basename(imageURL, path.extname(imageURL));
}

export const GenerateFileName = async (imageURL: string): Promise<string> => {
    return `${ await GetFileNameWithoutExtension(imageURL)}${await GetFileType(imageURL)}`;
};


export const CreateDownloadsFolderIfNotExists = async (folderPath: string): Promise<string> => {
    // Current Directory for now
    let entireFolderPath = path.join(process.cwd(), folderPath);
    if (!fs.existsSync(entireFolderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
    return entireFolderPath;
}


export const GenerateCombinedDownloadLocation = async (downloadsFolderPath: string, fileName: string): Promise<string> => {
    return path.join(downloadsFolderPath,fileName);
}


export const GenerateOriginalDownloadURL = async (imageURL: string, imageQualityLevel: string): Promise<string | null> => {
    // URL Image Folder Structure is first 6 characters of file name split by / every 2 characters then the full file name
    // For example
    // https://i.pinimg.com/236x/2b/30/69/2b30694abd53a6de1799dc44ffbf9f9d.jpg -- Preview Size
    // https://i.pinimg.com/originals/2b/30/69/2b30694abd53a6de1799dc44ffbf9f9d.jpg -- Original High Definition Size
    // Base URL "https://i.pinimg.com/originals/"

    let baseURL = baseOriginalImageURL;
    let imageQuality = GetImageQualityMap(imageQualityLevel);
    baseURL += imageQuality

    const fileName = imageURL.substring(imageURL.lastIndexOf('/') + 1);
    const fileType = await GetFileType(imageURL);
    const fileNameWithoutExtension = await GetFileNameWithoutExtension(fileName);

    const firstSixChars = fileNameWithoutExtension.substring(0, 6);
    const splitChars = firstSixChars.match(/.{1,2}/g);

    if (splitChars) {
        return baseURL + splitChars[0] + "/" + splitChars[1] + "/" + splitChars[2] + "/" + fileNameWithoutExtension + fileType;
    } else {
        return null;
    }
}










