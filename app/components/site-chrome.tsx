"use client";
import {usePathname} from "next/navigation";
import BasketCount from "./basket-count";
import MobileNav from "./mobile-nav";
export default function SiteChrome(){const path=usePathname();if(path==="/")return null;return <header className="site-header route-header"><a className="brand" href="/"><span className="brand-symbol">m<span>.</span></span><span className="brand-name">marlyn<small>GOODNESS, GROWN DAILY</small></span></a><MobileNav/><a className="cart-button" href="/cart">My basket <BasketCount/></a></header>}
