import {notFound} from "next/navigation";import {SiteShell} from "@/components/SiteShell";import {isVariant,variants} from "@/components/themes";
export function generateStaticParams(){return variants.map(variant=>({variant}))}
export default async function VariantLayout({children,params}:{children:React.ReactNode;params:Promise<{variant:string}>}){const {variant}=await params;if(!isVariant(variant))notFound();return <SiteShell variant={variant}>{children}</SiteShell>}
