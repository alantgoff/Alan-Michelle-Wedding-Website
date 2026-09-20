export const themes = {
 v1:{name:"Water lilies",eyebrow:"Impressionist garden",number:"I"},
 v2:{name:"The editorial",eyebrow:"Quiet modernism",number:"II"},
 v3:{name:"Island modern",eyebrow:"Sun, surf & foliage",number:"III"},
 v4:{name:"Black tie",eyebrow:"Classic ceremony",number:"IV"},
 v5:{name:"New wave",eyebrow:"A joyful weekend",number:"V"},
} as const;
export type Variant = keyof typeof themes;
export const variants = Object.keys(themes) as Variant[];
export function isVariant(value:string): value is Variant { return value in themes; }
