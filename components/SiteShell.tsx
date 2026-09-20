import Link from "next/link";import type {ReactNode} from "react";import {site} from "@/content/site";import {themes,type Variant} from "./themes";
export function SiteShell({variant,children}:{variant:Variant;children:ReactNode}){const theme=themes[variant];return <div className={`site theme-${variant}`}>
 <header className="nav"><Link className="mark" href={`/${variant}`}>{site.couple}</Link><nav>{site.nav.map(x=><Link key={x.href} href={`/${variant}${x.href?`/${x.href}`:""}`}>{x.label}</Link>)}</nav></header>
 <div className="theme-switcher" aria-label="Design variations">{Object.entries(themes).map(([id,t])=><Link className={id===variant?"active":""} key={id} href={`/${id}`} title={t.name}>{t.number}</Link>)}</div>
 <main>{children}</main><footer><div><strong>{site.couple}</strong><span>{site.weddingDate}</span></div><p>{site.venue}<br/>{site.location}</p><small>{theme.name} · Design variation {theme.number}</small></footer>
 </div>}
