import type {ReactNode} from "react";import {Reveal} from "./Reveal";
export function PageHero({kicker,title,intro}:{kicker:string;title:string;intro:string}){return <section className="page-hero"><p className="kicker">{kicker}</p><h1>{title}</h1><p className="lede">{intro}</p></section>}
export function Section({title,children,className=""}:{title?:string;children:ReactNode;className?:string}){return <Reveal><section className={`section ${className}`}>{title&&<h2>{title}</h2>}{children}</section></Reveal>}
