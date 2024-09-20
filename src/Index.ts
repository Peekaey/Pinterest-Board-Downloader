import {
    GetBoardHrefLinksFromProfile,
    GetBoardImageURLs,
    GetBoardPinIds,
    GetTotalBoardPins
} from "./Helpers/PinterestHelpers.ts";
import {DownloadBoardPinsJob} from "./Helpers/MainFunctions.ts";


let profileURL = "";

let boards = await GetBoardHrefLinksFromProfile(profileURL);
console.log("Total Boards: ", boards.length);
console.log("Boards: ", boards);

let boardURL = "";

let pinCount =  await GetTotalBoardPins(boardURL);
console.log("Total Pins: ", pinCount);
let pinIds = await GetBoardPinIds(boardURL);
console.log("Pin Ids: ", pinIds.length);

console.log("Get Board Pin Urls....")

let pins = await GetBoardImageURLs(boardURL)
await DownloadBoardPinsJob(pins);