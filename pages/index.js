import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">FunCaption</div>
          <div className="space-x-4">
            <Link href="/pricing" className="text-gray-600 hover:text-primary">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary">
              About
            </Link>
            <Link href="/login" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section - IDENTITY TRANSFER */}
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Home of Real Trendsetters
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create captions that make people follow you — not just like you.
        </p>
        
        {/* CTA */}
        <Link href="/login" className="inline-block bg-primary text-white text-lg px-8 py-4 rounded-xl hover:scale-105 transition-transform shadow-lg">
          Start Creating
        </Link>
        <p className="text-sm text-gray-500 mt-4">
          Join creators who set trends, not follow them.
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">30 Moods</h3>
            <p className="text-gray-600">From professional to funny - match every vibe</p>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-bold mb-2">18 Regional Vibes</h3>
            <p className="text-gray-600">Gujarati, Punjabi, Desi & more - feel the belonging</p>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Instant Generation</h3>
            <p className="text-gray-600">AI-powered captions in seconds</p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-20">
          <p className="text-gray-500 mb-4">Trusted by creators across India</p>
          <div className="flex justify-center gap-8 text-2xl">
            🇮🇳 ✨ 🚀 💪 ❤️
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t text-center text-gray-600">
        <p>&copy; 2024 FunCaption. Made with ❤️ for creators.</p>
        <div className="mt-4 space-x-4">
          <Link href="/contact" className="hover:text-primary">Contact</Link>
          <Link href="/about" className="hover:text-primary">About</Link>
        </div>
      </footer>
    </div>
  )
}
