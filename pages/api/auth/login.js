import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' })
  }

  try {
    // Find user
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password_hash', password) // In production, compare hashed passwords!
      .single()

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Check if quota needs reset (daily for free users)
    const now = new Date()
    const resetTime = new Date(user.quota_resets_at)
    
    if (now > resetTime) {
      // Reset quota
      const { data: updatedUser } = await supabase
        .from('users')
        .update({
          quota_used: 0,
          quota_resets_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        })
        .eq('email', email)
        .select()
        .single()

      return res.status(200).json({
        success: true,
        user: {
          email: updatedUser.email,
          plan: updatedUser.plan,
          quota: updatedUser.quota_total,
          quotaUsed: updatedUser.quota_used
        }
      })
    }

    // Return user data
    return res.status(200).json({
      success: true,
      user: {
        email: user.email,
        plan: user.plan,
        quota: user.quota_total,
        quotaUsed: user.quota_used
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ error: 'Server error' })
  }
}
