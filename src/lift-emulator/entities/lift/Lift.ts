import type { LiftConfig } from "../types";
import type { Direction, OneLiftState, LiftStatus } from "../types";


export class Lift{
    private _config: LiftConfig;

    public Position: number = 1;
    public Direction: Direction = "up";
    public Status: LiftStatus = "sleep";
    public Targets: number[] = [];
    public onChangeState?: ()=>void;

    public get state(): OneLiftState{
        return {
            Position: this.Position,
            Direction: this.Direction,
            Status: this.Status,
            Targets: this.Targets,
        }
    }


    public constructor(config: LiftConfig, initState?: OneLiftState){
        this._config = config;
        if (!initState) return;
        Object.assign( this, initState );
        if (this.Status !== "sleep") this.Moving();
    }
    public CallLift(level: number){
        this.Targets.push(level);
        if (this.Status === "sleep") this.Moving();
    }
    public FindDistansToLevel(level: number): number{
        if (this.Targets.length === 0) return Math.abs(level-this.Position);

        const distance = this.Targets.reduce(( accum, value, index)=>{
            if (index === 0) return Math.abs(value-this.Position);
            return accum + Math.abs(value - this.Targets[index-1]);
        },0);
        const waitTime = this._config.waitTime*this.Targets.length;

        return distance + waitTime + Math.abs(this.Targets[this.Targets.length-1]- level);
    }

    private Moving(): void{
        if (this.Targets.length === 0){
            this.Status = "sleep";
            return this.onChangeState?.();
        }
        if (this.Status === "sleep"){
            this.Status = "moving";
            this.Direction = this.Targets[0]>this.Position?"up":"down";
        } 
        if (this.Status === "wait"){
            const target = this.Targets.find((l)=> l === this.Position);
            if (target){
                setTimeout(()=>{
                    this.Targets = this.Targets.filter((l)=> !(l === target));
                    this.Status = "moving";
                    this.Moving.call(this);
                }, this._config.waitTime*1000);
                return;
            }
            this.Status = "moving";
            return this.Moving.call(this);
        } 

        const nextTarget = this.Targets[0];
        if (nextTarget>this.Position) this.Direction = "up";
        if (nextTarget<this.Position) this.Direction = "down";

        if (this.Direction === "up"){
            this.Position += 1/(1000/60)*this._config.speedLift;
            if (this.Position > nextTarget) this.Position = nextTarget;
        }else{
            this.Position -= 1/(1000/60)*this._config.speedLift;
            if (this.Position < nextTarget) this.Position = nextTarget;
        }

        if (this.Position === nextTarget){
            this.Status = "wait";
            setTimeout(()=>{
                this.Targets = this.Targets.filter((l)=> !(l === nextTarget));
                this.Status = "moving";
                this.Moving.call(this);
            }, this._config.waitTime*1000);
        }else{
            setTimeout(()=> this.Moving.call(this), Math.floor(1000/60));
        }

        this.onChangeState?.();
    }
}