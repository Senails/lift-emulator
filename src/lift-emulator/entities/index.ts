import { createEasyStore } from "easy-state-maneger-vue";
import { LiftManeger } from "./lift-maneger/LiftManeger";
import type { LiftConfig } from "./types";


const liftConfig: LiftConfig = {
    liftCount: 5,

    levelCount: 5,
    speedLift: 0.25,
    waitTime: 3,
}

// entitis
export const liftManeger = new LiftManeger(liftConfig);
const initState = {
    buttonList: Array(liftConfig.levelCount).fill(false) as boolean[],
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