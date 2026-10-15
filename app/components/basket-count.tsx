"use client";
import {useSyncExternalStore} from "react";
import {basketSnapshot,subscribeBasket} from "../lib/basket";
export default function BasketCount(){const snapshot=useSyncExternalStore(subscribeBasket,basketSnapshot,()=>"[]");const count=(JSON.parse(snapshot) as {quantity:number}[]).reduce((n,line)=>n+line.quantity,0);return <b>{count}</b>}
