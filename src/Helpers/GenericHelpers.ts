import * as path from "node:path";
import {baseOriginalImageURL, sleepTimer} from "../GlobalConfigValues.ts";
import fs from "node:fs";
import axios from "axios";


export const GetFileType = async (imageURL: string): Promise<string | null> => {
    return path.extname(imageURL);
}

export const GetFileNameWithoutExtension = async (imageURL: string): Promise<string> => {
    return path.basename(imageURL, path.extname(imageURL));
}

export const GenerateFileName = async (imageURL: string): Promise<string> => {
    return `${ await GetFileNameWithoutExtension(imageURL)} + ${await GetFileType(imageURL)}`;
};

export const GenerateDownloadFolder = async (folderPath:string, fileName:string): Promise<string> => {

    // Create Downloads folder if it doesn't exist -- Temp for now
    const downloadsFolder = path.join(process.cwd(), 'Downloads');
    if (!fs.existsSync(downloadsFolder)) {
        fs.mkdirSync(downloadsFolder, { recursive: true });
    }
    return path.join(downloadsFolder, fileName);  // Combine with Downloads folder path
}

export const GenerateOriginalDownloadURL = async (imageURL: string): Promise<string | null> => {
    // URL Image Folder Structure is first 6 characters of file name split by / every 2 characters then the full file name
    // For example
    // https://i.pinimg.com/236x/2b/30/69/2b30694abd53a6de1799dc44ffbf9f9d.jpg -- Preview Size
    // https://i.pinimg.com/originals/2b/30/69/2b30694abd53a6de1799dc44ffbf9f9d.jpg -- Original High Definition Size
    // Base URL "https://i.pinimg.com/originals/"
    const baseURL = baseOriginalImageURL;
    const fileName = imageURL.substring(imageURL.lastIndexOf('/') + 1);
    const fileType = await GetFileType(imageURL);
    console.log("File Type: " + fileType);
    const fileNameWithoutExtension = await GetFileNameWithoutExtension(fileName);
    const firstSixChars = fileNameWithoutExtension.substring(0, 6);
    const splitChars = firstSixChars.match(/.{1,2}/g);
    if (splitChars) {
        return baseURL + splitChars[0] + "/" + splitChars[1] + "/" + splitChars[2] + "/" + fileNameWithoutExtension + fileType;
    } else {
        return null;
    }
}

export const DownloadAndSave = async (imageURL: string, filename: string): Promise<void> => {
    try {

        const writer = fs.createWriteStream(filename);

        const response = await axios({
            url: imageURL,
            method: 'GET',
            responseType: 'stream'
        });

        // Pipe the response data to the file
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

    } catch (error) {
        console.log("Unable to download image: " + error);
    }
}

export const DownloadPinsTask = async (pins: string[]): Promise<any> => {
    if (pins.length > 0) {
        for (const pin of pins) {
            let pinDownloadURL = await GenerateOriginalDownloadURL(pin);

            if (pinDownloadURL) {
                console.log("Download Link: ", pinDownloadURL);
                let fileName = await GenerateFileName(pinDownloadURL);
                let filePath = await GenerateDownloadFolder("Download", fileName);
                await DownloadAndSave(pinDownloadURL, filePath)
                await new Promise(resolve => setTimeout(resolve, sleepTimer)); // Sleep for 2 seconds afterward
            }

        }
    }
}

