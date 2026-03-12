import { motion } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'

// Replace this URL with your own product/lifestyle image if desired
const HERO_IMG = 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&w=1920&q=80'

const LOCATIONS = [
  'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena',
  'Bucaramanga', 'Pereira', 'Manizales', 'Santiago CL', 'Lima PE',
  'Quito EC', 'Guatemala', 'Miami FL', 'Nueva York NY',
]
const ticker = [...LOCATIONS, ...LOCATIONS, ...LOCATIONS, ...LOCATIONS]

const sentence = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06 } },
}
const word = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

function AnimatedTitle({ text }) {
  return (
    <motion.h1
      variants={sentence}
      initial="hidden"
      animate="visible"
      className="font-display leading-[0.92] font-semibold italic text-white mb-5"
      style={{
        fontSize: 'clamp(2.8rem,8vw,7.5rem)',
        textShadow: '0 4px 24px rgba(0,0,0,0.55)',
      }}
    >
      {text.split(' ').map((w, i) => (
        <motion.span key={i} variants={word} className="inline-block mr-[0.22em]">
          {w}
        </motion.span>
      ))}
    </motion.h1>
  )
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: '82vh', paddingTop: '108px' }}
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMG}
          alt="petit poo — frescura natural en tu baño"
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        {/* Dark overlay for text contrast */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(39,5,102,0.80) 0%, rgba(39,5,102,0.55) 55%, rgba(109,23,224,0.30) 100%)',
          }}
        />
        {/* Bottom gradient for smooth transition */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: 'linear-gradient(0deg, #f3edf8 0%, transparent 100%)' }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 max-w-screen-xl mx-auto w-full px-6 lg:px-16 flex flex-col justify-center py-10">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-white/85 text-xs sm:text-sm uppercase tracking-[0.3em] font-extrabold mb-4"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Bloqueador de olores · 100% Natural
        </motion.p>

        <AnimatedTitle text="Di adiós a los olores." />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.75 }}
          className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-md font-semibold"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          El bloqueador de olores que actúa antes de que sucedan.
          Solo 3–5 gotas. Hasta&nbsp;98&nbsp;% de eficacia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.92 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#productos"
            className="inline-flex items-center justify-center gap-3 bg-[#6d17e0] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#9469b5] transition-all active:scale-95 group"
            style={{ borderRadius: '2rem 0.5rem 2rem 0.5rem', fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: '0 8px 32px rgba(109,23,224,0.5)' }}
          >
            Explorar aromas
            <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#proceso"
            className="inline-flex items-center justify-center gap-3 border-2 border-white/70 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white/15 transition-all backdrop-blur-sm"
            style={{ borderRadius: '0.5rem 2rem 0.5rem 2rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Cómo funciona
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex flex-wrap gap-x-6 gap-y-2 mt-8"
        >
          {['Vegano', 'Sin parabenos', 'Cruelty-free', '+2.000 clientes felices'].map(t => (
            <span
              key={t}
              className="flex items-center gap-1.5 text-white/80 text-xs font-bold"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#6d17e0] shrink-0" style={{ boxShadow: '0 0 6px #6d17e0' }} />
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Locations marquee band */}
      <div className="relative z-10 border-t border-white/15 overflow-hidden" style={{ background: 'rgba(39,5,102,0.88)', backdropFilter: 'blur(8px)' }}>
        <div className="flex py-3">
          <div className="animate-marquee flex shrink-0">
            {ticker.map((s, i) => (
              <span key={i} className="text-white/65 text-xs uppercase tracking-[0.22em] font-bold whitespace-nowrap px-7" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {s}<span className="ml-7 text-[#9469b5]">·</span>
              </span>
            ))}
          </div>
          <div aria-hidden className="animate-marquee flex shrink-0">
            {ticker.map((s, i) => (
              <span key={i} className="text-white/65 text-xs uppercase tracking-[0.22em] font-bold whitespace-nowrap px-7" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {s}<span className="ml-7 text-[#9469b5]">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
