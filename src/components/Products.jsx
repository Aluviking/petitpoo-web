import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Eye, Star, Check, Droplets, Package, Leaf, Shield, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { PRODUCTS } from '../data/products'
import WaveDivider from './WaveDivider'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          size={10}
          className={n <= Math.round(rating) ? 'star-filled' : 'star-empty'}
          fill={n <= Math.round(rating) ? '#f1c40f' : 'none'}
        />
      ))}
    </div>
  )
}

function ProductVisual({ product, large = false }) {
  const size = large ? 52 : 44
  const IconComponent = product.category === 'kit' ? Package : Droplets
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative flex flex-col items-center gap-3"
    >
      {/* Icon container */}
      <div
        className="rounded-2xl flex items-center justify-center"
        style={{
          width: large ? 96 : 80,
          height: large ? 96 : 80,
          background: '#ffffff',
          boxShadow: `0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)`,
        }}
      >
        <IconComponent size={size} color={product.color} strokeWidth={1.6} />
      </div>
      {large && (
        <div className="text-center">
          <p className="font-bold text-sm opacity-70" style={{ color: product.colorDark }}>petit poo</p>
          <p className="font-black text-base" style={{ color: product.colorDark }}>{product.name}</p>
        </div>
      )}
    </motion.div>
  )
}

function ProductCard({ product, index }) {
  const { addToCart, formatCOP } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-3xl overflow-hidden bg-white"
      style={{ border: '1px solid rgba(10,5,32,0.07)', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', transition: 'box-shadow 0.3s, transform 0.3s' }}
      whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(0,0,0,0.13)' }}
    >
      {/* Tags */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.tag && (
          <span
            className="text-[10px] uppercase tracking-wider font-black px-2.5 py-1 rounded-full text-white shadow-sm"
            style={{
              background: product.tag === 'Más vendido'
                ? 'linear-gradient(135deg, #e67e22, #f1c40f)'
                : product.tag === 'Nuevo'
                ? 'linear-gradient(135deg, #7C3AED, #2ecc71)'
                : 'linear-gradient(135deg, #2ecc71, #27ae60)',
            }}
          >
            {product.tag}
          </span>
        )}
        {product.stockLeft <= 5 && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 border border-red-200">
            Solo {product.stockLeft} left
          </span>
        )}
      </div>

      {/* Quick view button */}
      <div className="absolute top-3 right-3 z-10">
        <Link
          to={`/product/${product.slug}`}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 text-gray-500 hover:text-pp-blue shadow-sm opacity-0 group-hover:opacity-100 transition-all"
        >
          <Eye size={14} />
        </Link>
      </div>

      {/* Visual area — neutral */}
      <Link to={`/product/${product.slug}`} className="block relative overflow-hidden">
        <div
          className="w-full flex flex-col items-center justify-center pt-8 pb-5 px-4 relative overflow-hidden"
          style={{ background: '#f5f3fa', minHeight: 185 }}
        >
          <div className="relative z-10 mb-3">
            <ProductVisual product={product} />
          </div>

          {/* Product name inside visual */}
          <div className="relative z-10 text-center">
            <p className="text-[11px] font-semibold text-gray-400">petit poo</p>
            <p className="font-black text-lg leading-tight text-[#270566]">{product.name}</p>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Stars + notes */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <StarRating rating={product.rating} />
            <span className="text-gray-400 text-[10px]">({product.reviewCount.toLocaleString()})</span>
          </div>
          <div className="flex gap-1">
            {product.notes.slice(0, 1).map(note => (
              <span
                key={note}
                className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                style={{ color: product.colorDark, background: product.bgFrom + 'cc' }}
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">{product.tagline}</p>

        <div className="mt-auto">
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="text-[#0a0520] font-black text-xl">{formatCOP(product.price)}</span>
            {product.comparePrice && (
              <span className="text-gray-400 text-sm line-through">{formatCOP(product.comparePrice)}</span>
            )}
            <span className="text-gray-400 text-xs">COP</span>
          </div>

          <button
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-2 py-3 text-sm font-black transition-all active:scale-95 text-white"
            style={{
              borderRadius: '2rem 0.5rem 2rem 0.5rem',
              background: added
                ? 'linear-gradient(135deg,#2ecc71,#27ae60)'
                : '#270566',
              boxShadow: added ? 'none' : '0 6px 20px rgba(39,5,102,0.25)',
            }}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5">
                  <Check size={14} /> Agregado al carrito
                </motion.span>
              ) : (
                <motion.span key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5">
                  <ShoppingCart size={14} /> Agregar al carrito
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Products() {
  return (
    <section id="productos" className="relative bg-[#f8f6ff] py-12 md:py-16">
      <WaveDivider fill="#f8f6ff" position="top" />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-16">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-block text-[10px] uppercase tracking-[0.35em] text-pp-blue font-semibold mb-3 px-3 py-1 rounded-full bg-pp-blue/8 border border-pp-blue/20">
            Nuestros aromas
          </span>
          <h2
            className="font-display font-semibold italic text-[#0a0520] leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}
          >
            Elige el tuyo.
          </h2>
          <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
            Formulados con aceites esenciales naturales. Veganos. Sin químicos agresivos.
          </p>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8"
        >
          {[
            { Icon: Leaf,       text: '100% Natural' },
            { Icon: Shield,     text: 'Cruelty-free' },
            { Icon: Truck,      text: 'Envío Colombia' },
            { Icon: Star,       text: '4.8 / 5 estrellas' },
            { Icon: ShoppingCart, text: 'Compra segura' },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <Icon size={13} className="text-pp-blue" />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-xs text-gray-400"
        >
          Más de <strong className="text-[#0a0520]">5.000 clientes</strong> en Colombia · Envíos en 1-3 días hábiles
        </motion.p>
      </div>

      <WaveDivider fill="#faf7ff" position="bottom" flip />
    </section>
  )
}
