import type { LiftConfig } from "../types";
import type { Direction, LiftState, LiftStatus } from "./types";


export class Lift{
    private _config: LiftConfig;

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


    public constructor(config: LiftConfig, initState?: LiftState){
        this._config = config;
        if (!initState) return;
        Object.assign( this, initState );
        console.log(this);
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