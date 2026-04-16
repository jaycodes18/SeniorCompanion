import { motion } from 'framer-motion'
import { useState } from 'react'
import Navigation from './components/Navigation'
import Hero from '../components/Hero'
import TechTutor from '../components/TechTutor'
import HealthGuide from '../components/HealthGuide'
import ChatBot from '../components/ChatBot'

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        {activeTab === 'home' && <Hero setActiveTab={setActiveTab} />}
        {activeTab === 'tech' && <TechTutor />}
        {activeTab === 'health' && <HealthGuide />}
        {activeTab === 'chat' && <ChatBot />}
      </motion.div>
    </div>
  )
}
