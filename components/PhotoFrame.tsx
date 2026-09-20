import Image from "next/image";
export function PhotoFrame({src,label,portrait=false}:{src?:string|null;label:string;portrait?:boolean}){return <figure className={`photo-frame ${portrait?"portrait":""}`}>{src?<Image src={src} alt={label} fill sizes="(max-width:700px) 100vw, 50vw"/>:<div className="photo-placeholder"><span>Photo</span><small>{label}</small></div>}</figure>}
