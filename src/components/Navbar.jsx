import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingCart, ChevronDown, Sparkles, Package, TrendingUp, Star,
  Gift, Droplets, Menu, X,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { PRODUCTS } from '../data/products'

const CATEGORIES = [
  { label: 'Todos los aromas', Icon: Sparkles },
  { label: 'Más vendidos',     Icon: TrendingUp },
  { label: 'Nuevos',           Icon: Star },
  { label: 'Kits & bundles',   Icon: Gift },
]

function MegaMenuProducts({ onClose }) {
  const navigate = useNavigate()
  const individual = PRODUCTS.filter(p => p.category === 'individual')
  const kits = PRODUCTS.filter(p => p.category === 'kit')
  const go = (slug) => { navigate(`/product/${slug}`); onClose() }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scaleY: 0.96 }}
      animate={{ opacity: 1, y: 0, scaleY: 1 }}
      exit={{ opacity: 0, y: -10, scaleY: 0.96 }}
      transition={{ duration: 0.2, ease: [0.25, 0.8, 0.25, 1] }}
      className="mega-menu absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[780px] max-w-[96vw] z-50 overflow-hidden rounded-2xl"
      style={{
        background: '#ffffff',
        border: '1px solid rgba(109,23,224,0.12)',
        boxShadow: '0 24px 60px rgba(39,5,102,0.15)',
      }}
    >
      <div className="flex flex-col sm:flex-row">
        <div
          className="sm:w-44 shrink-0 p-4 flex sm:flex-col flex-row gap-1 border-b sm:border-b-0 sm:border-r border-purple-100"
          style={{ background: '#faf5ff' }}
        >
          <p className="hidden sm:block text-gray-400 text-[10px] font-bold uppercase tracking-widest px-2 mb-2">
            Categorías
          </p>
          {CATEGORIES.map(({ label, Icon }) => (
            <button
              key={label}
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-600 hover:text-pp-blue hover:bg-pp-blue/8 transition-colors text-sm text-left whitespace-nowrap font-medium"
            >
              <Icon size={13} className="text-pp-blue" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
          <div className="hidden sm:block mt-auto pt-4 border-t border-purple-100">
            <div className="rounded-xl p-3" style={{ background: 'linear-gradient(135deg, rgba(109,23,224,0.08), rgba(148,105,181,0.06))' }}>
              <p className="text-pp-blue text-xs font-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>PETIT10</p>
              <p className="text-gray-500 text-[10px] mt-0.5">10% OFF primera compra</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-5">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3">Aromas individuales</p>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {individual.map(product => (
              <button
                key={product.id}
                onClick={() => go(product.slug)}
                className="group flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-purple-50 transition-all"
              >
                <div
                  className="w-full aspect-square rounded-xl overflow-hidden group-hover:scale-105 transition-transform relative"
                  style={{ background: `linear-gradient(135deg, ${product.bgFrom}, ${product.bgTo})` }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Droplets size={22} color={product.colorDark} strokeWidth={1.5} />
                  </div>
                  {product.tag && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: product.color }} />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-[#270566] text-[11px] font-semibold leading-tight group-hover:text-pp-blue transition-colors">{product.name}</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">${(product.price / 1000).toFixed(0)}K</p>
                </div>
              </button>
            ))}
          </div>

          <div className="border-t border-purple-100 pt-3">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Kits & bundles</p>
            <div className="grid grid-cols-2 gap-2">
              {kits.map(kit => (
                <button
                  key={kit.id}
                  onClick={() => go(kit.slug)}
                  className="group flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 transition-all text-left border border-purple-100 hover:border-pp-blue/40"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                    style={{ background: `linear-gradient(135deg, ${kit.bgFrom}, ${kit.bgTo})` }}
                  >
                    <Package size={16} color={kit.colorDark} strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#270566] text-xs font-semibold truncate">{kit.name}</p>
                    <p className="text-pp-blue text-[11px] font-bold">${(kit.price / 1000).toFixed(0)}K COP</p>
                  </div>
                  {kit.tag && (
                    <span className="ml-auto text-[9px] font-bold px-2 py-1 rounded-full bg-green-100 text-green-700 shrink-0 whitespace-nowrap">{kit.tag}</span>
                  )}
                </button>
              ))}
              <button
                onClick={onClose}
                className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl border border-dashed border-pp-blue/30 hover:border-pp-blue/60 hover:bg-pp-blue/5 transition-all"
              >
                <Sparkles size={16} className="text-pp-blue" />
                <span className="text-pp-blue text-xs font-bold">Ver todo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen]         = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [scrolled, setScrolled]         = useState(false)
  const productsRef = useRef(null)
  const { count, setIsOpen } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (productsRef.current && !productsRef.current.contains(e.target)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <>
      <header
        className="fixed left-0 right-0 z-50 transition-all duration-300"
        style={{
          top: '44px',
          background: '#ffffff',
          borderBottom: '1px solid rgba(39,5,102,0.1)',
          boxShadow: scrolled ? '0 2px 20px rgba(39,5,102,0.1)' : 'none',
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity shrink-0"
            onClick={() => setMenuOpen(false)}
            aria-label="petit poo — inicio"
          >
            <img
              src={import.meta.env.BASE_URL + 'logo.jpeg'}
              alt="petit poo logo"
              className="h-10 w-auto shrink-0"
              style={{ borderRadius: '8px' }}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            <Link to="/" className="text-[#270566]/60 hover:text-[#270566] text-sm font-medium transition-colors">
              Inicio
            </Link>

            <div
              ref={productsRef}
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                onClick={() => setProductsOpen(v => !v)}
                className="flex items-center gap-1 text-[#270566]/60 hover:text-[#270566] text-sm font-medium transition-colors py-2"
              >
                Productos
                <motion.span animate={{ rotate: productsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={14} />
                </motion.span>
              </button>
              <AnimatePresence>
                {productsOpen && <MegaMenuProducts onClose={() => setProductsOpen(false)} />}
              </AnimatePresence>
            </div>

            <a href="#proceso" className="text-[#270566]/60 hover:text-[#270566] text-sm font-medium transition-colors">
              Cómo funciona
            </a>
            <a href="#contacto" className="text-[#270566]/60 hover:text-[#270566] text-sm font-medium transition-colors">
              Contacto
            </a>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-[#270566]/8 transition-colors"
              aria-label="Carrito"
            >
              <ShoppingCart size={19} style={{ color: '#270566' }} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full text-white text-[10px] font-bold flex items-center justify-center px-1"
                    style={{ background: '#6d17e0' }}
                  >
                    {count > 9 ? '9+' : count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <a
              href="#productos"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-pp-blue hover:bg-pp-blue/80 text-white text-sm font-semibold transition-all active:scale-95"
              style={{ borderRadius: '2rem 0.5rem 2rem 0.5rem' }}
            >
              <Package size={14} />
              Comprar
            </a>

            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden p-2.5 rounded-full hover:bg-[#270566]/8 transition-colors"
              aria-label="Menú"
              style={{ color: '#270566' }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-0 z-40 md:hidden overflow-y-auto max-h-[calc(100vh-7rem)]"
            style={{ top: 'calc(44px + 64px)', background: '#ffffff', borderBottom: '1px solid rgba(39,5,102,0.1)', boxShadow: '0 8px 24px rgba(39,5,102,0.1)' }}
          >
            <div className="px-5 py-4 space-y-1">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 py-3 font-medium border-b text-base"
                style={{ color: '#270566', borderColor: 'rgba(39,5,102,0.08)' }}
              >
                Inicio
              </Link>

              <div className="py-3 border-b" style={{ borderColor: 'rgba(39,5,102,0.08)' }}>
                <p className="text-[#270566]/50 text-xs uppercase tracking-widest mb-3 font-semibold">Productos</p>
                <div className="grid grid-cols-3 gap-2">
                  {PRODUCTS.map(p => (
                    <Link
                      key={p.id}
                      to={`/product/${p.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-[#270566]/5 transition-colors"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${p.bgFrom}, ${p.bgTo})` }}
                      >
                        <Droplets size={20} color={p.colorDark} strokeWidth={1.5} />
                      </div>
                      <span className="text-[#270566] text-[10px] text-center leading-tight font-medium">{p.name}</span>
                      <span className="text-pp-blue text-[10px] font-semibold">${(p.price / 1000).toFixed(0)}K</span>
                    </Link>
                  ))}
                </div>
              </div>

              <a href="#proceso" onClick={() => setMenuOpen(false)} className="flex items-center py-3 font-medium border-b text-base" style={{ color: '#270566', borderColor: 'rgba(39,5,102,0.08)' }}>
                Cómo funciona
              </a>
              <a href="#contacto" onClick={() => setMenuOpen(false)} className="flex items-center py-3 font-medium text-base" style={{ color: '#270566' }}>
                Contacto
              </a>

              <div className="pt-3 pb-2">
                <a
                  href="#productos"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center py-3.5 bg-pp-blue text-white font-semibold text-sm"
                  style={{ borderRadius: '2rem 0.5rem 2rem 0.5rem' }}
                >
                  Comprar ahora
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
