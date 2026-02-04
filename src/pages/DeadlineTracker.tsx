import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Plus, Trash2, CheckCircle2, Circle, Calendar } from 'lucide-react';
interface Task {
  id: string;
  title: string;
  date: string;
  urgency: 'overdue' | 'today' | 'week' | 'later';
  completed: boolean;
}
export function DeadlineTracker() {
  const [tasks, setTasks] = useState<Task[]>([
  {
    id: '1',
    title: 'Calculus Midterm',
    date: '2023-11-15',
    urgency: 'overdue',
    completed: false
  },
  {
    id: '2',
    title: 'History Essay',
    date: '2023-11-20',
    urgency: 'today',
    completed: false
  },
  {
    id: '3',
    title: 'Physics Lab',
    date: '2023-11-25',
    urgency: 'week',
    completed: false
  },
  {
    id: '4',
    title: 'Art Project',
    date: '2023-12-01',
    urgency: 'later',
    completed: false
  }]
  );
  const [newTask, setNewTask] = useState('');
  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      date: new Date().toISOString().split('T')[0],
      urgency: 'week',
      completed: false
    };
    setTasks([task, ...tasks]);
    setNewTask('');
  };
  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) =>
      t.id === id ?
      {
        ...t,
        completed: !t.completed
      } :
      t
      )
    );
  };
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'overdue':
        return 'from-red-500 to-rose-600';
      case 'today':
        return 'from-orange-500 to-amber-600';
      case 'week':
        return 'from-yellow-400 to-amber-500';
      case 'later':
        return 'from-green-500 to-emerald-600';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Deadline Tracker 📅
          </h1>
          <p className="text-gray-500">Stay on top of your assignments.</p>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <Input
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          className="flex-1" />

        <Button onClick={addTask} leftIcon={<Plus className="w-4 h-4" />}>
          Add Task
        </Button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {tasks.map((task) =>
          <motion.div
            key={task.id}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              x: -20
            }}
            layout>

              <Card
              className={`p-4 flex items-center justify-between group ${task.completed ? 'opacity-60 bg-gray-50' : ''}`}>

                <div className="flex items-center gap-4 flex-1">
                  <button
                  onClick={() => toggleTask(task.id)}
                  className="text-gray-400 hover:text-fuchsia-500 transition-colors">

                    {task.completed ?
                  <CheckCircle2 className="w-6 h-6 text-green-500" /> :

                  <Circle className="w-6 h-6" />
                  }
                  </button>

                  <div className="flex-1">
                    <h3
                    className={`font-semibold text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>

                      {task.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{task.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {!task.completed &&
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getUrgencyColor(task.urgency)}`}>

                      {task.urgency.toUpperCase()}
                    </div>
                }
                  <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100">

                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {tasks.length === 0 &&
        <div className="text-center py-12 text-gray-400">
            <p className="text-xl">No tasks yet! 🎉</p>
            <p>Enjoy your free time.</p>
          </div>
        }
      </div>
    </div>);

}