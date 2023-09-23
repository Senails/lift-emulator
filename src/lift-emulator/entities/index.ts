import { createEasyStore } from "easy-state-maneger-vue";
import { LiftManeger } from "./lift-maneger/LiftManeger";
import type { LiftParamsType } from "./lift/types";


// default values
export const LiftParams: LiftParamsType = {
    levelCount: 5,
    speedLift: 0.25,
    waitTime: 3,
}
export const dafaultLiftCount = 5;


// entitis
export const liftManeger = new LiftManeger(Array(dafaultLiftCount).fill(undefined));
const initState = {
    buttonList: Array(LiftParams.levelCount).fill(false),
    liftStateList: liftManeger.LiftsList.map( (l)=>l.state ),
}


export const { useSelector, updateStore, getStore } = createEasyStore(initState);


liftManeger.OnChangeState = ()=>{
    updateStore((s) =>{
        s.liftStateList = liftManeger.LiftsList.map( (l)=>l.state );
        s.liftStateList.forEach((lift)=>{
            if (!lift.Targets.includes(lift.Position)) return;
            s.buttonList[lift.Position-1] = false;
        });
    });
};

// actions 

export function CallLift(level: number){
    const calledLift = getStore().liftStateList.find((l)=> l.Targets.includes(level));
    if (calledLift) return;

    liftManeger.CallLift(level);
    updateStore( (s)=> s.buttonList[level-1] = true );
}