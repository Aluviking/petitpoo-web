import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Copy, Check, Sparkles } from 'lucide-react'

const CODE = 'PETIT10'

export default function WelcomePopup() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('pp_welcome_seen')) return
    const t = setTimeout(() => setOpen(true), 3500)
    return () => clearTimeout(t)
  }, [])

  const close = () => {
    setOpen(false)
    sessionStorage.setItem('pp_welcome_seen', '1')
  }

  const submit = (e) => {
    e.preventDefault()
    setDone(true)
  }

  const copy = () => {
    navigator.clipboard.writeText(CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="fixed bottom-[5.5rem] sm:bottom-20 right-4 z-[120] w-[300px] sm:w-[320px] rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(124,58,237,0.18)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.12), 0 0 24px rgba(124,58,237,0.06)',
          }}
        >
          {/* Top accent */}
          <div className="h-1" style={{ background: 'linear-gradient(90deg,#7C3AED,#9333EA,#7C3AED)' }} />

          <button
            onClick={close}
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Cerrar"
          >
            <X size={13} />
          </button>

          <div className="p-5">
            {!done ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(124,58,237,0.18)' }}>
                    <Gift size={18} className="text-pp-blue" />
                  </div>
                  <div>
                    <p className="text-[#0a0520] text-sm font-bold leading-tight">Bienvenido a petit poo</p>
                    <p className="text-gray-500 text-xs mt-0.5">10% OFF en tu primera compra</p>
                  </div>
                </div>

                <div
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl border mb-4"
                  style={{ background: 'rgba(124,58,237,0.06)', borderColor: 'rgba(124,58,237,0.25)' }}
                >
                  <span className="text-pp-blue font-bold tracking-widest text-sm">{CODE}</span>
                  <button onClick={copy} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-pp-blue transition-colors">
                    {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                    {copied ? 'Copiado' : 'Copiar'}
                  </button>
                </div>

                <form onSubmit={submit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="flex-1 px-3 py-2 rounded-xl bg-[#f8f6ff] border border-gray-200 text-[#0a0520] text-xs placeholder-gray-400 focus:outline-none focus:border-pp-blue transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-pp-blue hover:bg-pp-blue/80 text-white text-xs font-semibold transition-all active:scale-95 shrink-0"
                    style={{ borderRadius: '1.5rem 0.4rem 1.5rem 0.4rem' }}
                  >
                    Activar
                  </button>
                </form>
                <p className="text-gray-400 text-[10px] text-center mt-2">Sin spam. Cancela cuando quieras.</p>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3 py-1">
                <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-400/40 flex items-center justify-center mx-auto">
                  <Sparkles size={18} className="text-green-400" />
                </div>
                <div>
                  <p className="text-[#0a0520] font-bold text-sm">Código activado</p>
                  <p className="text-gray-500 text-xs mt-0.5">Usa <span className="text-pp-blue font-bold">{CODE}</span> al pagar</p>
                </div>
                <button onClick={close} className="w-full py-2 bg-pp-blue hover:bg-pp-blue/80 text-white text-xs font-semibold transition-all active:scale-95" style={{ borderRadius: '2rem 0.5rem 2rem 0.5rem' }}>
                  Ir a comprar
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
