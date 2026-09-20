import "./globals.css";import type {Metadata} from "next";
export const metadata:Metadata={title:"Alan & Michelle | Oʻahu",description:"Wedding weekend at Paliku Gardens",robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
