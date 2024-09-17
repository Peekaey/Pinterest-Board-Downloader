export interface BoardPins {
    success: boolean;
    error: string[];
    Pins: Pins;
}

export interface Pins {
    PinIds: string[];
    errors: string[];
}