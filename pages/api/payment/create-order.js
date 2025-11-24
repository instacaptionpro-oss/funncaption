import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

const planPrices = {
  'oneday': 6,
  'basic': 99,
  'pro': 249,
  'classic': 459,
  'business': 999
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { plan, userEmail } = req.body

  if (!plan || !userEmail) {
    return res.status(400).json({ error: 'Plan and user email required' })
  }

  const amount = planPrices[plan.toLowerCase()]

  if (!amount) {
    return res.status(400).json({ error: 'Invalid plan' })
  }

  try {
    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: 'order_${Date.now()} ', // ← FIXED: Added backticks
      notes: {
        plan: plan,
        userEmail: userEmail
      }
    })

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: amount,
      currency: 'INR',
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    })

  } catch (error) {
    console.error('Order creation error:', error)
    return res.status(500).json({ error: 'Failed to create payment order' })
  }
}
