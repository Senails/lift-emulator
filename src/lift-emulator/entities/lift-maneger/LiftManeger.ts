import { createTrotling } from "@/shared/utils/createTrotling";
import { Lift } from "../lift/Lift";
import type { OneLiftState } from "../types";
import type { LiftConfig } from "../types";

export class LiftManeger{
    private _trotling: (call: ()=>void)=>void = createTrotling(Math.floor(1000/30));

    public LiftsList: Lift[];
    public OnChangeState?: ()=>void;


    public constructor( config: LiftConfig, initState?: (OneLiftState|undefined)[]){
        this.LiftsList = Array( initState?.length || config.liftCount ).fill(null).map((_,i)=>{
            const lift = new Lift(config, initState?.[i]);
            lift.onChangeState = this.OnChageLiftState.bind(this);
            return lift;
        });
    }
    public CallLift(level: number){
        if (this.LiftsList.find((lift)=>lift.Status==="wait" && lift.Position === level)) return;
        if (this.LiftsList.find((lift)=>lift.Targets.includes(level))) return;

        const distanceToLevel: number[] = this.LiftsList.map((lift)=>lift.FindDistansToLevel(level));
        const minValue = Math.min(...distanceToLevel);
        const liftIndex = distanceToLevel.indexOf(minValue);

        this.LiftsList[liftIndex].CallLift(level);
    }

    private OnChageLiftState(){
        this._trotling(()=>this.OnChangeState?.());
    }
}