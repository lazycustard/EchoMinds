
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Comments, Book } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const echoResponses = {
  greetings: [
    "Hello! I'm Echo, your mental wellness companion. How are you feeling today?",
    "Hi there! I'm here to listen and support you. What's on your mind?",
    "Welcome back! I'm glad you're here. How can I help you today?"
  ],
  emotions: {
    sad: [
      "I'm here for you. It's okay to feel this way. Would you like to share what's been troubling you?",
      "I hear that you're going through a difficult time. Your feelings are valid, and I'm here to listen.",
      "It's brave of you to acknowledge these feelings. Sometimes talking about what's bothering us can help."
    ],
    happy: [
      "That's wonderful to hear! Celebrating the good moments is important. What's bringing you joy today?",
      "I love hearing about the positive things in your life! What made today special?",
      "It's beautiful when we can recognize and appreciate the good moments. Tell me more!"
    ],
    anxious: [
      "I understand. Anxiety can be overwhelming. Let's try a breathing exercise together: Breathe in for 4 seconds, hold for 4, exhale for 6. Repeat 3 times.",
      "Anxiety is challenging, but you're not alone in this. What specific thoughts or situations are contributing to these feelings?",
      "When anxiety hits, grounding techniques can help. Try naming 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste."
    ],
    tired: [
      "Your body might be telling you it needs rest. Remember to prioritize self-care. How have you been sleeping lately?",
      "Feeling exhausted can be draining. Are you getting enough quality sleep? Sometimes our minds need rest as much as our bodies.",
      "Fatigue can affect our emotional well-being too. What does your typical day look like? Are you taking breaks?"
    ],
    alone: [
      "Feeling alone can be really difficult. You're not alone in this feeling though. Would you like to explore ways to connect with others?",
      "Loneliness is a common human experience, but it doesn't have to define you. What activities or people usually help you feel more connected?",
      "I'm here with you right now. Sometimes reaching out, like you're doing now, is the first step to feeling less alone."
    ]
  },
  general: [
    "Thank you for sharing that with me. I'm here to listen without judgment. How else can I support you today?",
    "I appreciate you opening up. Your thoughts and feelings matter. What would be most helpful for you right now?",
    "It takes courage to express yourself. I'm here to support you through whatever you're experiencing."
  ],
  resources: [
    "Based on what you've shared, you might find our Mental Health Library helpful. There are some great resources there.",
    "Have you tried journaling about these feelings? Sometimes writing can help us process our thoughts.",
    "Remember that seeking professional help is always an option if you need additional support."
  ]
};

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Echo, your mental wellness companion. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getEchoResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return echoResponses.greetings[Math.floor(Math.random() * echoResponses.greetings.length)];
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('depressed') || lowerMessage.includes('cry')) {
      return echoResponses.emotions.sad[Math.floor(Math.random() * echoResponses.emotions.sad.length)];
    }
    
    if (lowerMessage.includes('happy') || lowerMessage.includes('joy') || lowerMessage.includes('good') || lowerMessage.includes('great')) {
      return echoResponses.emotions.happy[Math.floor(Math.random() * echoResponses.emotions.happy.length)];
    }
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('stress') || lowerMessage.includes('worried')) {
      return echoResponses.emotions.anxious[Math.floor(Math.random() * echoResponses.emotions.anxious.length)];
    }
    
    if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted') || lowerMessage.includes('fatigue')) {
      return echoResponses.emotions.tired[Math.floor(Math.random() * echoResponses.emotions.tired.length)];
    }
    
    if (lowerMessage.includes('alone') || lowerMessage.includes('lonely') || lowerMessage.includes('isolated')) {
      return echoResponses.emotions.alone[Math.floor(Math.random() * echoResponses.emotions.alone.length)];
    }
    
    // Occasionally suggest resources
    if (Math.random() > 0.7) {
      return echoResponses.resources[Math.floor(Math.random() * echoResponses.resources.length)];
    }
    
    return echoResponses.general[Math.floor(Math.random() * echoResponses.general.length)];
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getEchoResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
          <div className="p-2 rounded-full bg-teal-100">
            <Comments className="h-6 w-6 text-teal-600" />
          </div>
          Talk to Echo
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Share your thoughts with Echo, your compassionate AI companion.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-80 overflow-y-auto p-4 bg-blue-50/50 rounded-lg border">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 p-3 rounded-2xl max-w-[80%] ${
                message.sender === 'user'
                  ? 'ml-auto bg-blue-100 text-gray-800'
                  : 'mr-auto bg-green-100 text-teal-800'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <span className="text-xs text-gray-500 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          {isTyping && (
            <div className="mr-auto bg-green-100 text-teal-800 p-3 rounded-2xl max-w-[80%] mb-4">
              <div className="flex items-center gap-1">
                <span className="text-sm">Echo is typing</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-teal-600 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-teal-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-1 bg-teal-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex gap-2">
          <Input
            placeholder="Share your thoughts with me..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border-2 focus:border-teal-500"
            disabled={isTyping}
          />
          <Button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6"
          >
            Send
          </Button>
        </div>
        
        <div className="text-center text-xs text-gray-500 mt-2">
          Echo provides emotional support but is not a replacement for professional therapy
        </div>
      </CardContent>
    </Card>
  );
};
