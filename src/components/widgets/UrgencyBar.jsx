import { useState, useEffect } from 'react'
import { Timer, Flame, Truck, Leaf, Tag, Gift } from 'lucide-react'

const MESSAGES = [
  { Icon: Flame,  text: 'OFERTA HOY — 10% OFF primera compra · Código PETIT10' },
  { Icon: Truck,  text: 'ENVÍO GRATIS en compras mayores a $80.000 COP' },
  { Icon: Leaf,   text: '100% Natural · Vegano · Cruelty-free · Sin parabenos' },
  { Icon: Tag,    text: 'Nuevos aromas disponibles — Descúbrelos ahora' },
  { Icon: Gift,   text: 'Kits especiales para regalo — perfectos para sorprender' },
  { Icon: Flame,  text: 'Quedan pocas unidades del Happy Kit — Ultimas unidades' },
]

const ticker = [...MESSAGES, ...MESSAGES, ...MESSAGES]

export default function UrgencyBar() {
  const [timeLeft, setTimeLeft] = useState(15 * 60)

  useEffect(() => {
    const iv = setInterval(() => setTimeLeft(t => (t > 0 ? t - 1 : 0)), 1000)
    return () => clearInterval(iv)
  }, [])

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, #270566 0%, #6d17e0 45%, #9469b5 80%, #270566 100%)',
        height: '44px',
      }}
    >
      {/* Shimmer overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
          backgroundSize: '300% 100%',
          animation: 'shimmer 4s infinite linear',
        }}
      />

      <div className="relative flex items-center h-full">
        {/* Marquee */}
        <div className="flex-1 overflow-hidden flex items-center h-full">
          <div className="flex animate-marquee-urgency shrink-0 items-center gap-0">
            {ticker.map((m, i) => (
              <span
                key={i}
                className="whitespace-nowrap px-10 font-bold text-white"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.875rem', letterSpacing: '0.01em' }}
              >
                {m.text}
                <span className="mx-6 text-white/40">|</span>
              </span>
            ))}
          </div>
        </div>

        {/* Timer — right side */}
        {timeLeft > 0 && (
          <div
            className="shrink-0 flex items-center gap-1.5 px-3 py-1 mr-2 rounded-full text-white font-bold text-xs"
            style={{ background: 'rgba(255,255,255,0.18)', fontFamily: "'Plus Jakarta Sans', monospace", border: '1px solid rgba(255,255,255,0.25)' }}
          >
            <Timer size={11} />
            {fmt(timeLeft)}
          </div>
        )}
      </div>
    </div>
  )
}
