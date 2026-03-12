import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Flame, Clock, ShoppingCart, Check, Droplets, Package } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { PRODUCTS } from '../../data/products'

const DEALS = [PRODUCTS[0], PRODUCTS[1], PRODUCTS[4]] // Strawberry, Very Berry, Kit

function useCountdown(totalSeconds) {
  const [secs, setSecs] = useState(totalSeconds)
  useEffect(() => {
    const t = setInterval(() => setSecs(s => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])
  const m = String(Math.floor(secs / 60)).padStart(2, '0')
  const s = String(secs % 60).padStart(2, '0')
  return `${m}:${s}`
}

export default function FlashDealPopup() {
  const [open, setOpen] = useState(false)
  const [added, setAdded] = useState(null)
  const { addToCart, formatCOP } = useCart()
  const time = useCountdown(15 * 60)

  useEffect(() => {
    if (sessionStorage.getItem('pp_flash_seen')) return
    const t = setTimeout(() => setOpen(true), 45000)
    return () => clearTimeout(t)
  }, [])

  const close = () => {
    setOpen(false)
    sessionStorage.setItem('pp_flash_seen', '1')
  }

  const handleAdd = (product) => {
    addToCart(product, 1)
    setAdded(product.id)
    setTimeout(() => setAdded(null), 1800)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[116] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 24 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
            style={{ border: '1px solid rgba(0,0,0,0.08)' }}
          >
            {/* Flash header — red gradient like Temu */}
            <div
              className="relative px-5 pt-4 pb-4 text-white text-center"
              style={{ background: 'linear-gradient(135deg, #e53e3e 0%, #dd6b20 100%)' }}
            >
              <button
                onClick={close}
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 text-white transition-colors"
                aria-label="Cerrar"
              >
                <X size={13} />
              </button>

              <div className="flex items-center justify-center gap-2 mb-0.5">
                <Flame size={19} className="text-yellow-300" />
                <span
                  className="font-black text-xl tracking-wide"
                  style={{ fontFamily: 'Outfit, sans-serif', textShadow: '0 1px 4px rgba(0,0,0,0.25)' }}
                >
                  FLASH SALE
                </span>
                <Flame size={19} className="text-yellow-300" />
              </div>
              <p className="text-white/85 text-[11px]">Descuento exclusivo · Solo por hoy</p>

              {/* Countdown */}
              <div
                className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full"
                style={{ background: 'rgba(0,0,0,0.2)' }}
              >
                <Clock size={13} className="text-yellow-300 shrink-0" />
                <span className="text-[11px] text-white/80 font-medium">Termina en</span>
                <span
                  className="font-mono font-black text-yellow-300 text-lg tracking-widest"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {time}
                </span>
              </div>
            </div>

            {/* Deals */}
            <div className="p-5">
              <p className="text-[#0a0520] text-sm font-bold mb-3 text-center">
                20% OFF — solo en esta ventana
              </p>

              <div className="space-y-2.5">
                {DEALS.map(product => {
                  const isKit = product.category === 'kit'
                  const Icon = isKit ? Package : Droplets
                  const discounted = Math.round(product.price * 0.8)
                  const isAdded = added === product.id

                  return (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-3 rounded-2xl"
                      style={{ background: '#f8f8f8', border: '1px solid #eee' }}
                    >
                      {/* Product icon */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `linear-gradient(135deg, ${product.bgFrom}, ${product.bgTo})` }}
                      >
                        <Icon size={22} style={{ color: product.colorDark }} strokeWidth={1.5} />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[#0a0520] text-[13px] font-bold leading-tight truncate">
                          petit poo {product.name}
                        </p>
                        <p className="text-gray-400 text-[11px] truncate">{product.tagline}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-red-500 font-black text-[15px]">{formatCOP(discounted)}</span>
                          <span className="text-gray-300 text-xs line-through">{formatCOP(product.price)}</span>
                          <span
                            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white"
                            style={{ background: '#e53e3e' }}
                          >
                            -20%
                          </span>
                        </div>
                      </div>

                      {/* Add button */}
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAdd(product)}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-white shrink-0 transition-all"
                        style={{
                          background: isAdded
                            ? 'linear-gradient(135deg,#2ecc71,#27ae60)'
                            : 'linear-gradient(135deg,#7C3AED,#9333EA)',
                        }}
                      >
                        {isAdded ? <Check size={14} /> : <ShoppingCart size={14} />}
                      </motion.button>
                    </div>
                  )
                })}
              </div>

              <button
                onClick={close}
                className="w-full mt-3 py-2.5 rounded-xl text-gray-400 text-xs hover:text-gray-600 hover:bg-gray-50 transition-all"
              >
                No, gracias — perder el descuento
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
