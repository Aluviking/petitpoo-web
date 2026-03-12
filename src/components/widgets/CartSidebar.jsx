import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag, Truck, Package, Droplets, Tag } from 'lucide-react'
import { useCart } from '../../context/CartContext'

function CartItemIcon({ product }) {
  const isKit = product.category === 'kit'
  const Icon = isKit ? Package : Droplets
  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: `linear-gradient(135deg, ${product.bgFrom || '#e9d5ff'}, ${product.bgTo || '#c4b5fd'})` }}
    >
      <Icon size={20} style={{ color: product.colorDark || '#4c1d95' }} strokeWidth={1.5} />
    </div>
  )
}

const FREE_SHIPPING_THRESHOLD = 80000

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, removeFromCart, updateQty, total, formatCOP, count, setIsCheckoutOpen } = useCart()
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const remaining = FREE_SHIPPING_THRESHOLD - total

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[80] cart-overlay"
            style={{ background: 'rgba(10,5,32,0.55)' }}
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed top-0 right-0 h-full z-[90] flex flex-col sidebar-scroll overflow-y-auto w-full sm:w-[400px]"
            style={{ background: '#ffffff', borderLeft: '1px solid rgba(124,58,237,0.12)' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 shrink-0 sticky top-0 z-10 bg-white"
              style={{ borderBottom: '1px solid rgba(124,58,237,0.1)' }}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-pp-blue" />
                <h2 className="font-black text-[#0a0520] text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Carrito
                  {count > 0 && (
                    <span className="ml-2 text-xs font-bold text-white bg-pp-blue px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-[#0a0520] transition-colors"
                aria-label="Cerrar carrito"
              >
                <X size={18} />
              </button>
            </div>

            {/* Free shipping progress */}
            {total > 0 && (
              <div className="px-5 py-3 shrink-0" style={{ background: '#faf5ff', borderBottom: '1px solid rgba(124,58,237,0.08)' }}>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className={`flex items-center gap-1 font-semibold ${progress === 100 ? 'text-green-600' : 'text-[#0a0520]'}`}>
                    <Truck size={12} className={progress === 100 ? 'text-green-500' : 'text-pp-blue'} />
                    {progress === 100 ? '¡Envío gratis desbloqueado!' : `Falta ${formatCOP(remaining)} para envío gratis`}
                  </span>
                  <span className="text-gray-400">${(FREE_SHIPPING_THRESHOLD / 1000).toFixed(0)}K</span>
                </div>
                <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    className="h-full rounded-full"
                    style={{ background: progress === 100 ? '#16a34a' : 'linear-gradient(90deg,#7C3AED,#a855f7)' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-purple-50">
                    <ShoppingBag size={28} className="text-purple-300" />
                  </div>
                  <p className="text-gray-400 text-sm font-medium">Tu carrito está vacío</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-2.5 bg-pp-blue text-white text-sm font-bold hover:bg-pp-blue/80 transition-all active:scale-95"
                    style={{ borderRadius: '2rem 0.5rem 2rem 0.5rem' }}
                  >
                    Explorar aromas
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-3 p-3 rounded-2xl"
                      style={{ background: '#faf5ff', border: '1px solid rgba(124,58,237,0.1)' }}
                    >
                      <CartItemIcon product={item} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#0a0520] text-sm font-semibold leading-tight truncate">
                          petit poo {item.name}
                        </p>
                        <p className="text-pp-blue text-sm font-bold mt-0.5">{formatCOP(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center gap-1 bg-white rounded-full border border-purple-100">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-pp-blue transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-5 text-center text-[#0a0520] font-bold text-sm">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-pp-blue transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-5 py-4 shrink-0 sticky bottom-0 bg-white"
                style={{ borderTop: '1px solid rgba(124,58,237,0.1)' }}
              >
                <div className="flex items-center gap-2 p-3 rounded-xl mb-3" style={{ background: '#faf5ff', border: '1px solid rgba(124,58,237,0.12)' }}>
                  <Tag size={13} className="text-pp-blue shrink-0" />
                  <span className="text-pp-blue text-xs font-bold tracking-widest">PETIT10</span>
                  <span className="text-gray-500 text-xs ml-1">→ 10% de descuento</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600 text-sm font-medium">Total</span>
                  <span className="text-[#0a0520] font-black text-xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {formatCOP(total)} <span className="text-gray-400 text-sm font-normal">COP</span>
                  </span>
                </div>
                <button
                  onClick={() => { setIsOpen(false); setIsCheckoutOpen(true) }}
                  className="w-full py-3.5 bg-pp-blue hover:bg-pp-blue/80 text-white font-black transition-all active:scale-95 text-sm"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderRadius: '2rem 0.5rem 2rem 0.5rem' }}
                >
                  Finalizar compra →
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 text-gray-400 text-xs hover:text-gray-600 transition-colors mt-1"
                >
                  Continuar comprando
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
