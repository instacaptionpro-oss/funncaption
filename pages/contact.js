import { useState } from 'react'
import Link from 'next/link'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission (you can add email API later)
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
      setName('')
      setEmail('')
      setMessage('')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            FunCaption
          </Link>
          <div className="space-x-4">
            <Link href="/" className="text-gray-600 hover:text-primary">Home</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-primary">Pricing</Link>
            <Link href="/about" className="text-gray-600 hover:text-primary">About</Link>
            <Link href="/login" className="bg-primary text-white px-6 py-2 rounded-lg">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600">We'd love to hear from you!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg">
                <p className="font-medium">✅ Message sent successfully!</p>
                <p className="text-sm mt-2">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="Tell us how we can help..."
                    rows="5"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Other ways to reach us</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="text-3xl">📧</div>
                  <div>
                    <h3 className="font-bold mb-1">Email Support</h3>
                    <p className="text-gray-600">support@funcaption.space</p>
                    <p className="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-3xl">💬</div>
                  <div>
                    <h3 className="font-bold mb-1">Live Chat</h3>
                    <p className="text-gray-600">Available on dashboard</p>
                    <p className="text-sm text-gray-500 mt-1">Mon-Sat, 9 AM - 6 PM IST</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-3xl">📱</div>
                  <div>
                    <h3 className="font-bold mb-1">Social Media</h3>
                    <p className="text-gray-600">@funcaption on Instagram</p>
                    <p className="text-sm text-gray-500 mt-1">DM us for quick questions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-primary/5 rounded-xl p-6">
              <h3 className="font-bold mb-4">Quick Questions?</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/pricing" className="text-primary hover:underline">
                    → What plan should I choose?
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-primary hover:underline">
                    → How does FunCaption work?
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    → Refund policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    → Technical support
                  </a>
                </li>
              </ul>
            </div>

            {/* Business Inquiries */}
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-bold mb-2">Business Inquiries</h3>
              <p className="text-gray-600 text-sm">
                For partnerships, bulk plans, or custom solutions, email us at:
              </p>
              <p className="text-primary font-medium mt-2">business@funcaption.space</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t text-center text-gray-600">
        <p>&copy; 2024 FunCaption. Made with ❤️ for creators.</p>
      </footer>
    </div>
  )
}
