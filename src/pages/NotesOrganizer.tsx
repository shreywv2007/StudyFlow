import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Plus, Tag, Folder, MoreVertical } from 'lucide-react';
export function NotesOrganizer() {
  const [activeTag, setActiveTag] = useState('All');
  const tags = ['All', 'Calculus', 'History', 'Physics', 'Personal'];
  const notes = [
  {
    id: 1,
    title: 'Derivatives Rules',
    preview: 'Power rule, product rule, quotient rule...',
    tag: 'Calculus',
    date: '2h ago'
  },
  {
    id: 2,
    title: 'WWII Timeline',
    preview: 'Key events leading up to 1939...',
    tag: 'History',
    date: '1d ago'
  },
  {
    id: 3,
    title: 'Lab Safety Protocols',
    preview: 'Always wear goggles, no open shoes...',
    tag: 'Physics',
    date: '2d ago'
  },
  {
    id: 4,
    title: 'Grocery List',
    preview: 'Milk, eggs, coffee, ramen...',
    tag: 'Personal',
    date: '3d ago'
  }];

  const filteredNotes =
  activeTag === 'All' ? notes : notes.filter((n) => n.tag === activeTag);
  return (
    <div className="p-6 max-w-7xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notes 📝</h1>
          <p className="text-gray-500">Capture your thoughts and lectures.</p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />}>New Note</Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Sidebar */}
        <Card className="p-4 flex flex-col gap-2 h-full">
          <Input
            placeholder="Search notes..."
            icon={<Search className="w-4 h-4" />}
            className="mb-4" />


          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
              Folders
            </p>
            {tags.map((tag) =>
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTag === tag ? 'bg-fuchsia-50 text-fuchsia-600' : 'text-gray-600 hover:bg-gray-50'}`}>

                {tag === 'All' ?
              <Folder className="w-4 h-4" /> :

              <Tag className="w-4 h-4" />
              }
                {tag}
              </button>
            )}
          </div>
        </Card>

        {/* Notes Grid */}
        <div className="lg:col-span-3 overflow-y-auto pr-2">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) =>
            <motion.div
              key={note.id}
              layout
              initial={{
                opacity: 0,
                scale: 0.9
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}>

                <Card
                className="p-5 h-48 flex flex-col cursor-pointer group"
                hoverEffect>

                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-600">
                      {note.tag}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-fuchsia-600 transition-colors">
                    {note.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 flex-1">
                    {note.preview}
                  </p>
                  <p className="text-xs text-gray-400 mt-4">
                    Edited {note.date}
                  </p>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>);

}