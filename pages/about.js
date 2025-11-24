import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 border-b">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            FunCaption
          </Link>
          <div className="space-x-4">
            <Link href="/" className="text-gray-600 hover:text-primary">Home</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-primary">Pricing</Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary">Contact</Link>
            <Link href="/login" className="bg-primary text-white px-6 py-2 rounded-lg">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* CHAMPION FRAMEWORK - Transformation Story */}
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Built for Creators Who Refuse to Be Ignored
          </h1>
        </div>

        {/* Transformation Story - 3 Lines */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-12 text-center">
          <p className="text-xl leading-relaxed text-gray-800">
            <span className="font-bold">Creators get ignored</span>, not because they're bad, but because their words fail. 
            <br />
            <span className="font-bold">FunCaption gives you captions</span> that turn posts into movements. 
            <br />
            <span className="font-bold">Be the creator people copy.</span>
          </p>
        </div>

        {/* The Problem */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">The Problem We Solve</h2>
          <p className="text-lg text-gray-700 mb-4">
            Every day, talented creators post amazing content — beautiful photos, creative videos, authentic moments. 
            But they get no reach. No engagement. No growth.
          </p>
          <p className="text-lg text-gray-700">
            Why? Because the <span className="font-bold">caption doesn't connect</span>. 
            It's generic. Boring. Forgettable. The algorithm ignores it. People scroll past.
          </p>
        </div>

        {/* The Solution */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">What Makes FunCaption Different</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="text-4xl">🎯</div>
              <div>
                <h3 className="font-bold text-xl mb-2">30 Moods, Not Templates</h3>
                <p className="text-gray-700">
                  We don't give you cookie-cutter templates. We understand your emotion — happy, savage, professional, nostalgic — and craft captions that FEEL right.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-4xl">🇮🇳</div>
              <div>
                <h3 className="font-bold text-xl mb-2">Regional Vibes That Create Belonging</h3>
                <p className="text-gray-700">
                  Gujarati. Punjabi. Desi. Gen Z. We add cultural identity to your captions. 
                  When your audience reads it, they think: <span className="italic">"This is OUR kind of creator."</span>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-4xl">⚡</div>
              <div>
                <h3 className="font-bold text-xl mb-2">Built by AI, Refined for Humans</h3>
                <p className="text-gray-700">
                  Google's Gemini AI generates captions in seconds. But we add the secret sauce — belonging lines, cultural nuances, viral hooks — that make people SAVE your post.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="bg-primary/5 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-4">
            We're not here to sell you a tool. We're here to <span className="font-bold">upgrade your creator identity</span>.
          </p>
          <p className="text-lg text-gray-700">
            FunCaption exists so every creator — whether you have 100 followers or 100K — can post with confidence, 
            knowing your words will make people STOP, READ, and FOLLOW.
          </p>
        </div>

        {/* Who It's For */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Who FunCaption Is For</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-bold mb-2">📸 Instagram Creators</h3>
              <p className="text-gray-600">Turn every post into engagement gold</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-bold mb-2">💼 Small Business Owners</h3>
              <p className="text-gray-600">Sell without sounding salesy</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-bold mb-2">🎬 Content Creators</h3>
              <p className="text-gray-600">Match your vibe, every single time</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-bold mb-2">🚀 Growth-Focused Influencers</h3>
              <p className="text-gray-600">Scale content without losing quality</p>
            </div>
          </div>
        </div>

        {/* The Team (Optional - Add your story) */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Built with ❤️ in India</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            FunCaption was born out of frustration. As creators ourselves, we were tired of spending 
            20 minutes crafting the "perfect caption" only to get zero reach. So we built this.
          </p>
          <Link 
            href="/login"
            className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 shadow-lg"
          >
            Join the Movement →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t text-center text-gray-600">
        <p>&copy; 2024 FunCaption. Made with ❤️ for creators.</p>
      </footer>
    </div>
  )
}
