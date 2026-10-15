import AddToBasket from "../../components/add-to-basket";
import {catalog,formatNaira} from "../../lib/basket";

export function generateStaticParams(){return catalog.map(({slug})=>({slug}));}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const product=catalog.find(item=>item.slug===slug);
  if(!product)return <main className="subpage"><h1>We could not find that pantry favourite.</h1><a className="gold-button" href="/shop">Browse the pantry</a></main>;
  return <main className="subpage"><nav className="crumb"><a href="/">Home</a><span> / </span><a href="/shop">The pantry</a><span> / </span>{product.name}</nav><div className="product-detail"><div className={`detail-art ${product.kind}`}><div className="catalog-pack"><span>m.</span><b>marlyn</b><i>{product.name}</i><small>{product.size} · PANTRY GOODNESS</small></div></div><div className="detail-copy"><div className="eyebrow"><span/> {product.category.toUpperCase()} · {product.size.toUpperCase()}</div><h1>{product.name}</h1><div className="detail-price">{formatNaira(product.price)}</div><p>{product.description}. Carefully selected and packed with care for your family table.</p><ul><li>Carefully selected pantry ingredients</li><li>Packed with care for freshness</li><li>Delivery available across Lagos</li></ul><AddToBasket slug={slug}/><p className="detail-help">Need a hand? <a href="/contact">Talk to our team</a></p></div></div><section className="related"><h2>More goodness for your pantry</h2><a className="text-link" href="/shop">Explore all products</a></section></main>;
}
