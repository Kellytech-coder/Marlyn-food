"use client";
import {useState} from "react";
export default function MobileNav(){const [open,setOpen]=useState(false);return <><button type="button" className="menu-toggle" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} onClick={()=>setOpen(!open)}><span/><span/><span/></button><nav className={`main-nav mobile-nav${open?" is-open":""}`}><a href="/shop" onClick={()=>setOpen(false)}>Shop all</a><a href="/about" onClick={()=>setOpen(false)}>Our story</a><a href="/contact" onClick={()=>setOpen(false)}>Contact</a></nav></>}
