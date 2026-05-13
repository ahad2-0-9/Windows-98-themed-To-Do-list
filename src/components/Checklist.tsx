/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Square, CheckSquare, Pencil, Eraser, Type, ZoomIn, Pipette, Palette, Image as ImageIcon, Trash2 } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  note?: string;
  checked?: boolean;
  faded?: boolean;
}

interface ChecklistProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function Checklist({ tasks, onToggle, onDelete }: ChecklistProps) {
  const tools = [
    { icon: <Pencil size={14} />, active: true },
    { icon: <Eraser size={14} /> },
    { icon: <Type size={14} /> },
    { icon: <ZoomIn size={14} /> },
    { icon: <Pipette size={14} /> },
    { icon: <Palette size={14} /> },
    { icon: <ImageIcon size={14} /> },
  ];

  return (
    <div className="flex h-full bg-win-gray p-0.5">
      {/* MS Paint Style Sidebar */}
      <div className="w-12 flex flex-col gap-1 p-1 bg-win-gray border-r border-win-shadow/40 mr-1 shrink-0">
        <div className="grid grid-cols-2 gap-0.5">
          {tools.map((tool, i) => (
            <button 
              key={i} 
              className={`win95-outset win95-button w-5 h-5 flex items-center justify-center p-0.5 ${tool.active ? 'win95-inset bg-white/20' : ''}`}
            >
              {tool.icon}
            </button>
          ))}
        </div>
        <div className="mt-auto win95-inset bg-white w-full aspect-square flex items-center justify-center">
           <div className="w-4 h-4 bg-win-blue"></div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-win-shadow p-1 overflow-hidden">
        <div className="bg-white win95-inset h-full p-8 font-handwriting select-none overflow-auto relative">
          {/* Background Grid */}
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          ></div>

          <div className="relative z-10">
            <h1 className="text-4xl text-win-blue mb-8 border-b-2 border-win-blue/20 pb-4">Daily System Checklist</h1>
            
            <div className="flex flex-col gap-6">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`flex items-start gap-4 group ${task.faded ? 'opacity-40 grayscale' : ''}`}
                >
                  <div 
                    className="mt-1 win95-inset w-8 h-8 flex items-center justify-center bg-white flex-shrink-0 cursor-pointer"
                    onClick={() => onToggle(task.id)}
                  >
                    {task.checked ? <CheckSquare size={24} className="text-win-blue" /> : <div className="w-6 h-6 border-2 border-win-shadow/10" />}
                  </div>
                  <div className="flex-1 cursor-pointer" onClick={() => onToggle(task.id)}>
                    <p className={`text-2xl ${task.checked ? 'line-through text-gray-500' : 'text-black'}`}>
                      {task.name}
                    </p>
                    {task.note && <p className="font-mono text-xs text-gray-400 mt-1">{task.note}</p>}
                  </div>
                  <button 
                    className="opacity-0 group-hover:opacity-100 win95-outset win95-button p-1 hover:bg-red-50 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(task.id);
                    }}
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              ))}
            </div>

            {/* Paint Color Palette */}
            <div className="mt-12 bg-win-gray p-1 win95-inset inline-flex flex-col gap-1">
              <div className="flex gap-0.5">
                {['#000000', '#808080', '#ff0000', '#800000', '#ffff00', '#808000', '#00ff00', '#008000', '#00ffff', '#008080', '#0000ff', '#000080', '#ff00ff', '#800080'].map(c => (
                  <div key={c} className="w-4 h-4 win95-inset border border-white/50" style={{ backgroundColor: c }}></div>
                ))}
              </div>
              <div className="flex gap-0.5">
                {['#ffffff', '#c0c0c0', '#ff8080', '#ff0080', '#ffff80', '#ff8000', '#80ff80', '#00ff80', '#80ffff', '#0080ff', '#8080ff', '#4000ff', '#ff80ff', '#ff00ff'].map(c => (
                  <div key={c} className="w-4 h-4 win95-inset border border-white/50" style={{ backgroundColor: c }}></div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-4 bg-win-gray win95-outset inline-flex items-center gap-4">
              <div className="win95-inset p-2 bg-white">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvwbKm6saoMHV0VFveSwKyc57tOcBdTbzulQmhQAty0t0y36LFdqjazbs-ufExC8JcQZEoEV9qL9R5GBmoJsgEeQxXa3YaIVEKT-VGTIc2qgh2O3QxDUzbvcXueoFfaZtj-hzwoLuywB82zeyMSeAkU8CzVB8ClnBAJzrWbN1XFzSmxQzOIQy27vtJDGJ3J5VL_ppr7reSev0SKvQ-Z31dU5XrGr2anuxM-65Ac9GnerVmLaF0v6tj6c5b89yKumKV5TpsHXeV25c" 
                  alt="Status" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="font-mono text-xs">
                <p className="font-bold text-win-blue uppercase">System Status: Operational</p>
                <p className="opacity-60 mt-1">Checklist integrity verified.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
