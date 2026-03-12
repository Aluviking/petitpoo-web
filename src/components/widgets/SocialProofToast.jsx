import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, X, MapPin } from 'lucide-react'
import { SOCIAL_PROOF_EVENTS } from '../../data/products'

export default function SocialProofToast() {
  const [current, setCurrent] = useState(null)
  const [idx, setIdx] = useState(0)
  const [dismissed, setDismissed] = useState(false)
  const timerRef = useRef(null)

  const show = (i) => {
    setCurrent(SOCIAL_PROOF_EVENTS[i])
    timerRef.current = setTimeout(() => {
      setCurrent(null)
      if (!dismissed) {
        timerRef.current = setTimeout(() => {
          const next = (i + 1) % SOCIAL_PROOF_EVENTS.length
          setIdx(next)
          show(next)
        }, 12000)
      }
    }, 5000)
  }

  useEffect(() => {
    const init = setTimeout(() => show(0), 9000)
    return () => { clearTimeout(init); clearTimeout(timerRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (dismissed) return null

  return (
    <div className="fixed bottom-[88px] sm:bottom-20 left-4 z-[70] pointer-events-none max-w-[290px]">
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(109,23,224,0.15)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(109,23,224,0.08)' }}
            >
              <ShoppingBag size={16} style={{ color: '#6d17e0' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#270566] text-xs font-bold leading-tight">
                {current.name}
              </p>
              <p className="text-gray-500 text-xs mt-0.5 leading-tight">
                acaba de comprar <span className="font-semibold text-[#270566]">petit poo {current.product}</span>
              </p>
              <p className="flex items-center gap-1 text-gray-400 text-[10px] mt-1">
                <MapPin size={9} /> {current.city} · Hace {current.time}
              </p>
            </div>
            <button
              onClick={() => { setCurrent(null); setDismissed(true) }}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors shrink-0"
              aria-label="Cerrar notificación"
            >
              <X size={11} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
