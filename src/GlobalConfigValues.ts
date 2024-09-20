
// css selectors
export const pinIdSelector = '[data-test-pin-id]';
export const pinIdValueSelector = 'data-test-pin-id';
export const pinBoardParentBoardSelector = 'div.vbI.XiG img';

export const profileParentBoardSelector = 'div.hA-.wYR.zI7.iyn.Hsu a';
export const pinBoardLinkSelector = 'a.nrl._74.NtY.S9z.eEj.CCY.kVc.Tbt.L4E.e8F.BG7';

export const baseOriginalImageURL = "https://i.pinimg.com/";
export const basePinterestURL = 'https://pinterest.com/';



export const sleepTimer = 2000;

const imageQualityMap: { [key: string]: string} = {
    "4x": "originals/", // Highest Quality - may also have file type other than jpg
    "3x": "736x/", // Should Always be JPG - Fallback
    "2x": "474x/",
    "1x": "236x/", // Preview Quality
}

export const GetImageQualityMap = (qualityLevel: string): string => {
    return imageQualityMap[qualityLevel];
}