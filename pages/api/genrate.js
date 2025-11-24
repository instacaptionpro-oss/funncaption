import { GoogleGenerativeAI } from '@google/generative-ai'
import { createClient } from '@supabase/supabase-js'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Regional vibe belonging lines
const vibeLines = {
  'Gujju Style': 'આ અમારા કાઠીયાવાડી મોજ હા ભાઈ હા 🦁',
  'Punjabi Style': 'ਇਹੋ ਜਿਹੀ ਸਾਡੀ ਵਾਈਬ ਆ ਯਾਰ 🔥',
  'Marathi Style': 'हीच आमची पुणेरी स्टाइल - मराठा मनाचं सत्य! 🚩❤️',
  'Bengali Style': 'এই তো আমাদের বাঙালি ভাইব - প্রাণের বাংলা, হৃদয়ের বাংলা! 🐟📚💛',
  'Tamil Style': 'இதுதான் நம்ம ஸ்டைல் மச்சி - தமிழ் இதயம், தமிழ் பெருமை! 🔥🎬❤️',
  'Telugu Style': 'ఇదే మన తెలుగు వైబ్ రా - తెలుగు గుండె, తెలుగు అభిమానం! 🎆💪❤️',
  'Kannada Style': 'ಇದೇ ನಮ್ಮ ಕರ್ನಾಟಕ ಸ್ಟೈಲ್ ಮಗಾ - ಕನ್ನಡ ಹೃದಯ, ಕನ್ನಡ ಹೆಮ್ಮೆ! 🚩❤️',
  'Malayalam Style': 'ഇതാണ് നമ്മുടെ മലയാളി വൈബ് - കേരള ഹൃദയം, നമ്മുടെ അഭിമാനം! 🌴⛵💚',
  'Desi Style': 'अपनी मिट्टी, अपनी वाइब - दिल से देसी, रूह से हिंदुस्तानी! 🇮🇳❤️',
  'Gen Z Style': 'They copy, we create trends 💅✨🔥',
  'Professional Style': 'Excellence isn\'t an act, it\'s our habit. 📈💼❤️',
  'Rajasthani Style': 'म्हारी राजस्थानी शान - धोरों का दिल, वीरों की धरती! 🐪👑❤️',
  'Bihari Style': 'ई बा हमार बिहारी अंदाज़ - सादगी में महानता! 💪🌾❤️',
  'Haryanvi Style': 'म्हारी हरयाणवी की बात न्यारी - ताकत और सच्चाई का दम! 🔥🥛💪',
  'UP Style': 'बनारसी पान वाली बात - गंगा-जमुनी तहज़ीब, दिल से उत्तर प्रदेशी! 🙏🕉️❤️',
  'Kashmiri Style': 'یہ ہماری کشمیری وائب ہے یار - जन्नत का दिल, कश्मीर की रूह! 🏔️🌷❤️',
  'Assamese Style': 'এইটোৱেই আমাৰ অসমীয়া ভাইব - ব্ৰহ্মপুত্ৰৰ বুকুত, অসমৰ হৃদয়ত! 🦏🍵❤️',
  'Odia Style': 'ଏହା ଆମର ଓଡ଼ିଆ ଷ୍ଟାଇଲ୍ - ଜଗନ୍ନାଥଙ୍କ ଆଶୀର୍ବାଦ, ଓଡ଼ିଶାର ଗର୍ବ! 🏖️🦀❤️'
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { subject, mood, vibe, hashtags, variants, customNote, userEmail } = req.body

  if (!subject || !mood) {
    return res.status(400).json({ error: 'Subject and mood required' })
  }

  try {
    // Get user and check quota
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', userEmail)
      .single()

    if (userError || !user) {
      return res.status(401).json({ error: 'User not found' })
    }

    // Check quota
    if (user.quota_used >= user.quota_total) {
      return res.status(403).json({ 
        error: 'Quota exceeded. Upgrade your plan or wait for reset.' 
      })
    }

    // Build prompt for Gemini
    const prompt = `
Generate ${variants} unique Instagram captions for the following:

Subject: ${subject}
Mood/Tone: ${mood}
${customNote ? `Additional notes: ${customNote}` : ''}

Requirements:
- Creative and engaging
- ${hashtags ? 'Include 5-8 relevant trending hashtags at the end' : 'No hashtags'}
- Each caption should be different
- Use emojis appropriately
- Length: 100-150 characters
- Match the ${mood} mood perfectly

${vibe && vibeLines[vibe] ? `\nIMPORTANT: Add this belonging line at the very end of each caption:\n"${vibeLines[vibe]}"` : ''}

Return ONLY the captions as a JSON array. Format:
["caption 1", "caption 2", "caption 3"]
`

    // Call Gemini API
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse response
    let captions
    try {
      // Try to extract JSON array
      const jsonMatch = text.match(/\[.*\]/s)
      if (jsonMatch) {
        captions = JSON.parse(jsonMatch[0])
      } else {
        // Fallback: split by newlines
        captions = text.split('\n').filter(line => line.trim() && !line.startsWith('{') && !line.startsWith('['))
      }
    } catch (parseError) {
      // If JSON parsing fails, split by newlines
      captions = text.split('\n').filter(line => line.trim()).slice(0, parseInt(variants))
    }

    // Update user quota
    await supabase
      .from('users')
      .update({ 
        quota_used: user.quota_used + 1 
      })
      .eq('email', userEmail)

    // Log generation
    await supabase
      .from('generations')
      .insert([{
        user_email: userEmail,
        subject: subject,
        mood: mood,
        vibe: vibe,
        captions: captions,
        created_at: new Date().toISOString()
      }])

    return res.status(200).json({
      success: true,
      captions: captions,
      remaining: user.quota_total - user.quota_used - 1
    })

  } catch (error) {
    console.error('Generation error:', error)
    return res.status(500).json({ 
      error: 'Failed to generate captions. Please try again.' 
    })
  }
}
