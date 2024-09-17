import {
    GetBoardImageURLs,
    GetBoardPinIds,
    GetTotalBoardPins
} from "./Helpers/PinterestHelpers.ts";
import {DownloadPinsTask} from "./Helpers/GenericHelpers.ts";



let boardURL = "";

let pinCount =  await GetTotalBoardPins(boardURL);
console.log("Total Pins: ", pinCount);
let pinIds = await GetBoardPinIds(boardURL);
console.log("Pin Ids: ", pinIds.length);

console.log("Get Board Pin Urls....")

let pins = await GetBoardImageURLs(boardURL)
await DownloadPinsTask(pins);