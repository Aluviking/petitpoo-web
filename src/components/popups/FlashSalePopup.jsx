import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap, Clock, ShoppingCart, Star, Package, Droplets } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { PRODUCTS } from '../../data/products'

const DEAL_PRODUCT = PRODUCTS.find(p => p.id === 5) || PRODUCTS[4] // Kit Inicio

const TOTAL_SECONDS = 30 * 60 // 30 min

function useCountdown(start) {
  const [secs, setSecs] = useState(TOTAL_SECONDS)
  useEffect(() => {
    if (!start) return
    const interval = setInterval(() => {
      setSecs(s => {
        if (s <= 1) { clearInterval(interval); return 0 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [start])
  const m = String(Math.floor(secs / 60)).padStart(2, '0')
  const s = String(secs % 60).padStart(2, '0')
  return { m, s, secs }
}

export default function FlashSalePopup() {
  const [open, setOpen] = useState(false)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()
  const { m, s } = useCountdown(open)

  useEffect(() => {
    if (sessionStorage.getItem('pp_flash_seen')) return
    const t = setTimeout(() => setOpen(true), 50000) // 50s after load
    return () => clearTimeout(t)
  }, [])

  const close = () => {
    setOpen(false)
    sessionStorage.setItem('pp_flash_seen', '1')
  }

  const handleAdd = () => {
    addToCart(DEAL_PRODUCT, 1)
    setAdded(true)
    setTimeout(() => { close() }, 1400)
  }

  if (!DEAL_PRODUCT) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[116] flex items-center justify-center p-4"
          style={{ background: 'rgba(39,5,102,0.65)', backdropFilter: 'blur(8px)' }}
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 24 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl"
            style={{ border: '1px solid rgba(109,23,224,0.2)' }}
          >
            {/* Flash header */}
            <div
              className="px-5 py-4 text-white text-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #270566 0%, #6d17e0 100%)' }}
            >
              {/* Animated shine */}
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)', animation: 'shimmer 2.5s infinite' }}
              />
              <button
                onClick={close}
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                aria-label="Cerrar"
              >
                <X size={13} />
              </button>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Zap size={18} className="text-yellow-300 fill-yellow-300" />
                <span className="text-yellow-300 font-black text-sm uppercase tracking-widest" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Oferta Flash
                </span>
                <Zap size={18} className="text-yellow-300 fill-yellow-300" />
              </div>
              <p className="text-white/90 text-xs">Solo por tiempo limitado</p>

              {/* Countdown */}
              <div className="flex items-center justify-center gap-2 mt-3">
                <Clock size={13} className="text-white/70" />
                <div className="flex items-center gap-1">
                  <div className="bg-white/20 rounded-lg px-2.5 py-1 min-w-[2.2rem] text-center">
                    <span className="text-white font-black text-lg leading-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{m}</span>
                  </div>
                  <span className="text-white font-black text-lg">:</span>
                  <div className="bg-white/20 rounded-lg px-2.5 py-1 min-w-[2.2rem] text-center">
                    <span className="text-white font-black text-lg leading-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s}</span>
                  </div>
                </div>
                <span className="text-white/60 text-xs">restantes</span>
              </div>
            </div>

            {/* Product */}
            <div className="p-5">
              <div className="flex items-center gap-3 p-3 rounded-2xl mb-4" style={{ background: `linear-gradient(135deg, ${DEAL_PRODUCT.bgFrom}, ${DEAL_PRODUCT.bgTo})` }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-white/40">
                  {DEAL_PRODUCT.category === 'kit'
                    ? <Package size={28} style={{ color: DEAL_PRODUCT.colorDark }} strokeWidth={1.5} />
                    : <Droplets size={28} style={{ color: DEAL_PRODUCT.colorDark }} strokeWidth={1.5} />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm leading-tight" style={{ color: DEAL_PRODUCT.colorDark, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    petit poo {DEAL_PRODUCT.name}
                  </p>
                  <p className="text-xs mt-0.5 opacity-80" style={{ color: DEAL_PRODUCT.colorDark }}>
                    {DEAL_PRODUCT.tagline}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {[1,2,3,4,5].map(n => (
                      <Star key={n} size={9} fill="#f1c40f" className="text-amber-400" />
                    ))}
                    <span className="text-[10px] opacity-70" style={{ color: DEAL_PRODUCT.colorDark }}>({DEAL_PRODUCT.reviewCount})</span>
                  </div>
                </div>
              </div>

              {/* Price + savings */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[#270566] font-black text-2xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      ${(DEAL_PRODUCT.price * 0.8 / 1000).toFixed(0)}K
                    </span>
                    <span className="text-gray-400 text-sm line-through">
                      ${(DEAL_PRODUCT.price / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400">COP · IVA incl.</p>
                </div>
                <div className="px-3 py-1.5 rounded-xl text-center" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  <p className="text-red-500 font-black text-xl leading-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>−20%</p>
                  <p className="text-red-400 text-[9px] font-semibold">FLASH</p>
                </div>
              </div>

              {/* Stock bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500 font-medium">Stock disponible</span>
                  <span className="text-red-500 font-bold">{DEAL_PRODUCT.stockLeft} restantes</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '80%' }}
                    animate={{ width: `${(DEAL_PRODUCT.stockLeft / 20) * 100}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-red-400 to-orange-400"
                  />
                </div>
              </div>

              <button
                onClick={handleAdd}
                disabled={added}
                className="w-full py-3.5 text-white font-black text-sm flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-80"
                style={{
                  background: added ? 'linear-gradient(135deg,#2ecc71,#27ae60)' : 'linear-gradient(135deg,#6d17e0,#9469b5)',
                  borderRadius: '2rem 0.5rem 2rem 0.5rem',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {added ? '✓ Agregado al carrito' : <><ShoppingCart size={15} /> Aprovechar oferta flash</>}
              </button>
              <button
                onClick={close}
                className="w-full py-2 text-gray-400 text-xs hover:text-gray-600 transition-colors mt-1"
              >
                No me interesa esta oferta
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
