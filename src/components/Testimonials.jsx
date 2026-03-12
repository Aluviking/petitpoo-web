import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const quotes = [
  {
    text:    'Al principio no creía que funcionara, pero quedé completamente impresionado. Lo recomiendo a todos mis conocidos sin excepción.',
    author:  'Carlos A.',
    city:    'Medellín',
    product: 'Oasis',
  },
  {
    text:    'Viajo mucho por trabajo. En hoteles, aeropuertos, oficinas... petit poo cambió completamente mi relación con los baños públicos.',
    author:  'Daniela R.',
    city:    'Cali',
    product: 'Strawberry',
  },
  {
    text:    'Seis meses usándolo y ya no puedo vivir sin él. Lo tengo en casa, en la oficina y siempre en mi cartera.',
    author:  'Valentina M.',
    city:    'Bogotá',
    product: 'Very Berry',
  },
  {
    text:    'Mi esposa lo descubrió en redes. Lo pedimos como prueba y ahora compramos el Happy Kit cada mes. No volvemos a aerosoles.',
    author:  'Andrés P.',
    city:    'Barranquilla',
    product: 'Happy Kit',
  },
  {
    text:    'Vivo con tres roommates y compartir el baño ya no es incómodo. Sin olores, sin vergüenzas, todos muy contentos.',
    author:  'Laura S.',
    city:    'Santiago, Chile',
    product: 'Happy',
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [dir,   setDir]   = useState(1)

  const go = (d) => {
    setDir(d)
    setIndex(i => (i + d + quotes.length) % quotes.length)
  }

  const q = quotes[index]

  const variants = {
    enter:  (d) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit:   (d) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  }

  return (
    <section className="bg-[#faf7ff] py-10 md:py-14">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">

        <p className="text-[#8b7ea0] text-xs uppercase tracking-[0.3em] mb-8 md:mb-10">
          Lo que dicen
        </p>

        <div className="relative min-h-[240px] flex items-center">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={index}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <p
                className="font-display text-[#f7a8c4] leading-none select-none mb-4"
                style={{ fontSize: 'clamp(4rem,12vw,10rem)', lineHeight: 0.7 }}
              >
                &ldquo;
              </p>

              <blockquote
                className="font-display font-semibold italic text-[#0a0520] leading-tight mb-8"
                style={{ fontSize: 'clamp(1.6rem,4vw,4rem)' }}
              >
                {q.text}
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-[#0a0520]/20" />
                <p className="text-sm text-[#0a0520] font-medium">{q.author}</p>
                <span className="text-[#8b7ea0] text-xs">{q.city}</span>
                <span
                  className="ml-auto text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5"
                  style={{ backgroundColor: '#fde8f0', color: '#5c1535', borderRadius: '1rem 0.3rem 1rem 0.3rem' }}
                >
                  {q.product}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => go(-1)}
            className="w-10 h-10 flex items-center justify-center border border-[#0a0520]/20 hover:bg-[#0a0520] hover:text-[#faf7ff] transition-colors"
            style={{ borderRadius: '1rem 0.3rem 1rem 0.3rem' }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => go(1)}
            className="w-10 h-10 flex items-center justify-center border border-[#0a0520]/20 hover:bg-[#0a0520] hover:text-[#faf7ff] transition-colors"
            style={{ borderRadius: '0.3rem 1rem 0.3rem 1rem' }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="flex gap-2 ml-2">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > index ? 1 : -1); setIndex(i) }}
                className={`h-1 transition-all duration-300 ${i === index ? 'w-8 bg-[#7C3AED]' : 'w-2 bg-[#0a0520]/15'}`}
                style={{ borderRadius: 999 }}
              />
            ))}
          </div>

          <p className="ml-auto text-xs text-[#8b7ea0] uppercase tracking-widest hidden sm:block">
            4.6 / 5 &nbsp;·&nbsp; +1.000 reseñas verificadas
          </p>
        </div>
      </div>
    </section>
  )
}
