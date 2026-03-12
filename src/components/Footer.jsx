import { motion } from 'framer-motion'

const allLinks = [
  { label: 'Inicio',        href: '#inicio' },
  { label: 'Cómo funciona', href: '#proceso' },
  { label: 'Productos',     href: '#productos' },
  { label: 'Contacto',      href: '#contacto' },
  { label: 'Amazon',        href: 'https://www.amazon.com/s?k=petit+poo',                    external: true },
  { label: 'Walmart',       href: 'https://www.walmart.com/search?q=petit+poo',              external: true },
  { label: 'Instagram',     href: 'https://www.instagram.com/petit_poo/',                    external: true },
  { label: 'Facebook',      href: '#',                                                        external: true },
]

export default function Footer() {
  return (
    <footer className="bg-[#faf7ff]">

      {/* ── CTA + logo row ── */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 pt-10 pb-7 border-b border-[#0a0520]/10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

          {/* Logo + tagline */}
          <div>
            <a href="#inicio" className="inline-block mb-4 hover:opacity-80 transition-opacity">
              <img
                src="/logo.jpeg"
                alt="petit poo"
                className="h-16 w-auto"
                style={{ borderRadius: '10px' }}
              />
            </a>
            <p className="text-[#0a0520]/50 text-base leading-snug">
              El bloqueador de olores natural de Colombia.<br />
              Vegano · Cruelty-free · Aceites esenciales.
            </p>
          </div>

          {/* CTA phrase + button */}
          <div className="flex flex-col items-start md:items-end gap-5">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display italic font-semibold text-[#0a0520] leading-tight text-right"
              style={{ fontSize: 'clamp(1.4rem,3vw,2.4rem)' }}
            >
              Cero olores. Cero vergüenzas.<br />
              <span className="text-[#7C3AED]">Solo frescura.</span>
            </motion.p>
            <a
              href="#productos"
              className="inline-flex items-center bg-[#7C3AED] text-[#0a0520] text-xs font-bold uppercase tracking-widest px-8 py-3.5 hover:bg-[#9333EA] transition-colors"
              style={{ borderRadius: '2rem 0.5rem 2rem 0.5rem' }}
            >
              Ver aromas
            </a>
          </div>

        </div>
      </div>

      {/* ── Links en una sola fila ── */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-8 border-b border-[#0a0520]/10">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {allLinks.map(l => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              className="text-[#0a0520]/50 hover:text-[#0a0520] text-sm font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Copyright ── */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[#0a0520]/35 text-xs text-center sm:text-left">
          &copy; {new Date().getFullYear()} Ryo Col SAS &mdash; petit poo. Todos los derechos reservados.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-[#0a0520]/35 hover:text-[#0a0520]/70 text-xs transition-colors">Privacidad</a>
          <a href="#" className="text-[#0a0520]/35 hover:text-[#0a0520]/70 text-xs transition-colors">Términos</a>
        </div>
      </div>

    </footer>
  )
}
