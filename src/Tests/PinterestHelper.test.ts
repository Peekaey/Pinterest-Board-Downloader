import {expect, test, describe, it, jest} from "bun:test"
import {GetBoardPinIds, GetTotalBoardPins} from "../Helpers/PinterestHelpers.ts";

const boardURL = "";

// Set timeout to 50 seconds
jest.setTimeout(50000);


// Return Total Pins of 10 under data-test-pin-id
test('Call PinterestHelpers GetTotalBoardPins', async() => {
   let boardPinCount = await GetTotalBoardPins(boardURL);
   expect(boardPinCount).toBe(10);
});

// Return Pin Ids of the board that should be equal of 10 using data-test-pin-id
test('Call GetBoardPinIds', async() => {
   let boardPinIds = await GetBoardPinIds(boardURL);
   console.log("BoardPin Ids Length",boardPinIds.length)
   expect(boardPinIds.length).toBe(10);
});


