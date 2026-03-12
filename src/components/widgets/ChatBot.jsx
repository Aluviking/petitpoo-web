import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, MessageCircle } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { PRODUCTS } from '../../data/products'

const WA = '573001234567'
const DELAY = 900

const FLOWS = {
  start: {
    bot: 'Hola, soy el asistente de **petit poo**. ¿En qué situación necesitas usar nuestro bloqueador de olores?',
    options: [
      { label: 'En casa', next: 'uso_casa' },
      { label: 'En la oficina', next: 'uso_oficina' },
      { label: 'De viaje', next: 'uso_viaje' },
      { label: 'Es un regalo', next: 'uso_regalo' },
    ],
  },
  uso_casa: {
    bot: 'Perfecto para el hogar. ¿Prefieres un aroma fresco y frutal, o algo más neutro y sofisticado?',
    options: [
      { label: 'Frutal y dulce', next: 'rec_frutal' },
      { label: 'Fresco y neutro', next: 'rec_fresco' },
      { label: 'Amaderado', next: 'rec_wood' },
    ],
  },
  uso_oficina: {
    bot: 'Para la oficina lo ideal es algo discreto y fresco. ¿Con qué frecuencia lo usarías?',
    options: [
      { label: 'Todos los días', next: 'rec_kit' },
      { label: 'De vez en cuando', next: 'rec_fresco' },
    ],
  },
  uso_viaje: {
    bot: 'Para viajes tenemos el formato perfecto: 14ml cabe en cualquier bolsillo y pasa por el aeropuerto. ¿Qué aroma te atrae?',
    options: [
      { label: 'Strawberry', next: 'rec_strawberry' },
      { label: 'Very Berry', next: 'rec_berry' },
      { label: 'Oasis', next: 'rec_oasis' },
    ],
  },
  uso_regalo: {
    bot: 'Excelente idea. Para regalar tenemos **Kits especiales** que incluyen varios aromas. ¿Cuánto quieres invertir?',
    options: [
      { label: 'Kit completo', next: 'rec_kit' },
      { label: 'Producto individual', next: 'rec_frutal' },
    ],
  },
  rec_frutal: {
    bot: 'Te recomendamos **Strawberry** — el aroma más amado de Colombia. Fresas frescas que llenan el ambiente de frescura.',
    product: 'strawberry',
    options: [
      { label: 'Agregar al carrito', action: 'add_cart', productSlug: 'strawberry' },
      { label: 'Ver más opciones', next: 'mas_opciones' },
    ],
  },
  rec_fresco: {
    bot: 'Te recomendamos **Oasis** — una mezcla marina fresca y limpia, ideal para espacios compartidos.',
    product: 'oasis',
    options: [
      { label: 'Agregar al carrito', action: 'add_cart', productSlug: 'oasis' },
      { label: 'Ver más opciones', next: 'mas_opciones' },
    ],
  },
  rec_wood: {
    bot: 'Te recomendamos **Apple Wood** — notas de manzana y madera, sofisticado y masculino.',
    product: 'apple-wood',
    options: [
      { label: 'Agregar al carrito', action: 'add_cart', productSlug: 'apple-wood' },
      { label: 'Ver más opciones', next: 'mas_opciones' },
    ],
  },
  rec_berry: {
    bot: '**Very Berry** — arándanos y bayas del bosque. Nuestro más vendido, con más de 1.200 reseñas.',
    product: 'very-berry',
    options: [
      { label: 'Agregar al carrito', action: 'add_cart', productSlug: 'very-berry' },
      { label: 'Ver más opciones', next: 'mas_opciones' },
    ],
  },
  rec_strawberry: {
    bot: '**Strawberry** es perfecto para viajes. Pequeño, potente y con olor increíble. Cabe en cualquier bolsillo.',
    product: 'strawberry',
    options: [
      { label: 'Agregar al carrito', action: 'add_cart', productSlug: 'strawberry' },
      { label: 'Ver más opciones', next: 'mas_opciones' },
    ],
  },
  rec_oasis: {
    bot: '**Oasis** — fresco, limpio y discreto. Ideal para quienes viajan seguido y comparten baños.',
    product: 'oasis',
    options: [
      { label: 'Agregar al carrito', action: 'add_cart', productSlug: 'oasis' },
      { label: 'Ver más opciones', next: 'mas_opciones' },
    ],
  },
  rec_kit: {
    bot: 'El **Happy Kit** es perfecto. Incluye los 5 aromas más vendidos al mejor precio. Ahorro del 20%.',
    product: 'happy-kit',
    options: [
      { label: 'Agregar al carrito', action: 'add_cart', productSlug: 'happy-kit' },
      { label: 'Ver más opciones', next: 'mas_opciones' },
    ],
  },
  mas_opciones: {
    bot: 'Tenemos 6 aromas únicos. ¿Quieres hablar con un asesor por WhatsApp para elegir el tuyo?',
    options: [
      { label: 'Hablar por WhatsApp', action: 'open_wa' },
      { label: 'Empezar de nuevo', next: 'start' },
    ],
  },
  added: {
    bot: 'Listo. Ya está en tu carrito. ¿Quieres agregar algo más o proceder al pago?',
    options: [
      { label: 'Ver carrito', action: 'open_cart' },
      { label: 'Seguir comprando', next: 'start' },
    ],
  },
}

