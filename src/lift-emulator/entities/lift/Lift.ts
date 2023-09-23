
import { LiftParams } from "..";
import type { Direction, LiftState, LiftStatus } from "./types";


export class Lift{
    private static _levelCount: number = LiftParams.levelCount;
    private static _waitTime: number = LiftParams.waitTime;
    private static _mySpeed: number = LiftParams.speedLift;

    public Position: number = 1;
    public Direction: Direction = "none";
    public Status: LiftStatus = "sleep";
    public Targets: number[] = [];
    public onChangeState?: ()=>void;

    public get state(): LiftState{
        return {
            Position: this.Position,
            Direction: this.Direction,
            Status: this.Status,
            Targets: this.Targets,
        }
    }


    public constructor(initState?: LiftState){
        if (!initState) return;
        Object.assign( this, initState );
        if (this.Status !== "sleep") this.Moving();
    }
    public CallLift(level: number){

        console.log(level);
    }
    public FindDistansToLevel(level: number): number{
        return 1;
    }

    private Moving(){

    }
}