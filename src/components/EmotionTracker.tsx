
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Cloud, Smile, Meh, Flushed, SadTear, Tired } from 'lucide-react';

interface EmotionData {
  name: string;
  icon: React.ReactNode;
  gradient: string;
  height: number;
}

const emotionData: Record<string, EmotionData> = {
  happy: {
    name: "Happy",
    icon: <Smile className="h-8 w-8" />,
    gradient: "from-pink-400 to-pink-300",
    height: 90
  },
  calm: {
    name: "Calm",
    icon: <Meh className="h-8 w-8" />,
    gradient: "from-blue-400 to-blue-300",
    height: 70
  },
  anxious: {
    name: "Anxious",
    icon: <Flushed className="h-8 w-8" />,
    gradient: "from-orange-400 to-orange-300",
    height: 50
  },
  sad: {
    name: "Sad",
    icon: <SadTear className="h-8 w-8" />,
    gradient: "from-purple-400 to-purple-300",
    height: 40
  },
  tired: {
    name: "Tired",
    icon: <Tired className="h-8 w-8" />,
    gradient: "from-indigo-400 to-pink-400",
    height: 60
  }
};

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const EmotionTracker = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [emotionLog, setEmotionLog] = useState<(string | null)[]>(Array(7).fill(null));
  const { toast } = useToast();

  useEffect(() => {
    const todayDate = new Date().toISOString().split('T')[0];
    const lastUpdatedDate = localStorage.getItem('lastUpdatedDate');
    let savedLog = JSON.parse(localStorage.getItem('emotionLog') || '[null,null,null,null,null,null,null]');

    if (lastUpdatedDate !== todayDate) {
      // Shift log and add new slot for today
      savedLog.shift();
      savedLog.push(null);
      localStorage.setItem('lastUpdatedDate', todayDate);
      localStorage.setItem('emotionLog', JSON.stringify(savedLog));
    }

    setEmotionLog(savedLog);
    setSelectedEmotion(savedLog[6]); // Today's emotion
  }, []);

  const selectEmotion = (emotion: string) => {
    const newLog = [...emotionLog];
    newLog[6] = emotion; // Update today's emotion (last slot)
    
    setEmotionLog(newLog);
    setSelectedEmotion(emotion);
    
    localStorage.setItem('emotionLog', JSON.stringify(newLog));
    
    toast({
      title: `Feeling ${emotionData[emotion].name} today`,
      description: "Your emotion has been recorded. Take care of yourself! 💙",
    });
  };

  const getChartData = () => {
    const today = new Date();
    return emotionLog.map((emotion, index) => {
      const date = new Date();
      date.setDate(today.getDate() - (6 - index));
      
      return {
        day: daysOfWeek[date.getDay()],
        emotion,
        height: emotion ? emotionData[emotion].height : 10,
        gradient: emotion ? emotionData[emotion].gradient : 'from-gray-300 to-gray-200'
      };
    });
  };

  return (
    <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
          <div className="p-2 rounded-full bg-teal-100">
            <Cloud className="h-6 w-6 text-teal-600" />
          </div>
          Emotion Tracker
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Track your emotional state over time. Select how you're feeling today:
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {Object.entries(emotionData).map(([key, data]) => (
            <button
              key={key}
              onClick={() => selectEmotion(key)}
              className={`
                relative flex flex-col items-center justify-center p-4 rounded-full
                bg-gradient-to-br ${data.gradient} text-white
                transition-all duration-300 hover:scale-110 hover:shadow-lg
                ${selectedEmotion === key ? 'scale-110 ring-4 ring-white shadow-xl' : ''}
                aspect-square min-h-[80px]
              `}
            >
              {data.icon}
              <span className="text-xs font-semibold mt-1">{data.name}</span>
            </button>
          ))}
        </div>

        <div className="pt-4">
          <h3 className="text-center text-sm font-semibold text-gray-700 mb-4">
            Your emotional pattern this week:
          </h3>
          <div className="flex justify-center items-end gap-2 h-32 px-4">
            {getChartData().map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div
                  className={`w-8 rounded-t-lg bg-gradient-to-t ${item.gradient} transition-all duration-500`}
                  style={{ height: `${item.height}px` }}
                />
                <span className="text-xs font-semibold text-gray-600">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
