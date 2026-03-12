import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Star, ShoppingCart, Zap, Check, Plus, Minus,
  Shield, Truck, RotateCcw, Leaf, ChevronDown, Heart,
  Share2, Package, MessageCircle, Droplets, Frown,
} from 'lucide-react'
import { PRODUCTS, REVIEWS } from '../data/products'
import { useCart } from '../context/CartContext'

/* ─── Product icon ─────────────────────────── */
function ProductIcon({ product, size = 64 }) {
  const isKit = product.category === 'kit'
  const Icon = isKit ? Package : Droplets
  return (
    <div
      className="flex items-center justify-center rounded-2xl"
      style={{
        width: size, height: size,
        background: `linear-gradient(135deg, ${product.bgFrom}, ${product.bgTo})`,
      }}
    >
      <Icon size={size * 0.45} style={{ color: product.colorDark }} />
    </div>
  )
}

/* ─── Helpers ─────────────────────────────── */
function StarRating({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          size={size}
          fill={n <= Math.round(rating) ? '#f1c40f' : 'none'}
          style={{ color: n <= Math.round(rating) ? '#f1c40f' : '#d1d5db' }}
        />
      ))}
    </div>
  )
}

function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#270566]/10 last:border-b-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-[#270566] font-medium text-sm">{title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-[#9469b5]" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-[#9469b5] text-sm leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Gallery ─────────────────────────────── */
function ProductGallery({ product }) {
  const [active, setActive] = useState(0)
  const isKit = product.category === 'kit'
  const Icon = isKit ? Package : Droplets

  const views = [
    { label: 'Principal', scale: 1, rotate: 0 },
    { label: 'Lateral', scale: 0.85, rotate: 15 },
    { label: 'Top', scale: 0.9, rotate: -10 },
    { label: 'Aroma', scale: 1.1, rotate: 5 },
  ]

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        className="relative w-full aspect-square rounded-3xl overflow-hidden flex items-center justify-center"
        style={{ background: `linear-gradient(145deg, ${product.bgFrom} 0%, ${product.bgTo} 100%)` }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 40%, ${product.color}55 0%, transparent 60%)` }}
        />

        <motion.div
          key={active}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: views[active].scale, rotate: views[active].rotate, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="relative z-10 flex flex-col items-center gap-4"
        >
          <div
            className="flex items-center justify-center rounded-3xl"
            style={{
              width: 120, height: 120,
              background: 'rgba(255,255,255,0.40)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            }}
          >
            <Icon size={60} style={{ color: product.colorDark }} />
          </div>
          <div className="text-center">
            <p className="font-display italic font-bold text-2xl opacity-90" style={{ color: product.colorDark }}>
              petit poo
            </p>
            <p className="font-semibold text-lg opacity-80" style={{ color: product.colorDark }}>
              {product.name}
            </p>
          </div>
        </motion.div>

        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold"
          style={{ background: 'rgba(255,255,255,0.55)', color: product.colorDark }}
        >
          {views[active].label}
        </div>

        {product.tag && (
          <div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
            style={{
              background: product.tag === 'Más vendido'
                ? 'linear-gradient(135deg,#e67e22,#f1c40f)'
                : product.tag === 'Nuevo'
                ? 'linear-gradient(135deg,#7C3AED,#2ecc71)'
                : 'linear-gradient(135deg,#2ecc71,#27ae60)',
            }}
          >
            {product.tag}
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-4 gap-2">
        {views.map((view, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative aspect-square rounded-xl overflow-hidden flex items-center justify-center transition-all"
            style={{
              background: `linear-gradient(135deg, ${product.bgFrom}, ${product.bgTo})`,
              border: active === i ? `2px solid ${product.color}` : '2px solid transparent',
              opacity: active === i ? 1 : 0.6,
            }}
          >
            <Icon size={22} style={{ color: product.colorDark }} />
            <span
              className="absolute bottom-1 left-0 right-0 text-center text-[8px] font-medium"
              style={{ color: product.colorDark }}
            >
              {view.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── Related products ────────────────────── */
function RelatedProducts({ current }) {
  const { addToCart } = useCart()
  const related = PRODUCTS.filter(p => p.id !== current.id).slice(0, 3)

  return (
    <div>
      <h3 className="text-[#270566] font-bold text-xl mb-6">También te puede gustar</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map(product => {
          const isKit = product.category === 'kit'
          const Icon = isKit ? Package : Droplets
          return (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group rounded-2xl overflow-hidden bg-white border border-[#270566]/8 hover:border-[#6d17e0]/30 hover:shadow-md transition-all"
              style={{ boxShadow: '0 2px 12px rgba(39,5,102,0.04)' }}
            >
              <div
                className="w-full h-32 flex items-center justify-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${product.bgFrom}, ${product.bgTo})` }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.40)' }}
                >
                  <Icon size={28} style={{ color: product.colorDark }} />
                </motion.div>
              </div>
              <div className="p-3">
                <p className="text-[#270566] text-sm font-semibold">petit poo {product.name}</p>
                <p className="text-[#9469b5] text-xs mt-0.5">{product.tagline}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[#6d17e0] font-bold text-sm">
                    ${(product.price / 1000).toFixed(0)}K COP
                  </span>
                  <button
                    onClick={e => { e.preventDefault(); addToCart(product, 1) }}
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-[#6d17e0]/10 text-[#9469b5] hover:text-[#6d17e0]"
                  >
                    <ShoppingCart size={12} />
                  </button>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Reviews section ─────────────────────── */
function ReviewsSection({ product }) {
  const productReviews = REVIEWS.slice(0, 4)
  const avg = product.rating
  const total = product.reviewCount

  const distribution = [
    { stars: 5, pct: 72 },
    { stars: 4, pct: 18 },
    { stars: 3, pct: 6 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 2 },
  ]

  return (
    <div>
      <h3 className="text-[#270566] font-bold text-xl mb-6">
        Reseñas de clientes
        <span className="text-[#9469b5] text-sm font-normal ml-2">({total.toLocaleString()} reseñas)</span>
      </h3>

      <div className="flex flex-col sm:flex-row gap-6 mb-8 p-5 rounded-2xl border border-[#270566]/8 bg-[#f5f0ff]">
        <div className="flex flex-col items-center justify-center gap-1 shrink-0">
          <span className="text-5xl font-bold text-[#270566]">{avg.toFixed(1)}</span>
          <StarRating rating={avg} size={16} />
          <span className="text-[#9469b5] text-xs">{total.toLocaleString()} reseñas</span>
        </div>
        <div className="flex-1 space-y-1.5">
          {distribution.map(d => (
            <div key={d.stars} className="flex items-center gap-2">
              <span className="text-[#9469b5] text-xs w-3">{d.stars}</span>
              <Star size={10} fill="#f1c40f" style={{ color: '#f1c40f' }} className="shrink-0" />
              <div className="flex-1 h-1.5 bg-[#270566]/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${d.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: d.stars * 0.05 }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #f1c40f, #f39c12)' }}
                />
              </div>
              <span className="text-[#9469b5] text-xs w-8 text-right">{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {productReviews.map(review => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-4 rounded-2xl border border-[#270566]/8 bg-white"
            style={{ boxShadow: '0 2px 12px rgba(39,5,102,0.05)' }}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[#270566] text-sm font-semibold">{review.name}</span>
                  {review.verified && (
                    <span className="text-[10px] text-green-700 border border-green-400/40 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                      <Check size={8} /> Verificado
                    </span>
                  )}
                </div>
                <span className="text-[#9469b5] text-xs">{review.city} · {review.date}</span>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-[#270566]/80 text-sm leading-relaxed">{review.text}</p>
            <p className="text-[#9469b5] text-xs mt-2">Compró: petit poo {review.product}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─── Main ProductPage ────────────────────── */
export default function ProductPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addToCart, formatCOP, setIsOpen } = useCart()

  const product = PRODUCTS.find(p => p.slug === slug)

  const [qty, setQty] = useState(1)
  const [subscribed, setSubscribed] = useState(false)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState('descripcion')
  const [stickyVisible, setStickyVisible] = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const mainRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        setStickyVisible(mainRef.current.getBoundingClientRect().bottom < 0)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#faf7ff' }}>
        <Frown size={56} className="text-[#9469b5]" />
        <p className="text-[#270566] text-xl font-semibold">Producto no encontrado</p>
        <Link to="/" className="text-[#6d17e0] hover:underline">← Volver a la tienda</Link>
      </div>
    )
  }

  const isKit = product.category === 'kit'
  const ProdIcon = isKit ? Package : Droplets
  const finalPrice = subscribed ? Math.round(product.price * 0.85) : product.price

  const handleAddToCart = () => {
    addToCart({ ...product, price: finalPrice }, qty)
    setAdded(true)
    setTimeout(() => { setAdded(false); setIsOpen(true) }, 1000)
  }

  const handleBuyNow = () => {
    addToCart({ ...product, price: finalPrice }, qty)
    setIsOpen(true)
  }

  const TABS = [
    { id: 'descripcion', label: 'Descripción' },
    { id: 'uso', label: 'Cómo usar' },
    { id: 'ingredientes', label: 'Ingredientes' },
    { id: 'resenas', label: `Reseñas (${product.reviewCount})` },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#faf7ff' }}>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#270566]/8" style={{ paddingTop: '7rem' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-[#9469b5]">
          <Link to="/" className="hover:text-[#6d17e0] transition-colors">Inicio</Link>
          <span>/</span>
          <a href="/#productos" className="hover:text-[#6d17e0] transition-colors">Productos</a>
          <span>/</span>
          <span className="text-[#270566]">{product.name}</span>
        </div>
      </div>

      {/* Main product section */}
      <div ref={mainRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* LEFT: Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductGallery product={product} />
          </motion.div>

          {/* RIGHT: Product info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Top actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 text-[#9469b5] hover:text-[#270566] text-sm transition-colors"
              >
                <ArrowLeft size={14} /> Volver
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setWishlist(v => !v)}
                  className="p-2 rounded-full hover:bg-[#270566]/8 transition-colors"
                >
                  <Heart
                    size={18}
                    style={{ color: wishlist ? '#ec4899' : '#9469b5' }}
                    fill={wishlist ? '#ec4899' : 'none'}
                  />
                </button>
                <button className="p-2 rounded-full hover:bg-[#270566]/8 transition-colors text-[#9469b5]">
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Tag */}
            {product.tag && (
              <span
                className="self-start text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full text-white"
                style={{
                  background: product.tag === 'Más vendido'
                    ? 'linear-gradient(135deg,#e67e22,#f1c40f)'
                    : product.tag === 'Nuevo'
                    ? 'linear-gradient(135deg,#7C3AED,#2ecc71)'
                    : 'linear-gradient(135deg,#2ecc71,#27ae60)',
                }}
              >
                {product.tag}
              </span>
            )}

            {/* Title */}
            <div>
              <p className="text-[#9469b5] text-xs uppercase tracking-widest mb-1 font-semibold">petit poo</p>
              <h1
                className="font-display italic font-bold text-[#270566] leading-none"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                {product.name}
              </h1>
              <p className="text-[#9469b5] mt-2 text-sm">{product.tagline}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} size={16} />
              <span className="text-[#270566] text-sm font-semibold">{product.rating.toFixed(1)}</span>
              <span className="text-[#9469b5] text-sm">({product.reviewCount.toLocaleString()} reseñas)</span>
            </div>

            {/* Notes */}
            <div className="flex flex-wrap gap-2">
              {product.notes.map(note => (
                <span
                  key={note}
                  className="text-xs px-3 py-1.5 rounded-full border font-medium"
                  style={{
                    borderColor: product.color + '60',
                    color: product.colorDark,
                    background: product.bgFrom,
                  }}
                >
                  {note}
                </span>
              ))}
            </div>

            {/* Subscription toggle */}
            <div
              className="rounded-2xl p-4 bg-white border"
              style={{ border: '1px solid rgba(109,23,224,0.12)', boxShadow: '0 2px 12px rgba(39,5,102,0.06)' }}
            >
              <p className="text-[#270566] text-sm font-semibold mb-3">Tipo de compra</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSubscribed(false)}
                  className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                    !subscribed ? 'border-[#6d17e0] bg-[#6d17e0]/8' : 'border-[#270566]/10 hover:border-[#270566]/20'
                  }`}
                >
                  <span className="text-[#270566] text-xs font-semibold">Compra única</span>
                  <span className="text-[#6d17e0] font-bold text-sm mt-0.5">{formatCOP(product.price)}</span>
                </button>
                <button
                  onClick={() => setSubscribed(true)}
                  className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                    subscribed ? 'border-[#6d17e0] bg-[#6d17e0]/8' : 'border-[#270566]/10 hover:border-[#270566]/20'
                  }`}
                >
                  <span className="absolute top-1 right-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">
                    -15%
                  </span>
                  <span className="text-[#270566] text-xs font-semibold">Suscribirse</span>
                  <span className="text-green-700 font-bold text-sm mt-0.5">
                    {formatCOP(Math.round(product.price * 0.85))}
                  </span>
                  <span className="text-[#9469b5] text-[10px]">cada mes</span>
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-display italic font-bold text-4xl" style={{ color: product.colorDark }}>
                {formatCOP(finalPrice)}
              </span>
              <span className="text-[#9469b5] text-sm">COP</span>
              {subscribed && (
                <span className="text-[#9469b5] text-base line-through">{formatCOP(product.price)}</span>
              )}
            </div>

            {/* Stock urgency */}
            {product.stockLeft <= 8 && (
              <div className="flex items-center gap-2 text-amber-600 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                Solo quedan {product.stockLeft} unidades
              </div>
            )}

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-full border border-[#270566]/15 bg-white">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#270566]/8 transition-colors text-[#270566]"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-[#270566] font-semibold text-sm">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#270566]/8 transition-colors text-[#270566]"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 font-semibold text-white transition-all active:scale-95"
                style={{
                  borderRadius: '2rem 0.5rem 2rem 0.5rem',
                  background: added ? 'linear-gradient(135deg,#2ecc71,#27ae60)' : '#270566',
                  boxShadow: added ? 'none' : '0 8px 28px rgba(39,5,102,0.22)',
                }}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span key="added" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                      <Check size={16} /> Agregado
                    </motion.span>
                  ) : (
                    <motion.span key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                      <ShoppingCart size={16} /> Agregar al carrito
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Buy now */}
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 font-semibold border-2 text-[#270566] hover:bg-[#270566]/8 transition-all active:scale-95"
              style={{ borderRadius: '0.5rem 2rem 0.5rem 2rem', borderColor: 'rgba(39,5,102,0.3)' }}
            >
              <Zap size={15} className="inline mr-1.5" />
              Comprar ahora
            </button>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/573001234567?text=${encodeURIComponent(`Hola! Quiero pedir petit poo ${product.name} (${qty} unidad${qty > 1 ? 'es' : ''})`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 font-medium text-sm border border-[#270566]/10 hover:border-[#25D366]/50 hover:bg-[#25D366]/8 transition-all flex items-center justify-center gap-2 text-[#9469b5] hover:text-[#25D366] rounded-2xl"
            >
              <MessageCircle size={15} />
              Pedir por WhatsApp
            </a>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                { icon: <Truck size={14} />, title: 'Envío gratis', desc: 'En compras +$80K' },
                { icon: <Shield size={14} />, title: 'Garantía', desc: 'Satisfacción 100%' },
                { icon: <Leaf size={14} />, title: '100% Natural', desc: 'Aceites esenciales' },
                { icon: <RotateCcw size={14} />, title: 'Devoluciones', desc: '30 días' },
              ].map(b => (
                <div
                  key={b.title}
                  className="flex items-center gap-2 p-3 rounded-xl bg-white border border-[#270566]/8"
                >
                  <span className="text-[#6d17e0]">{b.icon}</span>
                  <div>
                    <p className="text-[#270566] text-xs font-semibold">{b.title}</p>
                    <p className="text-[#9469b5] text-[10px]">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div
              className="rounded-2xl overflow-hidden bg-white"
              style={{ border: '1px solid rgba(39,5,102,0.1)' }}
            >
              <div className="px-4">
                <AccordionItem title="Envío y entrega">
                  <p>Enviamos a toda Colombia. El tiempo de entrega es de 1 a 3 días hábiles. Envío gratis en compras superiores a $80.000 COP.</p>
                </AccordionItem>
                <AccordionItem title="Política de devoluciones">
                  <p>Si no estás satisfecho con tu compra, puedes devolverla dentro de 30 días. Contáctanos por WhatsApp o email.</p>
                </AccordionItem>
                <AccordionItem title="Por qué petit poo">
                  <p>Fórmula 100% natural con aceites esenciales de grado terapéutico. Sin parabenos, sin sulfatos, sin petroquímicos. Vegano y cruelty-free.</p>
                </AccordionItem>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div
          className="flex overflow-x-auto gap-1 p-1 rounded-2xl mb-8"
          style={{ background: '#f5f0ff', border: '1px solid rgba(39,5,102,0.08)' }}
        >
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'text-white' : 'text-[#9469b5] hover:text-[#270566]'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: '#270566' }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'descripcion' && (
              <div className="max-w-3xl">
                <p className="text-[#270566]/85 text-base leading-relaxed mb-6">{product.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { Icon: Droplets, title: '14ml', desc: '200+ usos por frasco' },
                    { Icon: Leaf, title: 'Natural', desc: 'Aceites esenciales puros' },
                    { Icon: Zap, title: 'Instantáneo', desc: 'Actúa en segundos' },
                  ].map(f => (
                    <div
                      key={f.title}
                      className="p-4 rounded-2xl text-center bg-white border border-[#270566]/8"
                      style={{ boxShadow: '0 2px 12px rgba(39,5,102,0.05)' }}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 bg-[#6d17e0]/10">
                        <f.Icon size={20} className="text-[#6d17e0]" />
                      </div>
                      <p className="text-[#270566] font-bold">{f.title}</p>
                      <p className="text-[#9469b5] text-xs mt-0.5">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'uso' && (
              <div className="max-w-2xl space-y-3">
                {product.howToUse.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#270566]/8"
                    style={{ boxShadow: '0 2px 12px rgba(39,5,102,0.05)' }}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                      style={{ background: '#270566' }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-[#270566]/85 text-sm leading-relaxed pt-1">{step}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'ingredientes' && (
              <div className="max-w-2xl">
                <p className="text-[#270566]/85 text-sm leading-relaxed mb-4">{product.ingredients}</p>
                <div className="p-4 rounded-2xl border border-green-200 bg-green-50">
                  <div className="flex items-center gap-2 text-green-700 text-sm font-semibold mb-2">
                    <Leaf size={14} /> Certificaciones
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Vegano', 'Cruelty-free', 'Sin parabenos', 'Sin sulfatos', 'Natural'].map(c => (
                      <span key={c} className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700 border border-green-200 flex items-center gap-1">
                        <Check size={9} /> {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'resenas' && <ReviewsSection product={product} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Related products */}
      <div className="border-t border-[#270566]/8 py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <RelatedProducts current={product} />
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div
        className={`fixed bottom-0 inset-x-0 z-[55] sticky-product-bar ${stickyVisible ? 'visible' : ''}`}
        style={{
          background: 'rgba(255,255,255,0.97)',
          borderTop: '1px solid rgba(39,5,102,0.12)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 -4px 20px rgba(39,5,102,0.08)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `linear-gradient(135deg, ${product.bgFrom}, ${product.bgTo})` }}
            >
              <ProdIcon size={20} style={{ color: product.colorDark }} />
            </div>
            <div>
              <p className="text-[#270566] text-sm font-semibold leading-tight">petit poo {product.name}</p>
              <p className="text-[#6d17e0] text-sm font-bold">{formatCOP(finalPrice)} COP</p>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all active:scale-95"
            style={{
              borderRadius: '2rem 0.5rem 2rem 0.5rem',
              background: '#270566',
              boxShadow: '0 4px 16px rgba(39,5,102,0.22)',
            }}
          >
            <ShoppingCart size={15} /> Agregar
          </button>
        </div>
      </div>
    </div>
  )
}
