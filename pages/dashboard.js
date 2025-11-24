import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  
  // Form inputs
  const [subject, setSubject] = useState('')
  const [mood, setMood] = useState('')
  const [vibe, setVibe] = useState('')
  const [hashtags, setHashtags] = useState(true)
  const [variants, setVariants] = useState(3)
  const [customNote, setCustomNote] = useState('')
  
  // Results
  const [captions, setCaptions] = useState([])
  const [showResults, setShowResults] = useState(false)

  // Check authentication
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
    } else {
      setUser(JSON.parse(userData))
    }
  }, [])

  // Moods list
  const moods = [
    'Happy & Excited', 'Professional', 'Funny & Witty', 'Inspirational',
    'Romantic', 'Motivational', 'Casual & Chill', 'Bold & Confident',
    'Grateful', 'Nostalgic', 'Adventurous', 'Sassy',
    'Thoughtful', 'Energetic', 'Humble', 'Sarcastic',
    'Dreamy', 'Fierce', 'Calm & Peaceful', 'Party Vibes',
    'Emotional', 'Mysterious', 'Playful', 'Elegant',
    'Savage', 'Proud', 'Candid', 'Quirky', 'Luxurious', 'Rebellious'
  ]

  // Regional vibes
  const vibes = [
    { name: 'Gujju Style', line: 'આ અમારા કાઠીયાવાડી મોજ હા ભાઈ હા 🦁', locked: user?.plan === 'free' || user?.plan === 'basic' || user?.plan === 'pro' },
    { name: 'Punjabi Style', line: 'ਇਹੋ ਜਿਹੀ ਸਾਡੀ ਵਾਈਬ ਆ ਯਾਰ 🔥', locked: user?.plan === 'free' || user?.plan === 'basic' || user?.plan === 'pro' },
    { name: 'Desi Style', line: 'अपनी मिट्टी, अपनी वाइब 🇮🇳❤️', locked: user?.plan === 'free' || user?.plan === 'basic' },
    { name: 'Gen Z Style', line: 'They copy, we create trends 💅✨🔥', locked: user?.plan === 'free' || user?.plan === 'basic' },
    { name: 'Professional Style', line: 'Excellence isn\'t an act, it\'s our habit. 📈', locked: false }
  ]

  const handleGenerate = async () => {
    if (!subject || !mood) {
      alert('Please fill subject and select mood')
      return
    }

    setLoading(true)
    
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          mood,
          vibe,
          hashtags,
          variants,
          customNote,
          userEmail: user?.email
        })
      })

      const data = await res.json()

      if (res.ok) {
        setCaptions(data.captions)
        setShowResults(true)
        
        // PEAK-END RULE - Confetti animation
        // (You can add confetti library later)
        
      } else {
        alert(data.error || 'Generation failed')
      }
    } catch (err) {
      alert('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (caption) => {
    // PEAK-END RULE - Save toast
    alert('Saved. One step closer to your viral moment.')
  }

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            FunCaption
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <p className="font-medium">{user.email}</p>
              <p className="text-gray-500">
                Plan: <span className="text-primary font-medium">{user.plan || 'Free'}</span>
              </p>
            </div>
            <Link href="/pricing" className="text-sm text-primary hover:underline">
              Upgrade
            </Link>
            <button 
              onClick={() => {
                localStorage.removeItem('user')
                router.push('/')
              }}
              className="text-sm text-gray-600 hover:text-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* User Overview */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-bold mb-2">Welcome back! 👋</h2>
          <p className="text-gray-600">
            Captions remaining: <span className="font-bold text-primary">{user.quota || 3}/3 today</span>
          </p>
        </div>

        {/* LIMITATION BOX - PSYCHOLOGY FRAMEWORK */}
        {user.plan !== 'business' && (
          <div className="bg-gradient-to-r from-secondary to-primary rounded-2xl p-6 mb-6 text-white shadow-lg">
            <h3 className="font-semibold mb-3">Small step between you and your growth:</h3>
            
            <div className="space-y-2 mb-4 text-sm">
              {user.plan === 'free' && (
                <>
                  <p>🔒 30 captions/month (you have 3/day)</p>
                  <p>🔒 All 30 moods (you have 2)</p>
                  <p>🔒 Regional Vibes</p>
                </>
              )}
              {user.plan === 'basic' && (
                <>
                  <p>🔒 Gujarati + Punjabi Vibes</p>
                  <p>🔒 5 Variants (you have 3)</p>
                  <p>🔒 Save History</p>
                </>
              )}
            </div>

            <p className="text-sm mb-4 opacity-90">
              You took one step forward for your success. But for just ₹{user.plan === 'free' ? '99' : '150'}, you're stopping yourself. Remember: No risk, no rich.
            </p>

            <Link 
              href="/pricing"
              className="inline-block bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-opacity-90"
            >
              Upgrade — ₹{user.plan === 'free' ? '99' : '150'}
            </Link>
          </div>
        )}

        {/* CAPTION GENERATOR */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Generate Caption</h2>

          <div className="space-y-4">
            {/* Subject */}
            <div>
              <label className="block font-medium mb-2">What's this post about?</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="e.g., Coffee morning, Beach vacation, Gym workout"
              />
            </div>

            {/* Mood Selector - IKEA EFFECT */}
            <div>
              <label className="block font-medium mb-2">Select Mood</label>
              <div className="grid grid-cols-3 gap-2">
                {moods.slice(0, user.plan === 'free' ? 2 : moods.length).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                      mood === m 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white hover:border-primary'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Vibe Selector - ENDOWMENT EFFECT */}
            <div>
              <label className="block font-medium mb-2">Regional Vibe (Optional)</label>
              <div className="grid grid-cols-2 gap-2">
                {vibes.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => !v.locked && setVibe(v.name)}
                    disabled={v.locked}
                    className={`px-4 py-2 rounded-lg border text-sm text-left transition-all ${
                      v.locked 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : vibe === v.name
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white hover:border-primary'
                    }`}
                  >
                    {v.locked && '🔒 '}{v.name}
                    {v.locked && <span className="block text-xs mt-1">Unlock in {user.plan === 'free' ? 'Basic' : 'Classic'}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Hashtags */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={hashtags}
                onChange={(e) => setHashtags(e.target.checked)}
                className="w-4 h-4"
              />
              <label>Include Hashtags</label>
            </div>

            {/* Variants */}
            <div>
              <label className="block font-medium mb-2">Number of Variants</label>
              <select
                value={variants}
                onChange={(e) => setVariants(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="1">1 Variant</option>
                <option value="3">3 Variants</option>
                {user.plan !== 'free' && <option value="5">5 Variants</option>}
                {user.plan === 'classic' && <option value="10">10 Variants</option>}
              </select>
            </div>

            {/* Custom Note */}
            <div>
              <label className="block font-medium mb-2">Something you'd like to add?</label>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Any specific tone, emojis, or style you want..."
                rows="2"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 disabled:opacity-50 transition-all shadow-lg"
            >
              {loading ? 'Generating your magic... ✨' : 'Generate Captions 🚀'}
            </button>
          </div>
        </div>

        {/* RESULTS */}
        {showResults && captions.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-bold">Your Captions:</h3>
            {captions.map((caption, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-primary">
                <p className="text-gray-800 mb-4">{caption}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(caption)
                      alert('Copied to clipboard!')
                    }}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
                  >
                    📋 Copy
                  </button>
                  {user.plan !== 'free' && (
                    <button
                      onClick={() => handleSave(caption)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 text-sm"
                    >
                      💾 Save
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
