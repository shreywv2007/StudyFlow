import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressRing } from '../components/ui/ProgressRing';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';
export function StudyPlanner() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [sessions, setSessions] = useState(0);
  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (mode === 'focus') {
        setSessions((s) => s + 1);
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('focus');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);
  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setMode('focus');
    setTimeLeft(25 * 60);
  };
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  const progress =
  ((mode === 'focus' ? 25 * 60 : 5 * 60) - timeLeft) / (
  mode === 'focus' ? 25 * 60 : 5 * 60) *
  100;
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Focus Timer ⏱️
        </h1>
        <p className="text-gray-500">
          Stay productive with the Pomodoro technique.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-center">
          <div className="relative mb-8">
            <motion.div
              animate={
              isActive ?
              {
                scale: [1, 1.02, 1]
              } :
              {}
              }
              transition={{
                repeat: Infinity,
                duration: 2
              }}>

              <ProgressRing
                progress={progress}
                size={300}
                strokeWidth={12}
                color={mode === 'focus' ? '#8B5CF6' : '#10B981'}
                showValue={false} />

            </motion.div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className={`text-6xl font-bold tabular-nums ${mode === 'focus' ? 'text-violet-600' : 'text-emerald-500'}`}>

                {formatTime(timeLeft)}
              </span>
              <span className="text-gray-500 font-medium mt-2 uppercase tracking-widest text-sm">
                {mode === 'focus' ? 'Focus Time' : 'Break Time'}
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              size="lg"
              onClick={toggleTimer}
              className={
              mode === 'break' ? 'bg-emerald-500 hover:bg-emerald-600' : ''
              }
              leftIcon={
              isActive ?
              <Pause className="w-5 h-5" /> :

              <Play className="w-5 h-5" />

              }>

              {isActive ? 'Pause' : 'Start'}
            </Button>
            <Button variant="secondary" size="lg" onClick={resetTimer}>
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6" gradientBorder>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-violet-100 text-violet-600">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Sessions Completed</h3>
                <p className="text-gray-500">Today's Progress</p>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-gray-900">
                {sessions}
              </span>
              <span className="text-gray-500 mb-1">/ 8 goal</span>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Timer Settings</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Focus Duration</span>
                <span className="font-medium bg-gray-100 px-3 py-1 rounded-lg">
                  25 min
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Short Break</span>
                <span className="font-medium bg-gray-100 px-3 py-1 rounded-lg">
                  5 min
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Long Break</span>
                <span className="font-medium bg-gray-100 px-3 py-1 rounded-lg">
                  15 min
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>);

}