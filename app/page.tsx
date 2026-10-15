"use client";

import { useEffect, useMemo, useState } from "react";
import { addToBasket, readBasket, setBasketQuantity, subscribeBasket } from "./lib/basket";
import ProductAd from "./components/product-ad";
import MobileNav from "./components/mobile-nav";

const products = [
  { id: 1, name: "Honey beans", detail: "Rich, creamy & handpicked", size: "1 kg", price: 2400, category: "Beans", color: "beans", tag: "BEST SELLER", mark: "B" },
  { id: 2, name: "White beans", detail: "Soft texture, lovely taste", size: "1 kg", price: 2200, category: "Beans", color: "white-beans", tag: "", mark: "B" },
  { id: 3, name: "Beans flour", detail: "Stone-ground, ready to cook", size: "1 kg", price: 2800, category: "Flour", color: "flour", tag: "FRESHLY MILLED", mark: "F" },
  { id: 4, name: "Brown beans", detail: "Wholesome everyday goodness", size: "1 kg", price: 2300, category: "Beans", color: "brown-beans", tag: "", mark: "B" },
];

const naira = (value: number) => `\u20A6${value.toLocaleString("en-NG")}`;

function BagIcon({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 8h14l1 13H4L5 8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M9 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;
}

export default function Home() {
  const [category, setCategory] = useState("All products");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  useEffect(() => {
    const sync = () => setCart(Object.fromEntries(readBasket().map((line) => [products.find((product) => product.name.toLowerCase().replaceAll(" ", "-") === line.slug)?.id || 0, line.quantity])));
    sync();
    return subscribeBasket(sync);
  }, []);
  const filtered = category === "All products" ? products : products.filter((p) => p.category === category);
  const count = Object.values(cart).reduce((sum, n) => sum + n, 0);
  const total = useMemo(() => products.reduce((sum, product) => sum + product.price * (cart[product.id] || 0), 0), [cart]);
  const add = (id: number) => addToBasket(products.find((product) => product.id === id)!.name.toLowerCase().replaceAll(" ", "-"));
  const change = (id: number, by: number) => setBasketQuantity(products.find((product) => product.id === id)!.name.toLowerCase().replaceAll(" ", "-"), Math.max(0, (cart[id] || 0) + by));

  return (
    <main>
      <div className="announcement"><span>GOOD FOOD, GOOD MOOD</span><span className="announce-star">✳</span> Fresh from our pantry to your home <span className="announcement-end">Delivery across Lagos&nbsp; ↗</span></div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Marlyn home"><span className="brand-symbol">m<span>.</span></span><span className="brand-name">marlyn<small>GOODNESS, GROWN DAILY</small></span></a>
        <MobileNav />
        <button className="cart-button" onClick={() => setCartOpen(!cartOpen)} aria-expanded={cartOpen}><BagIcon/><span>My basket</span><b>{count}</b></button>
      </header>
      <section className="hero" id="top">
        <div className="hero-copy"><div className="eyebrow"><span/> FROM OUR PANTRY, WITH LOVE</div><h1>A little more<br/>goodness in<br/><em>every day.</em></h1><p>Beautifully simple beans &amp; flour for the meals that bring everyone home.</p><a className="gold-button" href="#shop">Shop the pantry <span>↗</span></a><div className="hero-note"><span className="note-icon">✳</span> Carefully sourced. Always delicious.</div></div>
        <div className="hero-art" aria-label="A bowl of golden beans with fresh ingredients" role="img"><div className="sun-disc"/><div className="hero-stamp">GOOD<br/>THINGS<br/><span>INSIDE</span></div><div className="hero-plate"><div className="hero-beans">{Array.from({ length: 38 }, (_, i) => <i key={i}/>)}</div></div><div className="hero-leaf leaf-one"/><div className="hero-leaf leaf-two"/><div className="hero-bowl"><div className="bowl-beans">{Array.from({ length: 28 }, (_, i) => <i key={i}/>)}</div></div><span className="art-caption">A TABLE FULL OF GOODNESS</span></div>
      </section>
      <section className="promise-marquee" id="promise" aria-label="The Marlyn promise"><div className="promise-marquee-track"><div className="promise-strip"><div><span className="promise-icon">✳</span> Goodness you can taste</div><div><span className="promise-icon">⌂</span> Sourced with care</div><div><span className="promise-icon">♡</span> Made for your table</div><div><span className="promise-icon blue">✦</span> Delivered with love</div></div><div className="promise-strip" aria-hidden="true"><div><span className="promise-icon">✳</span> Goodness you can taste</div><div><span className="promise-icon">⌂</span> Sourced with care</div><div><span className="promise-icon">♡</span> Made for your table</div><div><span className="promise-icon blue">✦</span> Delivered with love</div></div></div></section>
      <section className="shop-section" id="shop"><div className="section-heading"><div><div className="eyebrow"><span/> THE MARLYN PANTRY</div><h2>Everyday favourites.</h2></div><a className="view-all" href="#shop">A little goodness goes a long way <span>↗</span></a></div>
        <div className="shop-controls"><div className="filters">{["All products", "Beans", "Flour"].map((item) => <button key={item} className={category === item ? "filter selected" : "filter"} onClick={() => setCategory(item)}>{item}</button>)}</div><span className="product-count">{filtered.length} pantry favourites</span></div>
        <div className="product-grid">{filtered.map((product) => <article className="product-card" key={product.id}><div className={`product-art ${product.color}`}>{product.tag && <span className="product-tag">{product.tag}</span>}<div className="product-pack"><div className="pack-fold"/><div className="pack-label"><span className="mini-logo">m.</span><span className="pack-brand">marlyn</span><span className="pack-rule"/><span className="pack-kind">{product.name}</span><span className="pack-weight">{product.size} · PANTRY GOODNESS</span></div><div className="pack-window">{Array.from({ length: 13 }, (_, i) => <i key={i}/>)}</div></div><span className="art-mark">{product.mark}</span></div><div className="product-info"><div><span className="product-category">{product.category} · {product.size}</span><h3>{product.name}</h3><p>{product.detail}</p></div><strong>{naira(product.price)}</strong></div><button className={`add-button ${cart[product.id] ? "added" : ""}`} onClick={() => add(product.id)}>{cart[product.id] ? <><span>Added · {cart[product.id]} in basket</span><span>+</span></> : <><span>Add to basket</span><span>＋</span></>}</button></article>)}</div>
      </section>
      <section className="story" id="story"><div className="story-art"><span className="story-orbit">A GOOD DAY<br/>STARTS HERE</span><span className="story-seed">✳</span></div><div className="story-copy"><div className="eyebrow"><span/> A LITTLE ABOUT US</div><h2>Good food has<br/>a way of bringing<br/><em>us together.</em></h2><p>At Marlyn, we believe the best meals don’t need to be complicated. Just honest ingredients, thoughtfully sourced, and a little love in every pot.</p><a href="#shop" className="text-link">Get to know Marlyn <span>↗</span></a></div></section>
      <ProductAd />
      <footer><a className="brand footer-brand" href="#top"><span className="brand-symbol">m<span>.</span></span><span className="brand-name">marlyn<small>GOODNESS, GROWN DAILY</small></span></a><span>Goodness, grown daily. © Marlyn 2026</span><a href="#shop">Back to the pantry ↑</a></footer>
      {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(e) => e.stopPropagation()}><div className="drawer-head"><div><span className="eyebrow"><span/> YOUR PANTRY</span><h2>Your basket <small>({count})</small></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close basket">×</button></div>{count === 0 ? <div className="empty-cart"><span>✳</span><h3>A little room for goodness.</h3><p>Your basket is waiting for something lovely.</p><button className="gold-button" onClick={() => setCartOpen(false)}>Explore the pantry ↗</button></div> : <><div className="cart-items">{products.filter((p) => cart[p.id]).map((p) => <div className="cart-item" key={p.id}><div className={`cart-thumb ${p.color}`}><span>m.</span></div><div className="cart-item-info"><strong>{p.name}</strong><span>{p.size} · {naira(p.price)}</span><div className="quantity"><button onClick={() => change(p.id, -1)} aria-label={`Remove one ${p.name}`}>−</button><span>{cart[p.id]}</span><button onClick={() => change(p.id, 1)} aria-label={`Add one ${p.name}`}>+</button></div></div><b>{naira(p.price * cart[p.id])}</b></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>{naira(total)}</strong></div><p>Delivery calculated at checkout.</p><button className="gold-button checkout" onClick={() => window.location.assign("/checkout")}>Continue to checkout <span>↗</span></button></div></>}</aside></div>}
    </main>
  );
}
