import { motion } from 'framer-motion'
import { Leaf, Heart, Droplets, Plane, Users, Trophy, Gem, Tv } from 'lucide-react'

const benefits = [
  {
    Icon: Leaf,
    title: '100% Natural',
    description: 'Formulado exclusivamente con aceites esenciales. Sin parabenos, sin ftalatos, sin aerosoles, sin formaldehído.',
    color: 'bg-emerald-50',
    accent: 'text-emerald-600',
  },
  {
    Icon: Heart,
    title: 'Vegano y cruelty-free',
    description: 'No testado en animales. Respetuoso con el planeta y con todos sus habitantes.',
    color: 'bg-violet-50',
    accent: 'text-violet-600',
  },
  {
    Icon: Droplets,
    title: '3 aerosoles en 1',
    description: 'Una botella de 14 ml equivale a tres aerosoles grandes. Más eficiente y mucho más económico.',
    color: 'bg-cyan-50',
    accent: 'text-cyan-600',
  },
  {
    Icon: Plane,
    title: 'Ideal para viajes',
    description: 'Tamaño de viaje aprobado por aerolíneas. Llévalo en tu bolsillo, cartera o mochila sin problema.',
    color: 'bg-amber-50',
    accent: 'text-amber-600',
  },
  {
    Icon: Users,
    title: 'Toda la familia',
    description: 'Perfecto para el hogar, la oficina, baños públicos o cualquier lugar donde necesites discreción.',
    color: 'bg-rose-50',
    accent: 'text-rose-600',
  },
  {
    Icon: Trophy,
    title: '#1 en Colombia',
    description: 'El bloqueador de olores más reconocido en Colombia. Presentado en "As Seen on TV" internacionalmente.',
    color: 'bg-indigo-50',
    accent: 'text-indigo-600',
  },
]

const stats = [
  { value: '98%', label: 'Olores bloqueados' },
  { value: '+5K', label: 'Clientes felices' },
  { value: '6', label: 'Aromas únicos' },
  { value: '5★', label: 'Calificación promedio' },
]

export default function Benefits() {
  return (
    <section id="beneficios" className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            <Gem size={14} />
            Por qué elegirnos
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-gray-900 mb-4"
          >
            Lo que nos hace{' '}
            <span className="text-gradient">diferentes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 max-w-xl mx-auto"
          >
            Más que un producto de baño, petit poo es tu aliado de confianza para vivir sin vergüenzas.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`${benefit.color} rounded-2xl p-5 hover:scale-105 transition-transform duration-300`}
            >
              <benefit.Icon size={28} className={`mb-3 ${benefit.accent}`} strokeWidth={1.8} />
              <h3 className={`text-lg font-bold mb-2 ${benefit.accent}`}>{benefit.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-6 md:p-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-gradient mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left"
        >
          <div className="bg-amber-100 rounded-2xl px-6 py-3 flex items-center gap-3">
            <Tv size={28} className="text-amber-600 shrink-0" strokeWidth={1.5} />
            <div>
              <p className="text-xs text-amber-700 font-semibold uppercase tracking-wide">Reconocimiento internacional</p>
              <p className="text-sm font-bold text-amber-800">Presentado en "As Seen on TV" por Kevin Harrington</p>
              <p className="text-xs text-amber-600">El primer producto colombiano en ese canal</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
