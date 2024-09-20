export interface BoardPins {
    success: boolean;
    error: string[];
    Pins: Pins;
}

export interface Pins {
    PinIds: string[];
    errors: string[];
}

enum QualityLevel {
    Original = 0,
    x3 = 1,
    x2 = 2,
    x1
}

export interface ServiceResult {
    success: boolean;
    error: string;
}