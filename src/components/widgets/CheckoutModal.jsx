import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, Check, MapPin, CreditCard, Package, Lock, Droplets } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const STEPS = ['Envío', 'Pago', 'Confirmación']

const CITIES = [
  'Bogotá','Medellín','Cali','Barranquilla','Cartagena',
  'Bucaramanga','Pereira','Manizales','Santa Marta','Ibagué',
  'Cúcuta','Villavicencio','Pasto','Armenia','Neiva',
]

function StepDot({ step, current, done }) {
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
      done ? 'bg-green-500 text-white' : step === current ? 'bg-pp-blue text-white' : 'bg-purple-100 text-gray-400'
    }`}>
      {done ? <Check size={14} /> : step + 1}
    </div>
  )
}

const inputCls = "w-full px-3 py-2.5 rounded-xl bg-white border border-purple-200 text-[#0a0520] text-sm placeholder-gray-400 focus:outline-none focus:border-pp-blue focus:ring-2 focus:ring-pp-blue/15 transition-all"

export default function CheckoutModal() {
  const { items, isCheckoutOpen, setIsCheckoutOpen, total, formatCOP, clearCart } = useCart()
  const [step, setStep] = useState(0)
  const [orderNum] = useState(() => Math.floor(Math.random() * 90000) + 10000)
  const [shipping, setShipping] = useState({ name:'', email:'', phone:'', address:'', city:'', notes:'' })
  const [payment, setPayment] = useState({ method:'card', card:'', expiry:'', cvv:'', name:'' })

  const close = () => { setIsCheckoutOpen(false); setTimeout(() => setStep(0), 400) }

  if (!isCheckoutOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: 'rgba(10,5,32,0.6)', backdropFilter: 'blur(8px)' }}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 16 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto sidebar-scroll rounded-2xl shadow-2xl"
          style={{ background: '#ffffff', border: '1px solid rgba(124,58,237,0.15)' }}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Cerrar"
          >
            <X size={16} />
          </button>

          <div className="p-5 sm:p-6">
            <div className="text-center mb-5">
              <span className="text-xl font-display italic text-pp-blue">petit poo</span>
              <p className="text-gray-400 text-xs mt-0.5 flex items-center justify-center gap-1">
                <Lock size={10} /> Checkout seguro
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6">
              {STEPS.map((label, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <StepDot step={i} current={step} done={i < step} />
                    <span className={`text-[10px] font-semibold ${i === step ? 'text-pp-blue' : i < step ? 'text-green-500' : 'text-gray-400'}`}>
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`w-8 h-px mb-4 ${i < step ? 'bg-green-400' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>

            {step === 0 && (
              <form onSubmit={e => { e.preventDefault(); setStep(1) }} className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={15} className="text-pp-blue" />
                  <h3 className="text-[#0a0520] font-black text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>Datos de envío</h3>
                </div>
                {[
                  { label:'Nombre completo', key:'name', type:'text', placeholder:'Tu nombre', span:2 },
                  { label:'Email', key:'email', type:'email', placeholder:'tu@email.com', span:1 },
                  { label:'Teléfono', key:'phone', type:'tel', placeholder:'+57 300 000 0000', span:1 },
                  { label:'Dirección', key:'address', type:'text', placeholder:'Calle, carrera, número...', span:2 },
                ].map(f => (
                  <div key={f.key} className={f.span === 2 ? '' : 'inline-block w-[calc(50%-6px)] first:mr-3'}>
                    <label className="text-gray-600 text-[11px] mb-1 block font-semibold">{f.label} *</label>
                    <input required type={f.type} value={shipping[f.key]}
                      onChange={e => setShipping(s => ({ ...s, [f.key]: e.target.value }))}
                      placeholder={f.placeholder} className={inputCls} />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-600 text-[11px] mb-1 block font-semibold">Ciudad *</label>
                    <select required value={shipping.city}
                      onChange={e => setShipping(s => ({ ...s, city: e.target.value }))} className={inputCls}>
                      <option value="">Seleccionar...</option>
                      {CITIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-600 text-[11px] mb-1 block font-semibold">Notas (opcional)</label>
                    <input value={shipping.notes}
                      onChange={e => setShipping(s => ({ ...s, notes: e.target.value }))}
                      placeholder="Instrucciones..." className={inputCls} />
                  </div>
                </div>
                <div className="rounded-xl p-3 border border-purple-100" style={{ background: '#faf5ff' }}>
                  <p className="text-gray-500 text-xs mb-2 font-semibold">Resumen</p>
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-xs py-1">
                      <span className="text-[#0a0520] flex items-center gap-1.5">
                        <Droplets size={10} className="text-pp-blue" />
                        {item.name} × {item.qty}
                      </span>
                      <span className="text-pp-blue font-semibold">{formatCOP(item.price * item.qty)}</span>
                    </div>
                  ))}
                  <div className="border-t border-purple-100 mt-2 pt-2 flex justify-between">
                    <span className="text-[#0a0520] text-sm font-black" style={{ fontFamily: 'Outfit, sans-serif' }}>Total</span>
                    <span className="text-pp-blue font-bold">{formatCOP(total)}</span>
                  </div>
                </div>
                <button type="submit" className="w-full py-3.5 bg-pp-blue hover:bg-pp-blue/80 text-white font-black flex items-center justify-center gap-2 transition-all active:scale-95 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderRadius: '2rem 0.5rem 2rem 0.5rem' }}>
                  Continuar al pago <ChevronRight size={15} />
                </button>
              </form>
            )}

            {step === 1 && (
              <form onSubmit={e => { e.preventDefault(); setStep(2); clearCart() }} className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard size={15} className="text-pp-blue" />
                  <h3 className="text-[#0a0520] font-black text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>Método de pago</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[{ id:'card', label:'Tarjeta' }, { id:'pse', label:'PSE' }, { id:'cash', label:'Efectivo' }].map(m => (
                    <button type="button" key={m.id}
                      onClick={() => setPayment(p => ({ ...p, method: m.id }))}
                      className={`py-2.5 text-xs font-bold transition-all border ${
                        payment.method === m.id ? 'bg-pp-blue/10 border-pp-blue text-pp-blue' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-purple-300'
                      }`}
                      style={{ borderRadius: '1.5rem 0.4rem 1.5rem 0.4rem' }}>
                      {m.label}
                    </button>
                  ))}
                </div>
                {payment.method === 'card' && (
                  <div className="space-y-3">
                    {[
                      { label:'Nombre en la tarjeta', key:'name', type:'text', placeholder:'Como aparece en la tarjeta' },
                      { label:'Número de tarjeta', key:'card', type:'text', placeholder:'1234 5678 9012 3456' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="text-gray-600 text-[11px] mb-1 block font-semibold">{f.label}</label>
                        <input required value={payment[f.key]}
                          onChange={e => setPayment(p => ({ ...p, [f.key]: e.target.value }))}
                          placeholder={f.placeholder} className={inputCls} />
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-gray-600 text-[11px] mb-1 block font-semibold">Vencimiento</label>
                        <input required value={payment.expiry} onChange={e => setPayment(p => ({ ...p, expiry: e.target.value }))} placeholder="MM/AA" className={inputCls} />
                      </div>
                      <div>
                        <label className="text-gray-600 text-[11px] mb-1 block font-semibold">CVV</label>
                        <input required value={payment.cvv} onChange={e => setPayment(p => ({ ...p, cvv: e.target.value.replace(/\D/g,'').slice(0,3) }))} placeholder="123" className={inputCls} />
                      </div>
                    </div>
                  </div>
                )}
                {(payment.method === 'pse' || payment.method === 'cash') && (
                  <div className="rounded-xl p-4 text-center border border-purple-100" style={{ background: '#faf5ff' }}>
                    <p className="text-gray-600 text-sm">
                      {payment.method === 'pse' ? 'Serás redirigido al portal bancario.' : 'Te enviaremos instrucciones por WhatsApp.'}
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-center gap-1.5 text-gray-400 text-xs">
                  <Lock size={10} /> Pago encriptado SSL
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(0)}
                    className="flex-1 py-3 border border-gray-200 text-gray-500 hover:text-gray-800 text-sm transition-colors"
                    style={{ borderRadius: '0.5rem 2rem 0.5rem 2rem' }}>
                    Atrás
                  </button>
                  <button type="submit"
                    className="flex-1 py-3 bg-pp-blue hover:bg-pp-blue/80 text-white font-black flex items-center justify-center gap-2 text-sm transition-all active:scale-95" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderRadius: '2rem 0.5rem 2rem 0.5rem' }}>
                    Confirmar <Check size={14} />
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-4 py-4">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-green-100 border-2 border-green-400 flex items-center justify-center mx-auto">
                  <Check size={36} className="text-green-500" />
                </motion.div>
                <div>
                  <h3 className="text-[#0a0520] text-xl font-black" style={{ fontFamily: 'Outfit, sans-serif' }}>Pedido confirmado</h3>
                  <p className="text-gray-400 text-sm mt-1">Pedido #{orderNum}</p>
                </div>
                <div className="rounded-xl p-4 text-left border border-purple-100" style={{ background: '#faf5ff' }}>
                  <div className="flex items-center gap-2 text-pp-blue text-sm font-semibold mb-2">
                    <Package size={13} /> Próximos pasos
                  </div>
                  <ul className="space-y-1.5 text-gray-600 text-xs">
                    <li className="flex gap-2"><Check size={10} className="text-green-500 mt-0.5 shrink-0" /> Recibirás confirmación en tu email</li>
                    <li className="flex gap-2"><Check size={10} className="text-green-500 mt-0.5 shrink-0" /> Te contactamos por WhatsApp</li>
                    <li className="flex gap-2"><Check size={10} className="text-green-500 mt-0.5 shrink-0" /> Envío 1-3 días hábiles · todo Colombia</li>
                  </ul>
                </div>
                <button onClick={close} className="w-full py-3.5 bg-pp-blue hover:bg-pp-blue/80 text-white font-black transition-all active:scale-95 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderRadius: '2rem 0.5rem 2rem 0.5rem' }}>
                  Volver a la tienda
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
