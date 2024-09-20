import {
    CreateDownloadsFolderIfNotExists,
    GenerateCombinedDownloadLocation,
    GenerateFileName,
    GenerateOriginalDownloadURL
} from "./GenericHelpers.ts";
import {sleepTimer} from "../GlobalConfigValues.ts";
import {ServiceResult} from "../Types/Interfaces.ts";
import fs from "node:fs";
import axios from "axios";



// Parent Manager for downloading the entirety of a board including in fallback quality
export const DownloadBoardPinsJob = async (pins: string[]): Promise<void> => {
    try {
        if (pins.length > 0) {
            let unsuccessfulDownloads = await DownloadTask(pins, "4x");

            if (unsuccessfulDownloads.length > 0) {
                console.log("A total of " + unsuccessfulDownloads.length + " pins failed to download in original quality");
                console.log("Attempting to download in fallback quality");
                let unsuccessfulDownloadsFallback = await DownloadTask(unsuccessfulDownloads, "3x");

                if (unsuccessfulDownloadsFallback.length > 0) {
                    console.log("A total of " + unsuccessfulDownloadsFallback.length + " pins failed to download");
                }
            }
        }
    } catch (error) {
        console.log("Error Downloading Pins: ", error);
    }
}


// Child process responsible for downloading and saving pins from a board in a mentioned quality
export const DownloadTask = async (pins: string[], imageQuality: string): Promise<string[]> => {
    let unsuccessfulDownloads: string[] = [];
    let downloadFolder = await CreateDownloadsFolderIfNotExists("Downloads");
    for (const pin of pins) {
        let pinDownloadURL = await GenerateOriginalDownloadURL(pin, imageQuality);
        if (pinDownloadURL) {
            console.log("Download Link: ", pinDownloadURL);
            let fileName = await GenerateFileName(pinDownloadURL);
            let filePath = await GenerateCombinedDownloadLocation(downloadFolder, fileName);
            let result = await DownloadAndSave(pinDownloadURL, filePath)
            if (!result.success) {
                unsuccessfulDownloads.push(pinDownloadURL);
            }
            await new Promise(resolve => setTimeout(resolve, sleepTimer)); // Sleep for 2 seconds afterward
        }
    }
    console.log("Finished Download Pins");
    return unsuccessfulDownloads;
}

// Improve Error Message Handling around this
export const DownloadAndSave = async (imageURL: string, filename: string): Promise<ServiceResult> => {
    try {

        const writer = fs.createWriteStream(filename);

        const response = await axios({
            method: 'GET',
            url: imageURL,
            responseType: 'stream'
        });

        // Pipe the response data to the file
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve({success: true, error: ""}));
            writer.on('error', () => reject({success: false, error: "Error Writing File"}));
        });


    } catch (error: any) {
        console.log("Unable to download image: " + error);
        return {success: false, error: error.message};
    }
}
