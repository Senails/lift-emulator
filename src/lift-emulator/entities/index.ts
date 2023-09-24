import { createEasyStore } from "easy-state-maneger-vue";
import { LiftManeger } from "./lift-maneger/LiftManeger";
import type { LiftConfig, LiftState } from "./types";
import { createTrotling } from "@/shared/utils/createTrotling";

const storageKey= "liftStateStorageKey";
let prevSessionState = loadState();


const liftConfig: LiftConfig = {
    liftCount: 3,

    levelCount: 5,
    speedLift: 0.5,
    waitTime: 2,
}

if (prevSessionState?.liftStateList.length!==liftConfig.liftCount) prevSessionState = undefined;
if (prevSessionState?.buttonList.length!==liftConfig.levelCount) prevSessionState = undefined;


export const liftManeger = new LiftManeger( liftConfig, prevSessionState?.liftStateList );
const initState: LiftState = {
    buttonList: prevSessionState ? prevSessionState.buttonList : Array(liftConfig.levelCount).fill(false) as boolean[],
    liftStateList: liftManeger.LiftsList.map( (l)=>l.state ),
}


export const { useSelector, updateStore, getStore } = createEasyStore(initState);


//save in local storage
const throtling = createTrotling(100); 
function saveState(){
    throtling(()=>{
        localStorage.setItem(storageKey,JSON.stringify(getStore()));
    })
}
function loadState(): LiftState|undefined{
    const text = localStorage.getItem(storageKey);
    if (!text) return;
    return JSON.parse(text);
}


// subscribe ob LiftManeger
liftManeger.OnChangeState = ()=>{
    updateStore((s) =>{
        s.liftStateList = liftManeger.LiftsList.map( (l)=>l.state );
        s.liftStateList.forEach((lift)=>{
            if (!lift.Targets.includes(lift.Position)) return;
            s.buttonList[lift.Position-1] = false;
        });
    });
    saveState();
};


// actions 
export function CallLift(level: number){
    const calledLift = getStore().liftStateList
    .find((l)=> l.Targets.includes(level) || (l.Status === "sleep" && l.Position === level));

    if (calledLift) return;
    updateStore( (s)=> s.buttonList[level-1] = true );
    liftManeger.CallLift(level);
}