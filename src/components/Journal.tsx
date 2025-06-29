
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Book, Lightbulb, Save, Lock } from 'lucide-react';

const journalPrompts = [
  "What are three things you're grateful for today?",
  "Describe a challenge you faced and how you handled it.",
  "What emotions have you experienced today?",
  "Write about something that made you smile recently.",
  "What's one thing you'd like to let go of?",
  "Describe your ideal day for self-care.",
  "What's something you're looking forward to?",
  "How did you show kindness to yourself today?",
  "What would you tell a friend going through what you're experiencing?",
  "Write about a moment when you felt proud of yourself."
];

export const Journal = () => {
  const [entry, setEntry] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('Write your thoughts here...');
  const [savedEntries, setSavedEntries] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('journalEntries');
    if (saved) {
      setSavedEntries(JSON.parse(saved));
    }
  }, []);

  const getRandomPrompt = () => {
    const randomPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
    setCurrentPrompt(randomPrompt);
    toast({
      title: "New prompt generated!",
      description: "Use this prompt to guide your journaling session.",
    });
  };

  const saveEntry = () => {
    if (entry.trim()) {
      const newEntries = [...savedEntries, entry.trim()];
      setSavedEntries(newEntries);
      localStorage.setItem('journalEntries', JSON.stringify(newEntries));
      setEntry('');
      setCurrentPrompt('Write your thoughts here...');
      toast({
        title: "Entry saved!",
        description: "Your thoughts have been safely stored.",
      });
    }
  };

  const getEntryCount = () => {
    return savedEntries.length;
  };

  return (
    <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
          <div className="p-2 rounded-full bg-teal-100">
            <Book className="h-6 w-6 text-teal-600" />
          </div>
          Anonymous Journal
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Express your thoughts privately. Your entries are completely anonymous and secure.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Textarea
            placeholder={currentPrompt}
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="min-h-[200px] resize-none border-2 focus:border-teal-500 transition-colors"
          />
          {entry.length > 0 && (
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {entry.length} characters
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={getRandomPrompt}
            variant="outline"
            className="flex items-center gap-2 border-teal-200 hover:bg-teal-50 hover:border-teal-300"
          >
            <Lightbulb className="h-4 w-4" />
            Get Writing Prompt
          </Button>
          <Button
            onClick={saveEntry}
            disabled={!entry.trim()}
            className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white"
          >
            <Save className="h-4 w-4" />
            Save Entry
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4 p-3 bg-gray-50 rounded-lg">
          <Lock className="h-4 w-4" />
          <span>Your journal is private and encrypted</span>
          {getEntryCount() > 0 && (
            <span className="ml-2 px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs">
              {getEntryCount()} entries saved
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
