import * as cheerio from "cheerio";
import {firefox} from "playwright";
import {
    pinIdValueSelector,
    pinIdSelector,
    pinBoardParentBoardSelector,
    profileParentBoardSelector, pinBoardLinkSelector
} from "../GlobalConfigValues.ts";

// Gets the preview (lower quality) image URL for each pin in the board
export const GetBoardImageURLs = async (boardURL: string): Promise<string[]> => {
    if (await isNullOrEmpty(boardURL)) {
        return [];
    }

    try {
        const webPageContent = await GetWebPageContent(boardURL);
        if (!webPageContent) {
            return [];
        }

        let imageURLs: string[] = [];

        webPageContent(pinBoardParentBoardSelector).each((index: any,element:any) => {
           const imageURL = webPageContent(element).attr('src');
           if (imageURL) {
               imageURLs.push(imageURL);
           }
        });

        return imageURLs;

    } catch (error) {
        console.log("Error Getting Board Image URL: " + error)
        return [];
    }


};

// Get Total Board Pins to do validation afterward that everything has been downloaded
export const GetTotalBoardPins = async (boardURL: string): Promise<number | null> => {
    if (await isNullOrEmpty(boardURL)) {
        return null;
    }

    try {
        const webPageContent = await GetWebPageContent(boardURL);
        if (!webPageContent) {
            return 0;
        }
        // Count Total Amount of Pins
        return webPageContent(pinIdSelector).length;
    } catch (error) {
        console.error("Error Fetching Total Pins: ", error);
        return null;
    }
}

// Get the id of every pin in the board
export const GetBoardPinIds = async (boardURL: string): Promise<string[]> => {
    if (await isNullOrEmpty(boardURL)) {
        return [];
    }

    try {
        const webPageContent = await GetWebPageContent(boardURL);
        if (!webPageContent) {
            return [];
        }

        const pinIds: string[] = [];
        webPageContent(pinIdSelector).each((index:any, element:any ) => {
            let pinId = webPageContent(element).attr(pinIdValueSelector);
            if (pinId) {
                pinIds.push(pinId);
            }
        });

        return pinIds;
    } catch (error) {
        console.error("Error Fetching Pin Ids: ", error);
        return [];
    }
}

export const GetBoardHrefLinksFromProfile = async (profileURL: string): Promise<string[]> => {
    if (await isNullOrEmpty(profileURL)) {
        return [];
    }

    try {
        const webPageContent = await GetWebPageContent(profileURL);
        if (!webPageContent) {
            return [];
        }

        const boardURLs: string[] = [];
        webPageContent(pinBoardLinkSelector).each((index: any, element: any) => {
            let boardURL = webPageContent(element).attr('href');
            if (boardURL) {
                boardURLs.push(boardURL);
            }
        });
        return boardURLs;
    } catch (error) {
        console.error("Error Fetching Profile Href Links: ", error);
        return [];
    }
}



const GetWebPageContent = async (boardURL: string): Promise<any> => {
    if (await isNullOrEmpty(boardURL)) {
        return null;
    }

    try {
        const browser = await firefox.launch();
        const page = await browser.newPage();
        await page.goto(boardURL);
        const content = await page.content();
        await browser.close();
        return cheerio.load(content);
    } catch (error) {
        console.error("Error Fetching Web Content: ", error);
        return null;
    }
}

const isNullOrEmpty = (value: string): Promise<boolean> => {
    return Promise.resolve(value === null || value === undefined || value === '');
}