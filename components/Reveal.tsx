"use client";
import {useEffect,useRef,useState,type ReactNode} from "react";
export function Reveal({children}:{children:ReactNode}){const ref=useRef<HTMLDivElement>(null);const [shown,setShown]=useState(false);useEffect(()=>{if(matchMedia("(prefers-reduced-motion: reduce)").matches){setShown(true);return}const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setShown(true)},{threshold:.08});if(ref.current)o.observe(ref.current);return()=>o.disconnect()},[]);return <div ref={ref} className={`reveal ${shown?"shown":""}`}>{children}</div>}
