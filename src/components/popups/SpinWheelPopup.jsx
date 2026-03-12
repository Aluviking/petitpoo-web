import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check, Star } from 'lucide-react'

/* ── Prizes ── */
const PRIZES = [
  { label: '10% OFF',     sub: 'en tu compra',   code: 'PETIT10', bg: '#FF6B35', text: '#fff' },
  { label: 'Envío',       sub: 'GRATIS',          code: 'PPFREE',  bg: '#6d17e0', text: '#fff' },
  { label: '5% OFF',      sub: 'en tu compra',   code: 'PP5',     bg: '#F1C40F', text: '#270566' },
  { label: '15% OFF',     sub: 'oferta flash',    code: 'PP15',    bg: '#E74C3C', text: '#fff' },
  { label: '2 x 1',       sub: 'en un aroma',     code: 'PP2X1',   bg: '#00B894', text: '#fff' },
  { label: 'Envío',       sub: 'GRATIS',          code: 'PPFREE',  bg: '#0077B6', text: '#fff' },
  { label: '5% OFF',      sub: 'en tu compra',   code: 'PP5',     bg: '#9469b5', text: '#fff' },
  { label: '20% OFF',     sub: 'primera compra',  code: 'PP20',    bg: '#E91E8C', text: '#fff' },
]

const NUM = PRIZES.length
const ARC = 360 / NUM

/* build gradient once */
const gradient = PRIZES.map((p, i) => {
  const a = i * ARC
  const b = (i + 1) * ARC
  return `${p.bg} ${a}deg ${b}deg`
}).join(', ')

