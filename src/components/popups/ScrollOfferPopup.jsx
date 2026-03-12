import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Truck } from 'lucide-react'
import { PRODUCTS } from '../../data/products'
import { useCart } from '../../context/CartContext'

const FEATURED = PRODUCTS[0] // Strawberry (first product)

export default function ScrollOfferPopup() {
  const [open, setOpen] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    if (sessionStorage.getItem('pp_scroll_offer')) return
    const handle = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      if (pct > 35) {
        setOpen(true)
        sessionStorage.setItem('pp_scroll_offer', '1')
        window.removeEventListener('scroll', handle)
      }
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  const close = () => setOpen(false)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="fixed bottom-[5.5rem] sm:bottom-20 right-4 z-[118] w-[290px] bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{ border: '1px solid rgba(124,58,237,0.2)' }}
        >
          <div className="h-1" style={{ background: 'linear-gradient(90deg,#7C3AED,#a855f7)' }} />

          <button
            onClick={close}
            className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
            aria-label="Cerrar"
          >
            <X size={12} />
          </button>

          {/* Product strip */}
          <div
            className="w-full h-20 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${FEATURED.bgFrom}, ${FEATURED.bgTo})` }}
          >
            <div className="text-center">
              <p className="font-display italic font-bold text-lg" style={{ color: FEATURED.colorDark }}>
                petit poo
              </p>
              <p className="font-semibold text-sm" style={{ color: FEATURED.colorDark }}>
                {FEATURED.name}
              </p>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center gap-1 mb-2">
              {[1,2,3,4,5].map(n => (
                <Star key={n} size={11} fill="#f1c40f" className="text-amber-400" />
              ))}
              <span className="text-gray-400 text-xs ml-1">(842)</span>
            </div>
            <p className="text-[#0a0520] font-bold text-sm leading-tight mb-1">
              {FEATURED.tagline}
            </p>
            <p className="text-gray-500 text-xs mb-3">El aroma más amado de Colombia</p>

            <div className="flex items-center gap-1.5 text-xs text-green-600 mb-3 font-medium">
              <Truck size={11} />
              Envío gratis — compra +$80K
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-pp-blue font-black text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                ${(FEATURED.price / 1000).toFixed(0)}K COP
              </span>
              {FEATURED.comparePrice && (
                <span className="text-gray-400 text-xs line-through">
                  ${(FEATURED.comparePrice / 1000).toFixed(0)}K
                </span>
              )}
            </div>

            <button
              onClick={() => { addToCart(FEATURED, 1); close() }}
              className="w-full py-2.5 bg-pp-blue hover:bg-pp-blue/80 text-white font-bold text-xs transition-all active:scale-95"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderRadius: '2rem 0.5rem 2rem 0.5rem' }}
            >
              Agregar al carrito
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
