import { motion } from 'framer-motion'

const WA_NUMBER = '573001234567'
const WA_MSG = encodeURIComponent('Hola! Me interesa conocer mas sobre los productos de petit poo')

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-[3.75rem] left-4 z-[70]">
      <motion.a
        href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 300, damping: 22 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: '#25D366', boxShadow: '0 4px 16px rgba(37,211,102,0.45)' }}
        aria-label="Contactar por WhatsApp"
      >
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 5C9.925 5 5 9.925 5 16c0 1.969.516 3.813 1.41 5.41L5 27l5.73-1.38A10.94 10.94 0 0016 27c6.075 0 11-4.925 11-11S22.075 5 16 5zm0 20a8.94 8.94 0 01-4.565-1.246l-.327-.195-3.4.818.845-3.32-.213-.34A8.973 8.973 0 017 16c0-4.963 4.037-9 9-9s9 4.037 9 9-4.037 9-9 9zm4.93-6.642c-.27-.136-1.6-.788-1.848-.878-.247-.09-.428-.135-.607.135-.18.27-.696.878-.854 1.058-.157.18-.315.202-.585.067-.27-.136-1.14-.42-2.172-1.34-.803-.715-1.344-1.598-1.502-1.868-.157-.27-.017-.416.119-.55.12-.12.27-.315.405-.472.135-.157.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.608-1.463-.833-2.003-.22-.528-.443-.456-.608-.464l-.518-.01a.993.993 0 00-.72.338c-.247.27-.945.923-.945 2.25 0 1.327.968 2.609 1.103 2.789.135.18 1.905 2.91 4.617 4.08.645.278 1.148.444 1.54.569.647.206 1.237.177 1.703.107.52-.077 1.6-.655 1.826-1.286.225-.63.225-1.17.157-1.283-.067-.112-.247-.18-.517-.315z"
            fill="white"
          />
        </svg>
      </motion.a>
    </div>
  )
}
