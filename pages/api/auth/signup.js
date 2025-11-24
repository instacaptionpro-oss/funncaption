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
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single()

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Create user in database
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([
        {
          email: email,
          password_hash: password, // In production, hash this with bcrypt!
          plan: 'free',
          quota_total: 3,
          quota_used: 0,
          quota_resets_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Signup error:', error)
      return res.status(500).json({ error: 'Failed to create account' })
    }

    // Return user data (without password)
    return res.status(200).json({
      success: true,
      user: {
        email: newUser.email,
        plan: newUser.plan,
        quota: newUser.quota_total
      }
    })

  } catch (error) {
    console.error('Signup error:', error)
    return res.status(500).json({ error: 'Server error' })
  }
}
