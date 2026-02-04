import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Smile, Frown, Meh, Sun, Moon, Coffee } from 'lucide-react';
export function Wellbeing() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const moods = [
  {
    icon: <Smile className="w-8 h-8" />,
    label: 'Great',
    color: 'text-green-500 bg-green-50'
  },
  {
    icon: <Meh className="w-8 h-8" />,
    label: 'Okay',
    color: 'text-yellow-500 bg-yellow-50'
  },
  {
    icon: <Frown className="w-8 h-8" />,
    label: 'Tough',
    color: 'text-blue-500 bg-blue-50'
  }];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Wellness Check-in 🌿
        </h1>
        <p className="text-gray-500">How are you feeling today?</p>
      </div>

      <div className="flex justify-center gap-6 mb-12">
        {moods.map((mood) =>
        <motion.button
          key={mood.label}
          whileHover={{
            scale: 1.1
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={() => setSelectedMood(mood.label)}
          className={`p-6 rounded-2xl flex flex-col items-center gap-3 transition-all ${selectedMood === mood.label ? 'ring-4 ring-fuchsia-200 shadow-xl scale-110' : 'hover:shadow-lg bg-white'} ${selectedMood === mood.label ? mood.color : 'text-gray-400 bg-white'}`}>

            {mood.icon}
            <span className="font-medium">{mood.label}</span>
          </motion.button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6" gradientBorder>
          <h3 className="font-bold text-lg mb-4">Daily Tips</h3>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold">Morning Routine</h4>
                <p className="text-sm text-gray-500">
                  Start with a glass of water and 5 mins of stretching.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold">Sleep Hygiene</h4>
                <p className="text-sm text-gray-500">
                  Avoid screens 1 hour before bed for better rest.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold">Caffeine Cut-off</h4>
                <p className="text-sm text-gray-500">
                  Try to stop caffeine intake after 2 PM.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none flex flex-col justify-center text-center">
          <h3 className="text-2xl font-bold mb-4">Need a break?</h3>
          <p className="mb-8 opacity-90">
            Take a moment to breathe. Inhale for 4 seconds, hold for 7, exhale
            for 8.
          </p>
          <Button className="bg-white text-indigo-600 hover:bg-indigo-50 border-none self-center">
            Start Breathing Exercise
          </Button>
        </Card>
      </div>
    </div>);

}