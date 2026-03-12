import { motion } from 'framer-motion'

const steps = [
  {
    n:     '01',
    title: 'Abre la botella',
    body:  '14 ml que caben en cualquier bolsillo, cartera o neceser de viaje. Sin tapas difíciles, sin aerosoles.',
  },
  {
    n:     '02',
    title: 'Aplica 3 a 5 gotas',
    body:  'Directo al agua del inodoro, antes de sentarte. No después. Eso marca toda la diferencia.',
  },
  {
    n:     '03',
    title: 'La barrera se forma',
    body:  'Los aceites esenciales flotan y crean una película invisible que atrapa los gases bajo la superficie.',
  },
  {
    n:     '04',
    title: 'Baño completamente fresco',
    body:  'Hasta el 98 % de los olores permanecen sellados. Nadie sabe nada. Tú tampoco.',
  },
]

export default function Process() {
  return (
    <section id="proceso" className="bg-white py-14 md:py-20">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-[#6d17e0] text-xs uppercase tracking-[0.3em] mb-4">El proceso</p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-semibold italic text-[#270566] leading-none"
              style={{ fontSize: 'clamp(2.8rem,7vw,7rem)' }}
            >
              Cuatro pasos.
            </motion.h2>
          </div>
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed md:text-right">
            Menos de diez segundos.<br />Cero vergüenzas.
          </p>
        </div>

        {/* Steps — 2 × 2 grid */}
        <div className="grid sm:grid-cols-2 gap-px bg-[#270566]/8 max-w-3xl">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-8 md:p-10 flex flex-col gap-6"
            >
              <span
                className="font-display font-semibold text-[#6d17e0] leading-none select-none"
                style={{ fontSize: '3.5rem', lineHeight: 1 }}
              >
                {s.n}
              </span>
              <div>
                <h3
                  className="font-display font-semibold italic text-[#270566] mb-3 leading-tight"
                  style={{ fontSize: 'clamp(1.3rem,2.5vw,1.75rem)' }}
                >
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-16 max-w-3xl bg-[#f5f0ff] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ borderRadius: '2.5rem 0.6rem 2.5rem 0.6rem' }}
        >
          <div>
            <p className="text-[#6d17e0] text-xs uppercase tracking-widest mb-2">La ciencia detrás</p>
            <p
              className="font-display font-semibold italic text-[#270566] leading-snug max-w-lg"
              style={{ fontSize: 'clamp(1.3rem,3vw,2.2rem)' }}
            >
              Los aceites esenciales son menos densos que el agua. Flotan. Atrapan. Protegen.
            </p>
          </div>
          <a
            href="#productos"
            className="shrink-0 bg-[#270566] text-white text-xs font-semibold uppercase tracking-widest px-7 py-3.5 hover:bg-[#6d17e0] transition-colors"
            style={{ borderRadius: '2rem 0.5rem 2rem 0.5rem' }}
          >
            Ver aromas
          </a>
        </motion.div>

      </div>
    </section>
  )
}
