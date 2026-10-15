"use client";
import {usePathname} from "next/navigation";
export default function SiteFooter(){const path=usePathname();if(path==="/")return null;return <footer className="route-footer"><a href="/">marlyn</a><span>Goodness, grown daily. Copyright Marlyn 2026</span><a href="/shop">Back to the pantry</a></footer>}
