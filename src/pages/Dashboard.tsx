import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  CheckCircle2,
  Clock,
  BookOpen,
  Flame,
  Plus,
  ArrowRight } from
'lucide-react';
interface DashboardProps {
  onNavigate: (page: string) => void;
}
export function Dashboard({ onNavigate }: DashboardProps) {
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const item = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0
    }
  };
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Good Morning, Alex! ☀️
          </h1>
          <p className="text-gray-500">
            You've got this. Let's crush some goals today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" leftIcon={<Plus className="w-4 h-4" />}>
            New Task
          </Button>
          <Button
            leftIcon={<Clock className="w-4 h-4" />}
            onClick={() => onNavigate('planner')}>

            Start Focus
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tasks Done"
          value="12"
          subtitle="+3 today"
          icon={<CheckCircle2 className="w-6 h-6" />}
          gradient="from-violet-500 to-purple-600"
          delay={0} />

        <StatCard
          title="Study Hours"
          value="24.5"
          subtitle="This week"
          icon={<Clock className="w-6 h-6" />}
          gradient="from-pink-500 to-rose-500"
          delay={0.1} />

        <StatCard
          title="Current GPA"
          value="3.8"
          subtitle="Top 10%"
          icon={<BookOpen className="w-6 h-6" />}
          gradient="from-orange-400 to-amber-500"
          delay={0.2} />

        <StatCard
          title="Day Streak"
          value="7"
          subtitle="Keep it up!"
          icon={<Flame className="w-6 h-6" />}
          gradient="from-cyan-400 to-blue-500"
          delay={0.3} />

      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Up Next</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('deadlines')}>

              View All
            </Button>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4">

            {[
            {
              title: 'Calculus Midterm Prep',
              due: 'Today, 2:00 PM',
              tag: 'Urgent',
              color: 'red'
            },
            {
              title: 'History Essay Draft',
              due: 'Tomorrow',
              tag: 'High',
              color: 'orange'
            },
            {
              title: 'Physics Lab Report',
              due: 'Friday',
              tag: 'Medium',
              color: 'yellow'
            }].
            map((task, idx) =>
            <motion.div key={idx} variants={item}>
                <Card
                className="p-4 flex items-center justify-between group cursor-pointer"
                hoverEffect>

                  <div className="flex items-center gap-4">
                    <div
                    className={`w-3 h-3 rounded-full bg-${task.color}-500`} />

                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-fuchsia-600 transition-colors">
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-500">{task.due}</p>
                    </div>
                  </div>
                  <span
                  className={`px-3 py-1 rounded-full text-xs font-medium bg-${task.color}-50 text-${task.color}-600`}>

                    {task.tag}
                  </span>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Quick Actions / Motivation */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Daily Vibes</h2>
          <Card className="p-6 bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white border-none">
            <div className="mb-4">
              <span className="text-4xl">🎯</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Focus Tip</h3>
            <p className="text-white/90 text-sm mb-4">
              Try the Pomodoro technique today! 25 mins work, 5 mins break. It's
              a game changer.
            </p>
            <Button
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-none w-full justify-between"
              onClick={() => onNavigate('planner')}
              rightIcon={<ArrowRight className="w-4 h-4" />}>

              Start Timer
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Course Progress</h3>
            <div className="space-y-4">
              {[
              {
                name: 'Calculus II',
                progress: 75,
                color: 'bg-violet-500'
              },
              {
                name: 'Art History',
                progress: 40,
                color: 'bg-pink-500'
              },
              {
                name: 'Comp Sci',
                progress: 90,
                color: 'bg-orange-500'
              }].
              map((course, idx) =>
              <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">
                      {course.name}
                    </span>
                    <span className="text-gray-500">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                    initial={{
                      width: 0
                    }}
                    animate={{
                      width: `${course.progress}%`
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.5
                    }}
                    className={`h-full ${course.color}`} />

                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>);

}