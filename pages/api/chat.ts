import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
  error?: string
}

// Free responses - perfect for demo without API key
const responseTemplates: { [key: string]: string[] } = {
  'video call': [
    'Step 1: Open the app on your phone or computer\nStep 2: Look for a big button that says "Video Call"\nStep 3: Type the name of the person you want to call\nStep 4: Press the green Call button\nStep 5: Wait for them to answer!\n\nTips: Make sure your camera and microphone are turned on. If they don\'t answer, try again later.',
  ],
  'cloud storage': [
    'Cloud Storage is like a safe box in the sky! Here\'s what it means:\n\n📦 What is it?\nIt\'s a place on the internet where you can save your photos, documents, and files. You don\'t need a USB drive!\n\n📱 How to use it:\n1. Take a photo on your phone\n2. The photo automatically saves to the cloud\n3. You can see it from any device - phone, tablet, or computer\n4. Even if your phone breaks, your photos are still safe!\n\n✅ Popular cloud storage: Google Photos, OneDrive, iCloud',
  ],
  'password': [
    'A Password is like the KEY to your house! Here\'s how to keep it safe:\n\n🔑 What is a password?\nIt\'s a secret code only YOU know. It protects your accounts from bad people.\n\n📝 How to make a GOOD password:\n1. Use UPPERCASE and lowercase letters\n2. Add numbers (like 123)\n3. Add special symbols (!@#$)\n4. Make it at least 12 characters long\n5. Don\'t use your birthday or name!\n\n💾 How to remember passwords:\n- Write them in a notebook (keep it safe!)\n- Or use a password manager (like 1Password or LastPass)\n- Never share your password with anyone!\n\n⚠️ Red flags:\n- Real companies NEVER ask for passwords by email\n- Don\'t tell anyone your password',
  ],
  'wifi': [
    'Wi-Fi is like invisible radio waves that bring the internet to your devices!\n\n📡 What is Wi-Fi?\nIt\'s a wireless connection that lets your phone, tablet, and computer connect to the internet without cables.\n\n🔌 How to connect:\n1. Look for a Wi-Fi symbol (looks like waves) on your device\n2. Click on it\n3. Find your home Wi-Fi name (ask your internet company or check the router box)\n4. Click on it\n5. Type the password (usually on the back of your router)\n6. Done! You\'re connected!\n\n💡 Tips:\n- Keep your Wi-Fi password somewhere safe\n- If it\'s slow, turn the router off and on again\n- If it doesn\'t work, restart your device',
  ],
  'prescription': [
    'This is a prescription medication. Here\'s what you need to know:\n\n💊 What it means:\nYour doctor prescribed this medicine to help with a specific health condition.\n\n⏰ How to take it:\n1. Take it exactly as the label says\n2. Don\'t skip doses\n3. Don\'t take more than recommended\n4. Set a phone reminder if you might forget\n\n⚠️ Important:\n- Tell your doctor about other medicines you take\n- Report any side effects immediately\n- Don\'t share this medicine with anyone\n- Store it in a cool, dry place\n\n🚨 When to call the doctor:\n- If you have serious side effects\n- If it doesn\'t seem to be helping\n- If you feel confused or dizzy\n\n💭 Questions?\nAlways ask your pharmacist or doctor!',
  ],
  'default': [
    'I\'m here to help! I can explain:\n\n💻 Technology topics: Video calls, cloud storage, passwords, Wi-Fi, email, social media, and more!\n\n🏥 Health topics: Prescriptions, medicines, medical terms, and health information\n\n✨ Just ask your question clearly and I\'ll explain it in simple words!\n\nSome popular questions I can answer:\n- "How do I video call?"\n- "What is cloud storage?"\n- "How do I create a strong password?"\n- "What is Wi-Fi?"\n- Or tell me about any prescription or health question!',
  ],
}

function getSmartResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase()

  // Check for keyword matches
  for (const [keyword, responses] of Object.entries(responseTemplates)) {
    if (lowerPrompt.includes(keyword)) {
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }

  // If no match, return default helpful response
  return responseTemplates['default'][0]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed', error: 'Use POST' })
  }

  try {
    const { prompt } = req.body

    if (!prompt) {
      return res.status(400).json({ message: 'Missing prompt', error: 'Prompt is required' })
    }

    // Get smart response without needing API
    const message = getSmartResponse(prompt)

    // Add small delay to feel more realistic
    await new Promise(resolve => setTimeout(resolve, 500))

    return res.status(200).json({ message })
  } catch (error: any) {
    console.error('Error:', error)
    return res.status(500).json({
      message: 'Error processing request',
      error: error.message || 'Unknown error',
    })
  }
}
