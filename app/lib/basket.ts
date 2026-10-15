export type BasketLine = { slug: string; quantity: number };
export type BasketProduct = { slug: string; name: string; description: string; price: number; size: string; category: string; kind: string };

export const catalog: BasketProduct[] = [
  { slug: "honey-beans", name: "Honey beans", description: "Rich, creamy & handpicked", price: 2400, size: "1 kg", category: "Beans", kind: "beans" },
  { slug: "white-beans", name: "White beans", description: "Soft texture, lovely taste", price: 2200, size: "1 kg", category: "Beans", kind: "white-beans" },
  { slug: "beans-flour", name: "Beans flour", description: "Stone-ground, ready to cook", price: 2800, size: "1 kg", category: "Flour", kind: "flour" },
  { slug: "brown-beans", name: "Brown beans", description: "Wholesome everyday goodness", price: 2300, size: "1 kg", category: "Beans", kind: "brown-beans" },
];

const KEY = "marlyn-basket";
const eventName = "marlyn-basket-change";
export const formatNaira = (amount: number) => `\u20A6${amount.toLocaleString("en-NG")}`;
export function readBasket(): BasketLine[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(window.localStorage.getItem(KEY) || "[]") as BasketLine[]; } catch { return []; }
}
export function writeBasket(lines: BasketLine[]) {
  window.localStorage.setItem(KEY, JSON.stringify(lines.filter((line) => line.quantity > 0)));
  window.dispatchEvent(new Event(eventName));
}
export function addToBasket(slug: string, amount = 1) {
  const lines = readBasket();
  const found = lines.find((line) => line.slug === slug);
  if (found) found.quantity += amount; else lines.push({ slug, quantity: amount });
  writeBasket(lines);
}
export function setBasketQuantity(slug: string, quantity: number) {
  writeBasket(readBasket().map((line) => line.slug === slug ? { ...line, quantity } : line));
}
export function subscribeBasket(callback: () => void) {
  window.addEventListener(eventName, callback);
  window.addEventListener("storage", callback);
  return () => { window.removeEventListener(eventName, callback); window.removeEventListener("storage", callback); };
}
export function basketSnapshot() { return JSON.stringify(readBasket()); }
