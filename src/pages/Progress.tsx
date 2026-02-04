import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Trophy, Flame, Target, TrendingUp } from 'lucide-react';
export function Progress() {
  const studyData = [
  {
    day: 'M',
    hours: 4
  },
  {
    day: 'T',
    hours: 6
  },
  {
    day: 'W',
    hours: 3
  },
  {
    day: 'T',
    hours: 8
  },
  {
    day: 'F',
    hours: 5
  },
  {
    day: 'S',
    hours: 2
  },
  {
    day: 'S',
    hours: 7
  }];

  const maxHours = Math.max(...studyData.map((d) => d.hours));
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Progress 🚀</h1>
        <p className="text-gray-500">Look how far you've come!</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-orange-400 to-pink-500 text-white border-none">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Flame className="w-8 h-8" />
            </div>
            <div>
              <p className="text-white/80 font-medium">Current Streak</p>
              <h3 className="text-3xl font-bold">12 Days</h3>
            </div>
          </div>
          <div className="flex gap-1">
            {[...Array(7)].map((_, i) =>
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${i < 5 ? 'bg-white' : 'bg-white/30'}`} />

            )}
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-violet-500 to-purple-600 text-white border-none">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <p className="text-white/80 font-medium">Total XP</p>
              <h3 className="text-3xl font-bold">2,450</h3>
            </div>
          </div>
          <p className="text-sm text-white/80">Next level in 550 XP</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-cyan-400 to-blue-500 text-white border-none">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Target className="w-8 h-8" />
            </div>
            <div>
              <p className="text-white/80 font-medium">Goals Met</p>
              <h3 className="text-3xl font-bold">85%</h3>
            </div>
          </div>
          <p className="text-sm text-white/80">You're crushing it!</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-fuchsia-500" />
            Study Hours Activity
          </h3>
          <div className="h-64 flex items-end justify-between gap-3 px-2">
            {studyData.map((item, i) => {
              const heightPercent = item.hours / maxHours * 100;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 flex-1 group">

                  <div className="relative w-full h-48 flex items-end">
                    <motion.div
                      initial={{
                        height: 0
                      }}
                      animate={{
                        height: `${heightPercent}%`
                      }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: 'easeOut'
                      }}
                      className="w-full bg-gradient-to-t from-fuchsia-500 to-violet-400 rounded-t-lg relative group-hover:from-fuchsia-600 group-hover:to-violet-500 transition-colors cursor-pointer">

                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item.hours}h
                      </div>
                    </motion.div>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">
                    {item.day}
                  </span>
                </div>);

            })}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm text-gray-500">
            <span>
              Total: {studyData.reduce((acc, d) => acc + d.hours, 0)}h this week
            </span>
            <span className="text-fuchsia-600 font-medium">
              +15% vs last week
            </span>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-gray-900 mb-6">Recent Achievements</h3>
          <div className="space-y-4">
            {[
            {
              title: 'Early Bird',
              desc: 'Completed a task before 8am',
              icon: '🌅',
              color: 'bg-orange-100'
            },
            {
              title: 'Focus Master',
              desc: '4 Pomodoro sessions in a row',
              icon: '🧠',
              color: 'bg-violet-100'
            },
            {
              title: 'Task Slayer',
              desc: 'Completed 10 tasks in one day',
              icon: '⚔️',
              color: 'bg-red-100'
            }].
            map((ach, i) =>
            <motion.div
              key={i}
              initial={{
                x: 20,
                opacity: 0
              }}
              animate={{
                x: 0,
                opacity: 1
              }}
              transition={{
                delay: i * 0.1
              }}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">

                <div
                className={`w-12 h-12 rounded-full ${ach.color} flex items-center justify-center text-2xl`}>

                  {ach.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{ach.title}</h4>
                  <p className="text-sm text-gray-500">{ach.desc}</p>
                </div>
              </motion.div>
            )}
          </div>
        </Card>
      </div>
    </div>);

}