/* Confetti particle */
function Confetti() {
  const items = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: ['#FF6B35','#F1C40F','#E74C3C','#00B894','#6d17e0','#E91E8C'][i % 6],
    size: 6 + Math.random() * 6,
  }))
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map(c => (
        <motion.div
          key={c.id}
          initial={{ y: -20, x: `${c.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: '110vh', opacity: 0, rotate: 360 * 3 }}
          transition={{ duration: 1.8 + Math.random(), delay: c.delay, ease: 'easeIn' }}
          className="absolute top-0 rounded-sm"
          style={{ width: c.size, height: c.size, background: c.color, left: `${c.x}%` }}
        />
      ))}
    </div>
  )
}

export default function SpinWheelPopup() {
  const [open, setOpen]       = useState(false)
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [prize, setPrize]     = useState(null)
  const [copied, setCopied]   = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const baseRef = useRef(0)

  useEffect(() => {
    if (sessionStorage.getItem('pp_spin_seen')) return
    const t = setTimeout(() => setOpen(true), 20000)
    return () => clearTimeout(t)
  }, [])

  const close = () => {
    setOpen(false)
    sessionStorage.setItem('pp_spin_seen', '1')
  }

  const spin = () => {
    if (spinning || prize) return
    setSpinning(true)
    const prizeIdx = Math.floor(Math.random() * NUM)
    const extraSpins = (4 + Math.floor(Math.random() * 3)) * 360
    const landAngle = 360 - (prizeIdx * ARC + ARC / 2)
    const total = baseRef.current + extraSpins + landAngle
    baseRef.current = total
    setRotation(total)
    setTimeout(() => {
      setPrize(PRIZES[prizeIdx])
      setSpinning(false)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2500)
    }, 3800)
  }

  const copy = () => {
    if (!prize?.code) return
    navigator.clipboard.writeText(prize.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[115] flex items-center justify-center p-3"
          style={{ background: 'rgba(20,0,60,0.82)', backdropFilter: 'blur(8px)' }}
          onClick={close}
        >
          {showConfetti && <Confetti />}

          <motion.div
            initial={{ scale: 0.82, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.82, opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-[380px] rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: '#ffffff' }}
          >
            {/* Gradient header */}
            <div
              className="relative px-5 pt-5 pb-4 text-center overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #270566 0%, #6d17e0 60%, #9469b5 100%)' }}
            >
              <button
                onClick={close}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                aria-label="Cerrar"
              >
                <X size={14} />
              </button>
              <div className="flex items-center justify-center gap-1 mb-1">
                {[0,1,2].map(i => <Star key={i} size={14} fill="#F1C40F" className="text-yellow-400" />)}
              </div>
              <h2 className="text-white font-black text-xl leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                ¡Gira y gana!
              </h2>
              <p className="text-white/80 text-xs mt-0.5">Un giro gratis · Premios reales</p>

              {/* 1 giro badge */}
              <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-white/15 border border-white/25">
                <span className="text-yellow-300 text-xs font-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>1 GIRO</span>
                <span className="text-white/60 text-xs">disponible</span>
              </div>
            </div>

            {/* Wheel area */}
            <div className="px-5 py-4">
              <div className="relative flex flex-col items-center">

                {/* Pointer arrow */}
                <div className="relative z-20 mb-[-8px]">
                  <div style={{
                    width: 0, height: 0,
                    borderLeft: '12px solid transparent',
                    borderRight: '12px solid transparent',
                    borderTop: '22px solid #270566',
                    filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.4))',
                  }} />
                </div>

                {/* Outer ring */}
                <div
                  className="rounded-full p-2 relative"
                  style={{
                    background: 'linear-gradient(135deg, #270566, #6d17e0)',
                    boxShadow: '0 8px 40px rgba(109,23,224,0.5), 0 0 0 4px rgba(109,23,224,0.15)',
                  }}
                >
                  <motion.div
                    animate={{ rotate: rotation }}
                    transition={{ duration: 3.8, ease: [0.17, 0, 0.08, 1] }}
                    className="w-56 h-56 rounded-full relative overflow-hidden"
                    style={{ background: `conic-gradient(${gradient})` }}
                  >
                    {/* Segment labels */}
                    {PRIZES.map((p, i) => {
                      const angle = i * ARC + ARC / 2
                      const rad = (angle - 90) * (Math.PI / 180)
                      const r = 38 // % from center
                      const x = 50 + r * Math.cos(rad)
                      const y = 50 + r * Math.sin(rad)
                      return (
                        <div
                          key={i}
                          className="absolute flex flex-col items-center leading-none"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: `translate(-50%,-50%) rotate(${angle}deg)`,
                            width: 52,
                          }}
                        >
                            <span
                            className="font-black text-[8.5px] mt-0.5 leading-tight text-center"
                            style={{ color: p.text, textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
                          >
                            {p.label}
                          </span>
                        </div>
                      )
                    })}

                    {/* Divider lines */}
                    {PRIZES.map((_, i) => (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 origin-left"
                        style={{
                          width: '50%',
                          height: '1.5px',
                          background: 'rgba(255,255,255,0.35)',
                          transform: `translateY(-50%) rotate(${i * ARC}deg)`,
                        }}
                      />
                    ))}

                    {/* Center hub */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center"
                        style={{
                          background: '#ffffff',
                          boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                          border: '3px solid rgba(109,23,224,0.3)',
                        }}
                      >
                        <span className="text-[#6d17e0] font-black text-[10px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>PP</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* CTA area */}
              <div className="mt-4">
                <AnimatePresence mode="wait">
                  {!prize ? (
                    <motion.div key="spin-area" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <button
                        onClick={spin}
                        disabled={spinning}
                        className="w-full py-4 text-white font-black text-base transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        style={{
                          background: spinning
                            ? 'linear-gradient(135deg,#9CA3AF,#6B7280)'
                            : 'linear-gradient(135deg,#FF6B35,#E91E8C)',
                          borderRadius: '2rem 0.5rem 2rem 0.5rem',
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          boxShadow: spinning ? 'none' : '0 6px 20px rgba(233,30,140,0.4)',
                        }}
                      >
                        {spinning ? 'Girando...' : 'GIRAR AHORA'}
                      </button>
                      <p className="text-center text-gray-400 text-[10px] mt-2">Solo 1 giro por visita · Sin trampa</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="prize-area"
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                      className="space-y-3"
                    >
                      {/* Prize banner */}
                      <div
                        className="rounded-2xl p-4 text-center"
                        style={{ background: `linear-gradient(135deg, ${prize.bg}15, ${prize.bg}30)`, border: `2px solid ${prize.bg}50` }}
                      >
                        <p className="text-gray-500 text-xs">Felicitaciones! Ganaste</p>
                        <p className="font-black text-2xl mt-0.5" style={{ color: prize.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {prize.label}
                        </p>
                        <p className="text-gray-500 text-xs">{prize.sub}</p>
                      </div>

                      {/* Copy code */}
                      <button
                        onClick={copy}
                        className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border-2 border-dashed transition-all"
                        style={{ borderColor: `${prize.bg}60`, background: `${prize.bg}08` }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Código:</span>
                          <span className="font-black tracking-widest text-sm" style={{ color: prize.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {prize.code}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: prize.bg }}>
                          {copied ? <><Check size={13} /> Copiado</> : <><Copy size={13} /> Copiar</>}
                        </div>
                      </button>

                      <button
                        onClick={close}
                        className="w-full py-3.5 text-white font-black text-sm transition-all active:scale-95"
                        style={{
                          background: 'linear-gradient(135deg,#270566,#6d17e0)',
                          borderRadius: '2rem 0.5rem 2rem 0.5rem',
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        Ir a comprar con mi descuento →
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
