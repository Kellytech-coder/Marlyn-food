"use client";
import {useState} from "react";
import {addToBasket} from "../lib/basket";
export default function AddToBasket({slug,className="gold-button"}:{slug:string;className?:string}){const [added,setAdded]=useState(false);return <button className={className} onClick={()=>{addToBasket(slug);setAdded(true);window.setTimeout(()=>setAdded(false),1600)}}>{added?"Added to your basket":"Add to basket"}</button>}
