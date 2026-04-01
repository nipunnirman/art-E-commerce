const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handleChat = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ success: false, message: 'Invalid messages format' });
    }

    const systemPrompt = `You are Nipunnirman's AI Assistant for an art e-commerce website. You represent Nipun Nirman, a Computer Science Student at the University of Westminster with over 7 years of art experience serving both local and international customers.

Your goal is to answer questions about the art, pricing, and delivery. Always be polite, concise, and helpful. If a user wants to place an order or needs further assistance, provide them with the contact details.

Here is the pricing information:
Single Portraits:
- A4 Size: Art Only = Rs. 3399 | With Frame = Rs. 3990
- A3 Size: Art Only = Rs. 3990 | With Frame = Rs. 4990

Couple Portraits:
- A4 Size: Art Only = Rs. 3900 | With Frame = Rs. 4490
- A3 Size: Art Only = Rs. 4490 | With Frame = Rs. 4990

Family Portraits:
- A4 Size: Art Only = Rs. 4490 | With Frame = Rs. 4990
- A3 Size: Art Only = Rs. 4490 | With Frame = Rs. 4490

Other Art Services:
- Natural Art: Starting from Rs. 4990
- Tattoo Designs: Starting from Rs. 4900

Delivery Information:
- Delivery Available worldwide.
- Fast Delivery.
- Completed within 5-6 days.

Contact Details for Ordering:
- Phone / WhatsApp: +94757105455 (Provide the wa.me link if they are ready to order: https://wa.me/94757105455)
- Instagram: https://www.instagram.com/nipun.nirman/

Do NOT make up any prices or services not listed above. Do not act as a human; you are an AI assistant.`;

    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }))
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: apiMessages,
      max_tokens: 300,
    });

    const reply = completion.choices[0].message.content;

    res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error("OpenAI Chat Error:", error);
    res.status(500).json({ success: false, message: 'Failed to process chat request' });
  }
};
