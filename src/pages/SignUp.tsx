import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';
interface SignUpProps {
  onNavigate: (page: string) => void;
}
export function SignUp({ onNavigate }: SignUpProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleNext = () => {
    if (step < 3) setStep(step + 1);else
    handleSubmit();
  };
  const handleBack = () => {
    if (step > 1) setStep(step - 1);else
    onNavigate('landing');
  };
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNavigate('dashboard');
    }, 1500);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Join StudyFlow 🚀
          </h2>
          <p className="text-gray-500">Let's get your workspace ready.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between mb-8 px-4">
          {[1, 2, 3].map((i) =>
          <div
            key={i}
            className="flex-1 mx-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">

              <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
              initial={{
                width: '0%'
              }}
              animate={{
                width: i <= step ? '100%' : '0%'
              }}
              transition={{
                duration: 0.3
              }} />

            </div>
          )}
        </div>

        <Card className="p-8" gradientBorder>
          <AnimatePresence mode="wait">
            {step === 1 &&
            <motion.div
              key="step1"
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -20
              }}
              className="space-y-4">

                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold">Who are you?</h3>
                </div>
                <Input
                label="Full Name"
                placeholder="e.g. Alex Chen"
                icon={<User className="w-5 h-5" />} />

                <Input
                label="Username"
                placeholder="@study_guru"
                icon={<User className="w-5 h-5" />} />

              </motion.div>
            }

            {step === 2 &&
            <motion.div
              key="step2"
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -20
              }}
              className="space-y-4">

                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold">Secure your account</h3>
                </div>
                <Input
                label="Email"
                type="email"
                placeholder="alex@university.edu"
                icon={<Mail className="w-5 h-5" />} />

                <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-5 h-5" />} />

              </motion.div>
            }

            {step === 3 &&
            <motion.div
              key="step3"
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -20
              }}
              className="space-y-6 text-center">

                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-4xl">
                  ✨
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    You're all set!
                  </h3>
                  <p className="text-gray-500">
                    Ready to start your productivity journey?
                  </p>
                </div>
              </motion.div>
            }
          </AnimatePresence>

          <div className="flex gap-3 mt-8">
            <Button variant="secondary" onClick={handleBack} className="flex-1">
              {step === 1 ? 'Cancel' : 'Back'}
            </Button>
            <Button onClick={handleNext} className="flex-1" isLoading={loading}>
              {step === 3 ? 'Launch App' : 'Next'}
            </Button>
          </div>
        </Card>

        <p className="text-center mt-6 text-sm text-gray-500">
          Already have an account?{' '}
          <button className="text-fuchsia-600 font-medium hover:underline">
            Log in
          </button>
        </p>
      </div>
    </div>);

}