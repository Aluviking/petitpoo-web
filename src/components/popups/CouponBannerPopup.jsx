import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check, Gift, Tag } from 'lucide-react'

const COUPONS = [
  { code: 'PETIT10', label: '10% OFF en tu primera compra', color: '#6d17e0', bg: '#f3edf8' },
  { code: 'PPFREE',  label: 'Envío GRATIS en tu próximo pedido', color: '#0d9488', bg: '#f0fdfa' },
  { code: 'PP15',    label: '15% OFF comprando 2 o más', color: '#dc2626', bg: '#fef2f2' },
]

export default function CouponBannerPopup() {
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('pp_coupon_seen')) return
    const t = setTimeout(() => setOpen(true), 7000)
    return () => clearTimeout(t)
  }, [])

  // Auto-cycle coupons
  useEffect(() => {
    if (!open) return
    const t = setInterval(() => {
      setActiveIdx(i => (i + 1) % COUPONS.length)
      setCopied(false)
    }, 4500)
    return () => clearInterval(t)
  }, [open])

  const close = () => {
    setOpen(false)
    sessionStorage.setItem('pp_coupon_seen', '1')
  }

  const copy = () => {
    navigator.clipboard.writeText(COUPONS[activeIdx].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const coupon = COUPONS[activeIdx]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="fixed top-[108px] left-0 right-0 z-[98] flex items-center justify-between px-4 py-2.5 shadow-md"
          style={{ background: coupon.bg, borderBottom: `2px solid ${coupon.color}20` }}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: coupon.color + '15' }}>
              <Gift size={14} style={{ color: coupon.color }} />
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="text-xs font-semibold truncate"
                  style={{ color: '#270566' }}
                >
                  {coupon.label}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-3">
            <button
              onClick={copy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white transition-all active:scale-95"
              style={{ background: coupon.color, borderRadius: '1.5rem 0.4rem 1.5rem 0.4rem' }}
            >
              {copied ? <><Check size={11} /> Copiado</> : <><Tag size={11} /> {coupon.code}</>}
            </button>

            {/* Dot indicators */}
            <div className="hidden sm:flex items-center gap-1">
              {COUPONS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveIdx(i); setCopied(false) }}
                  className="w-1.5 h-1.5 rounded-full transition-all"
                  style={{ background: i === activeIdx ? coupon.color : coupon.color + '40' }}
                />
              ))}
            </div>

            <button
              onClick={close}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-500 transition-colors"
              aria-label="Cerrar"
            >
              <X size={11} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
