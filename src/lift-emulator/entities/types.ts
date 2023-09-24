export type LiftConfig = {
    liftCount: number,
    levelCount: number,
    speedLift: number,
    waitTime: number,
}

export type Direction = "up"|"down";
export type LiftStatus = "sleep"|"wait"|"moving";

export type OneLiftState = {
    Position: number;
    Direction: Direction;
    Status: LiftStatus;
    Targets: number[];
}

export type LiftState = {
    buttonList: boolean[];
    liftStateList: OneLiftState[];
}
