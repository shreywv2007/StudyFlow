import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';
interface LandingProps {
  onNavigate: (page: string) => void;
}
export function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
            StudyFlow
          </span>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => onNavigate('signup')}>
            Log In
          </Button>
          <Button onClick={() => onNavigate('signup')}>Get Started</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 lg:pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{
              opacity: 0,
              x: -50
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
              Study smarter, <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500">
                not harder.
              </span>
            </h1>
            <p className="text-xl text-gray-500 mb-8 max-w-lg">
              Crush your goals with the all-in-one productivity workspace. Track
              grades, deadlines, and stay on top of your studies. 💅
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => onNavigate('signup')}
                rightIcon={<ArrowRight className="w-5 h-5" />}>

                Start for Free
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-2 text-gray-400">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Free Forever</span>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              rotate: 5
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0
            }}
            transition={{
              duration: 0.8,
              delay: 0.2
            }}
            className="relative">

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -20, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: 'easeInOut'
              }}
              className="absolute -top-12 -right-4 z-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-100">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                  🎉
                </div>
                <div>
                  <p className="text-sm text-gray-500">GPA Goal</p>
                  <p className="text-lg font-bold text-gray-900">
                    4.0 Achieved!
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 20, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: 'easeInOut',
                delay: 1
              }}
              className="absolute -bottom-8 -left-8 z-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-100">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
                  🔥
                </div>
                <div>
                  <p className="text-sm text-gray-500">Study Streak</p>
                  <p className="text-lg font-bold text-gray-900">12 Days</p>
                </div>
              </div>
            </motion.div>

            {/* Main Image Card */}
            <div className="relative z-10 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-3xl p-4 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-[4/3] flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-fuchsia-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Zap className="w-10 h-10 text-fuchsia-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Focus Mode
                  </h3>
                  <p className="text-gray-500">25:00</p>
                </div>
              </div>
            </div>

            {/* Background Blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-violet-300/30 via-fuchsia-300/30 to-orange-300/30 blur-3xl rounded-full -z-10" />
          </motion.div>
        </div>
      </main>
    </div>);

}