"use client";
import {useEffect,useState} from "react";
export function Countdown({target}:{target:string}){
 const [days,setDays]=useState<number|null>(null);
 useEffect(()=>{const update=()=>setDays(Math.max(0,Math.ceil((new Date(target).getTime()-Date.now())/86400000)));update();const id=setInterval(update,3600000);return()=>clearInterval(id)},[target]);
 return <div className="countdown"><strong>{days===null?"—":days}</strong><span>days until we celebrate</span></div>
}