function renderText(text) {
  return text.split('**').map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className="font-extrabold">{part}</strong>
      : part
  )
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [options, setOptions] = useState([])
  const [typing, setTyping] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [pulse, setPulse] = useState(true)
  const endRef = useRef(null)
  const { addToCart, setIsOpen: openCart } = useCart()

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    const t = setTimeout(() => setPulse(true), 6000)
    return () => clearTimeout(t)
  }, [])

  const addBotMessage = (text, opts, delay = DELAY) => {
    setTyping(true)
    setOptions([])
    setTimeout(() => {
      setMessages(m => [...m, { from: 'bot', text }])
      setTyping(false)
      setOptions(opts || [])
    }, delay)
  }

  const openChat = () => {
    setOpen(true)
    setPulse(false)
    if (!hasOpened) {
      setHasOpened(true)
      setTimeout(() => addBotMessage(FLOWS.start.bot, FLOWS.start.options, 400), 300)
    }
  }

  const handleOption = (opt) => {
    setMessages(m => [...m, { from: 'user', text: opt.label }])
    setOptions([])

    if (opt.action === 'add_cart') {
      const product = PRODUCTS.find(p => p.slug === opt.productSlug)
      if (product) {
        addToCart(product, 1)
        addBotMessage(FLOWS.added.bot, FLOWS.added.options)
      }
    } else if (opt.action === 'open_wa') {
      window.open(`https://wa.me/${WA}?text=${encodeURIComponent('Hola, quiero ayuda para elegir mi aroma de petit poo')}`, '_blank')
      addBotMessage('Te espero por WhatsApp. También puedes seguir explorando aquí.', [{ label: 'Empezar de nuevo', next: 'start' }])
    } else if (opt.action === 'open_cart') {
      openCart(true)
      addBotMessage('Aqui esta tu carrito. Puedo ayudarte con algo más?', [{ label: 'Ver otros aromas', next: 'start' }])
    } else if (opt.next) {
      const flow = FLOWS[opt.next]
      if (flow) addBotMessage(flow.bot, flow.options)
    }
  }

  return (
    <>
      <div className="fixed bottom-5 left-4 z-[70]">
        <motion.button
          onClick={open ? () => setOpen(false) : openChat}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.8, type: 'spring', stiffness: 300, damping: 22 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: 'linear-gradient(135deg, #6d17e0, #9469b5)', boxShadow: '0 4px 18px rgba(109,23,224,0.45)' }}
          aria-label="Chat de ventas"
        >
          {open
            ? <ChevronDown size={17} className="text-white" />
            : <MessageCircle size={18} className="text-white" />
          }
          {pulse && !open && (
            <span className="absolute -top-1 -right-1 flex">
              <span className="absolute w-3 h-3 rounded-full bg-red-500 animate-ping opacity-60" />
              <span className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center text-white text-[8px] font-bold">1</span>
            </span>
          )}
        </motion.button>

        {!open && !hasOpened && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4 }}
            className="absolute bottom-12 left-0 whitespace-nowrap bg-white text-[#270566] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg pointer-events-none"
            style={{ boxShadow: '0 4px 16px rgba(39,5,102,0.15)' }}
          >
            Te ayudamos a elegir
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="fixed bottom-20 left-5 z-[69] w-[320px] sm:w-[360px] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{ height: '460px', border: '1px solid rgba(109,23,224,0.2)', background: '#fff' }}
          >
            <div
              className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{ background: 'linear-gradient(135deg, #270566, #6d17e0)' }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white/20 shrink-0">
                <svg width="20" height="20" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="15" r="7" fill="white" fillOpacity="0.9"/>
                  <path d="M11 22 Q18 28 25 22" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" strokeOpacity="0.9"/>
                  <circle cx="15.5" cy="14" r="1.2" fill="#6d17e0"/>
                  <circle cx="20.5" cy="14" r="1.2" fill="#6d17e0"/>
                  <path d="M15.5 17 Q18 18.5 20.5 17" stroke="#6d17e0" strokeWidth="1" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Asistente petit poo</p>
                <p className="text-white/60 text-[10px]">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1" />
                  En línea
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors p-1">
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 sidebar-scroll" style={{ background: '#f9f5ff' }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.from === 'user' ? 'text-white rounded-br-sm' : 'text-[#270566] rounded-bl-sm'
                    }`}
                    style={{
                      background: msg.from === 'user' ? 'linear-gradient(135deg, #6d17e0, #9469b5)' : 'white',
                      boxShadow: '0 1px 6px rgba(39,5,102,0.08)',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {renderText(msg.text)}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 shadow-sm">
                    {[0, 1, 2].map(i => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#9469b5]"
                        style={{ animation: `bounce 1.2s infinite ${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {options.length > 0 && (
              <div className="px-4 py-3 border-t border-purple-100 bg-white space-y-2 shrink-0">
                {options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOption(opt)}
                    className="w-full text-left px-4 py-2.5 border font-semibold text-sm transition-all hover:bg-[#6d17e0] hover:text-white hover:border-[#6d17e0] active:scale-[0.98]"
                    style={{
                      borderRadius: '1.5rem 0.4rem 1.5rem 0.4rem',
                      borderColor: 'rgba(109,23,224,0.25)',
                      color: '#270566',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  )
}
