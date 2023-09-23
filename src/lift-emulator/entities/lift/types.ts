export type Direction = "none"|"up"|"down";
export type LiftStatus = "sleep"|"wait"|"moving";

export type LiftState = {
    Position: number;
    Direction: Direction;
    Status: LiftStatus;
    Targets: number[];
}

export type LiftParamsType = {
    levelCount: number;
    speedLift: number;
    waitTime: number;
}