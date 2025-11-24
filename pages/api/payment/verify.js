import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const planQuotas = {
  'oneday': { quota: 2, days: 1 },
  'basic': { quota: 30, days: 30 },
  'pro': { quota: 120, days: 30 },
  'classic': { quota: 300, days: 30 },
  'business': { quota: 1000, days: 30 }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { 
    razorpay_order_id, 
    razorpay_payment_id, 
    razorpay_signature,
    plan,
    userEmail 
  } = req.body

  try {
    // Verify signature
    const text = razorpay_order_id + '|' + razorpay_payment_id
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex')

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid payment signature' })
    }

    // Payment verified! Update user plan
    const planData = planQuotas[plan.toLowerCase()]
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + planData.days)

    const { data: updatedUser, error } = await supabase
      .from('users')
      .update({
        plan: plan.toLowerCase(),
        quota_total: planData.quota,
        quota_used: 0,
        quota_resets_at: expiresAt.toISOString(),
        plan_expires_at: expiresAt.toISOString(),
        last_payment_date: new Date().toISOString()
      })
      .eq('email', userEmail)
      .select()
      .single()

    if (error) {
      console.error('User update error:', error)
      return res.status(500).json({ error: 'Failed to update user plan' })
    }

    // Log payment
    await supabase
      .from('payments')
      .insert([{
        user_email: userEmail,
        plan: plan.toLowerCase(),
        amount: planQuotas[plan.toLowerCase()]?.quota || 0,
        razorpay_order_id: razorpay_order_id,
        razorpay_payment_id: razorpay_payment_id,
        status: 'success',
        created_at: new Date().toISOString()
      }])

    return res.status(200).json({
      success: true,
      message: 'Payment verified and plan upgraded!',
      user: {
        email: updatedUser.email,
        plan: updatedUser.plan,
        quota: updatedUser.quota_total
      }
    })

  } catch (error) {
    console.error('Payment verification error:', error)
    return res.status(500).json({ error: 'Payment verification failed' })
  }
}
