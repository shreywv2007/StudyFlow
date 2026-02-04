import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Plus, Trash2, Calculator } from 'lucide-react';
interface Course {
  id: string;
  name: string;
  grade: number;
  credits: number;
}
export function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
  {
    id: '1',
    name: 'Calculus II',
    grade: 4.0,
    credits: 4
  },
  {
    id: '2',
    name: 'Physics I',
    grade: 3.7,
    credits: 4
  },
  {
    id: '3',
    name: 'English Comp',
    grade: 3.3,
    credits: 3
  }]
  );
  const [newCourse, setNewCourse] = useState({
    name: '',
    grade: '',
    credits: ''
  });
  const addCourse = () => {
    if (!newCourse.name || !newCourse.grade || !newCourse.credits) return;
    setCourses([
    ...courses,
    {
      id: Date.now().toString(),
      name: newCourse.name,
      grade: parseFloat(newCourse.grade),
      credits: parseInt(newCourse.credits)
    }]
    );
    setNewCourse({
      name: '',
      grade: '',
      credits: ''
    });
  };
  const removeCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };
  const calculateGPA = () => {
    const totalPoints = courses.reduce(
      (acc, curr) => acc + curr.grade * curr.credits,
      0
    );
    const totalCredits = courses.reduce((acc, curr) => acc + curr.credits, 0);
    return totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2);
  };
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            GPA Calculator 🎓
          </h1>
          <p className="text-gray-500">Track your academic success.</p>
        </div>
        <Card className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none">
          <span className="text-sm opacity-90 block">Cumulative GPA</span>
          <span className="text-3xl font-bold">{calculateGPA()}</span>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Add Course</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Input
                placeholder="Course Name"
                value={newCourse.name}
                onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  name: e.target.value
                })
                } />

              <Input
                placeholder="Grade (0-4.0)"
                type="number"
                value={newCourse.grade}
                onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  grade: e.target.value
                })
                } />

              <Input
                placeholder="Credits"
                type="number"
                value={newCourse.credits}
                onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  credits: e.target.value
                })
                } />

            </div>
            <Button
              onClick={addCourse}
              className="w-full"
              leftIcon={<Plus className="w-4 h-4" />}>

              Add to Semester
            </Button>
          </Card>

          <div className="space-y-3">
            {courses.map((course) =>
            <motion.div
              key={course.id}
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              layout>

                <Card className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900">{course.name}</h4>
                    <p className="text-sm text-gray-500">
                      {course.credits} Credits
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="block text-2xl font-bold text-fuchsia-600">
                        {course.grade}
                      </span>
                      <span className="text-xs text-gray-400">
                        Grade Points
                      </span>
                    </div>
                    <button
                    onClick={() => removeCourse(course.id)}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">

                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gray-900 text-white border-none">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Grade Scale
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>A (4.0)</span>
                <span>93-100%</span>
              </div>
              <div className="flex justify-between">
                <span>A- (3.7)</span>
                <span>90-92%</span>
              </div>
              <div className="flex justify-between">
                <span>B+ (3.3)</span>
                <span>87-89%</span>
              </div>
              <div className="flex justify-between">
                <span>B (3.0)</span>
                <span>83-86%</span>
              </div>
              <div className="flex justify-between">
                <span>B- (2.7)</span>
                <span>80-82%</span>
              </div>
              <div className="flex justify-between">
                <span>C+ (2.3)</span>
                <span>77-79%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>);

}