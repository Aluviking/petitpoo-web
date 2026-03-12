import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'

// Layout components
import Navbar      from './components/Navbar'
import Footer      from './components/Footer'

// Homepage sections
import Hero         from './components/Hero'
import Statement    from './components/Statement'
import Process      from './components/Process'
import Products     from './components/Products'
import Stats        from './components/Stats'
import Testimonials from './components/Testimonials'
import Contact      from './components/Contact'

// Pages
import ProductPage from './pages/ProductPage'

// Global widgets
import UrgencyBar       from './components/widgets/UrgencyBar'
import CartSidebar      from './components/widgets/CartSidebar'
import CheckoutModal    from './components/widgets/CheckoutModal'
import SocialProofToast from './components/widgets/SocialProofToast'
import FloatingButtons  from './components/widgets/FloatingButtons'
import ChatBot          from './components/widgets/ChatBot'

// Popups
import WelcomePopup    from './components/popups/WelcomePopup'
import ExitIntentPopup from './components/popups/ExitIntentPopup'
import SpinWheelPopup  from './components/popups/SpinWheelPopup'
import ScrollOfferPopup from './components/popups/ScrollOfferPopup'
import FlashSalePopup    from './components/popups/FlashSalePopup'
import CouponBannerPopup from './components/popups/CouponBannerPopup'

function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Statement />
        <Process />
        <Products />
        <Stats />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function AppShell() {
  return (
    <>
      {/* Top urgency bar */}
      <UrgencyBar />

      {/* Main navigation */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
      </Routes>

      {/* Global e-commerce widgets */}
      <CartSidebar />
      <CheckoutModal />
      <SocialProofToast />
      <FloatingButtons />
      <ChatBot />

      {/* Conversion popups */}
      <WelcomePopup />
      <ExitIntentPopup />
      <SpinWheelPopup />
      <ScrollOfferPopup />
      <FlashSalePopup />
      <CouponBannerPopup />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.slice(0, -1) || '/'}>
      <CartProvider>
        <AppShell />
      </CartProvider>
    </BrowserRouter>
  )
}
