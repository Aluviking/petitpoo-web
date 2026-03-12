import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, Phone, MapPin, Check } from 'lucide-react'

const WA = '573001234567'

const channels = [
  {
    Icon: Phone,
    label: 'WhatsApp',
    value: '+57 300 123 4567',
    href: `https://wa.me/${WA}?text=${encodeURIComponent('Hola, quiero hacer un pedido de petit poo.')}`,
    accent: '#25D366',
    bg: '#f0fdf4',
  },
  {
    Icon: Mail,
    label: 'Email',
    value: 'info@petitpoo.com',
    href: 'mailto:info@petitpoo.com',
    accent: '#6d17e0',
    bg: '#f5f0ff',
  },
  {
    Icon: MapPin,
    label: 'Cobertura',
    value: 'Colombia · Chile · Ecuador · USA',
    href: null,
    accent: '#9469b5',
    bg: '#faf5ff',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', msg: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = encodeURIComponent(`Hola, soy ${form.name}.\n\n${form.msg}\n\nEmail: ${form.email}`)
    window.open(`https://wa.me/${WA}?text=${text}`, '_blank')
    setSent(true)
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', msg: '' }) }, 4000)
  }

  return (
    <section id="contacto" className="bg-[#faf7ff] py-14 md:py-20">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[#6d17e0] text-xs uppercase tracking-[0.3em] font-bold mb-2">Contacto</p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="font-display font-semibold italic text-[#270566] leading-none"
            style={{ fontSize: 'clamp(2rem,5vw,5rem)' }}
          >
            Hablemos.
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Left — channels */}
          <div className="space-y-3">
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Estamos disponibles para ayudarte a elegir el aroma perfecto o resolver cualquier duda sobre tu pedido.
            </p>
            {channels.map(({ Icon, label, value, href, accent, bg }, i) => {
              const inner = (
                <>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: bg }}
                    >
                      <Icon size={18} style={{ color: accent }} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-0.5">{label}</p>
                      <p className="text-[#270566] font-semibold text-sm">{value}</p>
                    </div>
                  </div>
                  {href && <ArrowUpRight size={16} className="text-gray-300 group-hover:text-[#6d17e0] transition-colors" />}
                </>
              )
              return href ? (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex items-center justify-between px-5 py-4 rounded-2xl bg-white border border-[#270566]/8 hover:border-[#6d17e0]/30 hover:shadow-md transition-all"
                  style={{ boxShadow: '0 2px 12px rgba(39,5,102,0.05)' }}
                >
                  {inner}
                </motion.a>
              ) : (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center justify-between px-5 py-4 rounded-2xl bg-white border border-[#270566]/8"
                  style={{ boxShadow: '0 2px 12px rgba(39,5,102,0.05)' }}
                >
                  {inner}
                </motion.div>
              )
            })}
          </div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-7 md:p-8 space-y-5"
            style={{ boxShadow: '0 4px 32px rgba(39,5,102,0.08)', border: '1px solid rgba(39,5,102,0.07)' }}
          >
            <div>
              <h3 className="text-[#270566] font-bold text-lg mb-1">Envíanos un mensaje</h3>
              <p className="text-gray-400 text-xs">Te responderemos por WhatsApp en minutos.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#270566] text-xs font-semibold uppercase tracking-wider">Nombre</label>
                <input
                  type="text" required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Tu nombre"
                  className="bg-[#faf7ff] border border-[#270566]/10 px-4 py-3 text-[#270566] placeholder-gray-300 text-sm focus:outline-none focus:border-[#6d17e0] focus:bg-white transition-all rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#270566] text-xs font-semibold uppercase tracking-wider">Correo</label>
                <input
                  type="email" required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="tu@correo.com"
                  className="bg-[#faf7ff] border border-[#270566]/10 px-4 py-3 text-[#270566] placeholder-gray-300 text-sm focus:outline-none focus:border-[#6d17e0] focus:bg-white transition-all rounded-xl"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#270566] text-xs font-semibold uppercase tracking-wider">Mensaje</label>
              <textarea
                rows={4} required
                value={form.msg}
                onChange={e => setForm({ ...form, msg: e.target.value })}
                placeholder="¿En qué podemos ayudarte? Cuéntanos sobre tu pedido, aroma preferido o cualquier duda..."
                className="w-full bg-[#faf7ff] border border-[#270566]/10 px-4 py-3 text-[#270566] placeholder-gray-300 text-sm focus:outline-none focus:border-[#6d17e0] focus:bg-white transition-all resize-none rounded-xl"
              />
            </div>

            <button
              type="submit"
              disabled={sent}
              className="w-full flex items-center justify-center gap-2 py-4 text-white text-sm font-black uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-70"
              style={{
                borderRadius: '2rem 0.5rem 2rem 0.5rem',
                background: sent ? 'linear-gradient(135deg,#2ecc71,#27ae60)' : '#270566',
                boxShadow: sent ? 'none' : '0 8px 28px rgba(39,5,102,0.28)',
              }}
            >
              {sent
                ? <><Check size={16} /> Enviado a WhatsApp</>
                : 'Enviar mensaje'
              }
            </button>
          </motion.form>

        </div>
      </div>
    </section>
  )
}
