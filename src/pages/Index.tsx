
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Brain, Phone, BookOpen } from 'lucide-react';
import { EmotionTracker } from '@/components/EmotionTracker';
import { Journal } from '@/components/Journal';
import { Chat } from '@/components/Chat';

const mentalHealthResources = [
  {
    title: "Managing Anxiety in Daily Life",
    description: "Practical techniques for coping with anxiety",
    url: "https://www.verywellmind.com/tips-to-reduce-anxiety-2584180"
  },
  {
    title: "Mindfulness Meditation Guide",
    description: "Learn how to practice mindfulness for better mental health",
    url: "https://www.mindful.org/how-to-practice-mindfulness/"
  },
  {
    title: "Building Emotional Resilience",
    description: "Strategies to strengthen your emotional well-being",
    url: "https://www.apa.org/topics/resilience"
  },
  {
    title: "Sleep Hygiene for Better Mental Health",
    description: "How quality sleep impacts your emotional state",
    url: "https://www.sleepfoundation.org/sleep-hygiene"
  },
  {
    title: "The Science of Happiness",
    description: "Understanding what contributes to well-being",
    url: "https://www.health.harvard.edu/newsletter_article/the-science-of-happiness"
  }
];

const Index = () => {
  const { toast } = useToast();

  const callHelpline = () => {
    toast({
      title: "Emergency Mental Health Support",
      description: "For immediate help, contact: National Suicide Prevention Lifeline: 988 or Crisis Text Line: Text HOME to 741741",
      duration: 10000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-50 to-purple-100 font-nunito">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              EchoMind
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your safe space for mental wellness and emotional support
          </p>
        </div>

        {/* Inspirational Quote */}
        <Card className="max-w-4xl mx-auto mb-12 bg-white/70 backdrop-blur-sm border-l-4 border-teal-500 animate-scale-in">
          <CardContent className="p-6">
            <blockquote className="text-center">
              <p className="text-lg md:text-xl text-gray-700 italic mb-4 leading-relaxed">
                "You don't have to control your thoughts. You just have to stop letting them control you."
              </p>
              <footer className="text-teal-600 font-semibold">— Dan Millman</footer>
            </blockquote>
          </CardContent>
        </Card>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-8">
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <EmotionTracker />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Journal />
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Chat />
            </div>
            
            {/* Mental Health Library */}
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Card className="bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-teal-100">
                      <BookOpen className="h-6 w-6 text-teal-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Mental Health Library</h2>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Resources curated to support your mental wellness journey:
                  </p>
                  <div className="space-y-3">
                    {mentalHealthResources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border-l-4 border-teal-500 transition-all duration-200 hover:translate-x-1"
                      >
                        <h3 className="font-semibold text-gray-800 mb-1">{resource.title}</h3>
                        <p className="text-xs text-gray-600">{resource.description}</p>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Emergency Help Button */}
        <div className="text-center mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Button
            onClick={callHelpline}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Phone className="h-5 w-5 mr-2" />
            Emergency Support: Get Immediate Help
          </Button>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-600 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="mb-2">© 2025 EchoMind. You are never alone. Your mental health matters.</p>
          <p className="text-sm italic">
            "Healing takes time, and asking for help is a courageous step." - Mariska Hargitay
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
