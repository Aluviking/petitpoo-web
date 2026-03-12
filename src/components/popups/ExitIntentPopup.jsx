import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Droplets, Zap } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { PRODUCTS } from '../../data/products'

const FEATURED = PRODUCTS[1] // Very Berry

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false)
  const triggered = useRef(false)
  const { addToCart } = useCart()

  useEffect(() => {
    if (sessionStorage.getItem('pp_exit_seen')) return
    const handle = (e) => {
      if (e.clientY <= 0 && !triggered.current) {
        triggered.current = true
        setOpen(true)
        sessionStorage.setItem('pp_exit_seen', '1')
      }
    }
    document.addEventListener('mouseleave', handle)
    return () => document.removeEventListener('mouseleave', handle)
  }, [])

  const close = () => setOpen(false)

  const addAndClose = () => {
    addToCart(FEATURED, 1)
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
          onClick={close}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-2xl overflow-hidden"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(124,58,237,0.15)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.14)',
            }}
          >
            <div className="h-1" style={{ background: 'linear-gradient(90deg,#7C3AED,#9333EA)' }} />

            <button
              onClick={close}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Cerrar"
            >
              <X size={14} />
            </button>

            {/* Product visual */}
            <div
              className="h-28 flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${FEATURED.bgFrom}, ${FEATURED.bgTo})` }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.25)' }}>
                <Droplets size={32} style={{ color: FEATURED.colorDark }} />
              </div>
            </div>

            <div className="p-5">
              <div className="mb-4">
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pp-blue/15 text-pp-blue border border-pp-blue/30 mb-2">
                  Oferta especial
                </span>
                <h2 className="text-[#0a0520] text-lg font-bold leading-tight">
                  Tu baño merece oler bien.{' '}
                  <span className="text-pp-blue">Ahora mismo.</span>
                </h2>
                <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
                  El <span className="text-[#0a0520] font-semibold">petit poo {FEATURED.name}</span> — el más vendido — te espera.
                </p>
              </div>

              <div
                className="flex items-center justify-between px-3 py-2.5 rounded-xl border mb-4"
                style={{ background: 'rgba(124,58,237,0.05)', borderColor: 'rgba(124,58,237,0.2)' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `linear-gradient(135deg,${FEATURED.bgFrom},${FEATURED.bgTo})` }}>
                    <Droplets size={14} style={{ color: FEATURED.colorDark }} />
                  </div>
                  <div>
                    <p className="text-[#0a0520] text-xs font-semibold">petit poo {FEATURED.name}</p>
                    <p className="text-gray-400 text-[10px]">{FEATURED.tagline}</p>
                  </div>
                </div>
                <span className="text-pp-blue font-bold text-sm">${(FEATURED.price / 1000).toFixed(0)}K</span>
              </div>

              <div className="flex items-center gap-1.5 text-amber-400 text-xs mb-3 justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 urgency-dot" />
                Solo quedan {FEATURED.stockLeft} unidades
              </div>

              <div className="space-y-2">
                <button
                  onClick={addAndClose}
                  className="w-full py-3 font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all active:scale-95 bg-pp-blue hover:bg-pp-blue/80"
                  style={{ borderRadius: '2rem 0.5rem 2rem 0.5rem' }}
                >
                  <Zap size={14} /> Quiero este aroma
                </button>
                <button
                  onClick={close}
                  className="w-full py-1.5 text-gray-400 text-xs hover:text-gray-600 transition-colors"
                >
                  No gracias
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
