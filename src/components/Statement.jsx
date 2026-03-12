import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const WORDS = 'Somos el secreto de los baños más frescos de Colombia.'.split(' ')

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const pillars = [
  { value: '98%',    label: 'de eficacia',          note: 'probado' },
  { value: '+5.000', label: 'clientes satisfechos',  note: 'y contando' },
  { value: '14 ml',  label: 'equivalen a 3 aerosoles', note: 'comprobado' },
]

export default function Statement() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-[#faf7ff] py-28 md:py-40">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">

        {/* Animated headline */}
        <div ref={ref} className="mb-12 md:mb-16">
          <p className="text-[#8b7ea0] text-xs uppercase tracking-[0.3em] mb-6">Por qué petit poo</p>
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="font-display text-[#0a0520]"
            style={{ fontSize: 'clamp(2.4rem,6vw,6rem)', lineHeight: 1.05, fontStyle: 'italic', fontWeight: 600 }}
          >
            {WORDS.map((w, i) => (
              <motion.span key={i} variants={item} className="inline-block mr-[0.22em]">
                {w}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Stats — esquinas asimétricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pillars.map((p, i) => {
            // Each stat gets a different corner combo
            const radii = [
              '2rem 0.4rem 2rem 0.4rem',   // tl + br
              '0.4rem 2rem 0.4rem 2rem',   // tr + bl
              '2rem 0.4rem 2rem 0.4rem',   // tl + br again
            ]
            const bgs = ['#fde8f0', '#ede6ff', '#fff0e6']
            return (
              <motion.div
                key={p.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 md:p-10"
                style={{ backgroundColor: bgs[i], borderRadius: radii[i] }}
              >
                <p
                  className="font-display font-semibold text-[#0a0520] leading-none mb-2"
                  style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)' }}
                >
                  {p.value}
                </p>
                <p className="text-sm text-[#0a0520] font-medium">{p.label}</p>
                <p className="text-xs text-[#8b7ea0] mt-1 uppercase tracking-widest">{p.note}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
