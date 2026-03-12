import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Droplets, Pipette, Shield, Sparkles, FlaskConical, Zap } from 'lucide-react'

const steps = [
  {
    number: '01',
    Icon: Droplets,
    title: 'Abre la botella',
    description: 'Destapa tu petit poo. La botella cabe en cualquier bolsillo o cartera.',
    color: 'from-emerald-400 to-teal-400',
  },
  {
    number: '02',
    Icon: Pipette,
    title: 'Aplica 3–5 gotas',
    description: 'Agrega las gotas directamente al agua del inodoro ANTES de usarlo.',
    color: 'from-cyan-400 to-blue-400',
  },
  {
    number: '03',
    Icon: Shield,
    title: 'Se forma una barrera',
    description: 'Los aceites esenciales crean una capa protectora sobre el agua que atrapa los olores.',
    color: 'from-violet-400 to-purple-400',
  },
  {
    number: '04',
    Icon: Sparkles,
    title: 'Bano fresco',
    description: 'Usa el baño con total confianza. Los olores quedan bloqueados bajo la superficie.',
    color: 'from-amber-400 to-orange-400',
  },
]

function StepCard({ step, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col items-center text-center"
    >
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-12 left-[calc(50%+3.5rem)] w-[calc(100%-7rem)] h-0.5 bg-gradient-to-r from-gray-200 to-gray-100 z-0" />
      )}
      <div className={`relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex flex-col items-center justify-center shadow-lg mb-4`}>
        <step.Icon size={28} className="text-white" strokeWidth={1.8} />
        <span className="text-white/70 text-xs font-bold mt-1">{step.number}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">{step.description}</p>
    </motion.div>
  )
}

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="como-funciona" className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            <FlaskConical size={14} />
            La ciencia detrás de petit poo
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-gray-900 mb-4"
          >
            Así de simple{' '}
            <span className="text-gradient">funciona</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-500 max-w-xl mx-auto"
          >
            Sin aerosoles, sin químicos agresivos, sin vergüenzas. Solo aceites esenciales naturales haciendo su trabajo.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-10 md:mt-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 md:p-8 text-white text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <Zap size={28} className="text-white" strokeWidth={1.8} />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-black mb-4">La barrera de aceites esenciales</h3>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Los aceites esenciales son menos densos que el agua, por lo que flotan creando una película protectora. Cuando ocurre el movimiento intestinal, los gases quedan atrapados{' '}
            <strong className="text-white">bajo esa capa</strong>, en lugar de escapar al aire. El resultado: hasta{' '}
            <strong className="text-white">98% menos olor</strong>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
