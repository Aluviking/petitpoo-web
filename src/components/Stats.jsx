import { motion } from 'framer-motion'

const stats = [
  { value: '98',   unit: '%',   label: 'de eficacia',          sub: 'probado y garantizado' },
  { value: '5K',   unit: '+',   label: 'clientes felices',      sub: 'en 5 países' },
  { value: '6',    unit: '',    label: 'aromas únicos',         sub: 'uno para cada momento' },
  { value: '14',   unit: 'ml',  label: 'de pureza natural',     sub: 'sin aerosoles' },
]

const awards = [
  { label: 'As Seen on TV',  note: 'Kevin Harrington' },
  { label: '#1 Colombia',    note: 'bloqueador de olores' },
  { label: 'Vegano',         note: 'cruelty-free' },
  { label: 'Exportación',    note: 'ProColombia B2B' },
]

export default function Stats() {
  return (
    <section className="bg-[#f5f0ff] py-10 md:py-14 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-semibold italic text-[#270566] leading-tight mb-10 md:mb-12 max-w-2xl"
          style={{ fontSize: 'clamp(2rem,5vw,5rem)' }}
        >
          Los números que respaldan cada gota.
        </motion.h2>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((s, i) => {
            const radii = [
              '2rem 0.4rem 2rem 0.4rem',
              '0.4rem 2rem 0.4rem 2rem',
              '2rem 0.4rem 2rem 0.4rem',
              '0.4rem 2rem 0.4rem 2rem',
            ]
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="bg-white px-5 py-7 md:px-7 md:py-9"
                style={{ borderRadius: radii[i] }}
              >
                <p
                  className="font-display font-semibold text-[#6d17e0] leading-none mb-3"
                  style={{ fontSize: 'clamp(3rem,8vw,6.5rem)' }}
                >
                  {s.value}
                  <span className="text-[0.4em] ml-1 align-baseline">{s.unit}</span>
                </p>
                <p className="text-[#270566] text-sm font-medium mb-1">{s.label}</p>
                <p className="text-gray-400 text-xs uppercase tracking-widest">{s.sub}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Awards badges */}
        <div className="flex flex-wrap gap-3">
          {awards.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="border border-[#270566]/15 bg-white px-5 py-2.5 flex items-center gap-3"
              style={{ borderRadius: '1.5rem 0.4rem 1.5rem 0.4rem' }}
            >
              <span className="text-[#270566] text-xs font-semibold uppercase tracking-widest">{a.label}</span>
              <span className="w-px h-3 bg-[#270566]/20" />
              <span className="text-gray-400 text-xs uppercase tracking-widest">{a.note}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
