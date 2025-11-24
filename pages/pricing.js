import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Pricing() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const plans = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Starter • For beginners stepping into content',
      features: [
        '3 captions / day',
        '2 moods only',
        '1 variant',
        'No vibes',
        'No save history'
      ],
      locked: ['30 moods', 'Regional vibes', 'Multiple variants'],
      color: 'grey',
      scale: 0.9,
      cta: 'Current Plan'
    },
    {
      name: 'Basic',
      price: 99,
      period: 'month',
      description: 'For creators building their brand',
      features: [
        '30 captions / month',
        '20 moods',
        '3 variants',
        'Copy & paste',
        'Priority support'
      ],
      locked: ['Regional vibes', '5 variants', 'Save history'],
      color: 'teal',
      scale: 1.05,
      badge: 'Most creators choose this',
      cta: 'Upgrade',
      popular: true
    },
    {
      name: 'Pro',
      price: 249,
      period: 'month',
      description: 'For growing influencers',
      features: [
        '120 captions / month',
        'All 30 moods',
        '5 variants',
        'Desi + GenZ vibes',
        'Save history',
        'Simple rewrite'
      ],
      locked: ['All 18 vibes', '10 variants', 'Folders'],
      color: 'blue',
      scale: 1.0,
      cta: 'Upgrade'
    },
    {
      name: 'Classic',
      price: 459,
      period: 'month',
      description: 'For viral creators & influencers',
      features: [
        '300 captions / month',
        'All moods + vibes',
        '10 variants',
        'All 18 regional vibes',
        'Folder organization',
        'Advanced rewrite',
        'Priority generation'
      ],
      color: 'purple',
      scale: 1.0,
      cta: 'Upgrade'
    },
    {
      name: 'Business',
      price: 999,
      period: 'month',
      description: 'For teams & agencies scaling',
      features: [
        '1000 captions / month',
        'Everything in Classic',
        '3 team seats',
        'Bulk generate',
        'Analytics dashboard',
        'API access',
        'Dedicated support'
      ],
      color: 'gold',
      scale: 1.0,
      cta: 'Contact Us'
    }
  ]

  const getPriceDifference = (planPrice) => {
    if (!user) return planPrice
    const currentPrice = plans.find(p => p.name.toLowerCase() === user.plan?.toLowerCase())?.price || 0
    return planPrice - currentPrice
  }

  onst getCardStyle = (plan) => {
  const isCurrentPlan = user?.plan?.toLowerCase() === plan.name.toLowerCase()
  
  let borderColor = '#E5E7EB'
  if (plan.color === 'teal') borderColor = 'linear-gradient(135deg, #14B8A6, #0EA5E9)'
  if (plan.color === 'purple') borderColor = 'linear-gradient(135deg, #8B5CF6, #EC4899)'
  if (plan.color === 'gold') borderColor = 'linear-gradient(135deg, #F59E0B, #EF4444)'
  
  // FIX: Calculate scale separately first
  const scaleValue = isCurrentPlan ? 0.9 : plan.scale
  
  return {
    transform: scale(${scaleValue}),  // ← NOW CORRECT!
    opacity: isCurrentPlan ? 0.85 : 1,
    background: isCurrentPlan ? '#F9FAFB' : 'white',
    border: plan.popular ? '3px solid' : '1px solid #E5E7EB',
    boxShadow: plan.popular ? '0 8px 24px rgba(20, 184, 166, 0.3)' : 'none'
  }
}
    
    let borderColor = '#E5E7EB' // grey
    if (plan.color === 'teal') borderColor = 'linear-gradient(135deg, #14B8A6, #0EA5E9)'
    if (plan.color === 'purple') borderColor = 'linear-gradient(135deg, #8B5CF6, #EC4899)'
    if (plan.color === 'gold') borderColor = 'linear-gradient(135deg, #F59E0B, #EF4444)'
    
    return {
      transform: scale(${isCurrentPlan ? 0.9 : plan.scale}),
      opacity: isCurrentPlan ? 0.85 : 1,
      background: isCurrentPlan ? '#F9FAFB' : 'white',
      border: plan.popular ? '3px solid' : '1px solid #E5E7EB',
      borderImage: plan.popular ? borderColor : 'none',
      boxShadow: plan.popular ? '0 8px 24px rgba(20, 184, 166, 0.3)' : 'none'
    }
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
            <Link href="/about" className="text-gray-600 hover:text-primary">About</Link>
            {user ? (
              <Link href="/dashboard" className="bg-primary text-white px-6 py-2 rounded-lg">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="bg-primary text-white px-6 py-2 rounded-lg">
                Get Started
              </Link>
            )}
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Choose Your Growth Path</h1>
          <p className="text-xl text-gray-600">Start free, upgrade when ready</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const isCurrentPlan = user?.plan?.toLowerCase() === plan.name.toLowerCase()
            const difference = getPriceDifference(plan.price)
            
            return (
              <div
                key={plan.name}
                className="rounded-2xl p-6 transition-all duration-300 hover:shadow-xl relative"
                style={getCardStyle(plan)}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    {plan.badge}
                  </div>
                )}

                {/* Plan Name */}
                <h3 className={text-2xl font-bold mb-2 ${plan.popular ? 'text-primary' : ''}}>
                  {plan.name}
                </h3>
                
                {/* Description */}
                <p className="text-xs text-gray-500 mb-4">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  {user && !isCurrentPlan && difference > 0 ? (
                    <>
                      <p className="text-sm text-gray-500">Just ₹{difference} more</p>
                      <p className="text-4xl font-bold">₹{plan.price}</p>
                    </>
                  ) : (
                    <p className="text-4xl font-bold">
                      {plan.price === 0 ? 'Free' : ₹${plan.price}}
                    </p>
                  )}
                  <p className="text-gray-500 text-sm">/ {plan.period}</p>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Locked Features - ENDOWMENT EFFECT */}
                {plan.locked && plan.locked.length > 0 && isCurrentPlan && (
                  <div className="mb-4 pt-4 border-t">
                    {plan.locked.map((locked, idx) => (
                      <p key={idx} className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                        🔒 {locked}
                      </p>
                    ))}
                    <p className="text-xs text-primary mt-2">Unlocked in next plan</p>
                  </div>
                )}

                {/* CTA */}
                <button
                  onClick={() => {
                    if (isCurrentPlan) return
                    if (plan.name === 'Business') {
                      window.location.href = '/contact'
                    } else if (user) {
                      router.push(/api/payment/create-order?plan=${plan.name.toLowerCase()})
                    } else {
                      router.push('/login')
                    }
                  }}
                  disabled={isCurrentPlan}
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    isCurrentPlan
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : plan.popular
                      ? 'bg-primary text-white hover:bg-opacity-90 shadow-lg'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {isCurrentPlan 
                    ? 'Current Plan' 
                    : user && difference > 0
                    ? Upgrade — ₹${difference}
                    : plan.cta
                  }
                </button>
              </div>
            )
          })}
        </div>

        {/* FAQ or Trust Section */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-gray-600 mb-4">🔒 Secure payments via Razorpay</p>
          <p className="text-gray-600 mb-4">💯 7-day money-back guarantee</p>
          <p className="text-gray-600">❤️ Trusted by creators across India</p>
        </div>
      </div>
    </div>
  )
}
