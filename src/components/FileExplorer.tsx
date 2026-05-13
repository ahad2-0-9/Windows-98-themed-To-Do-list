/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface Task {
  id: string;
  name: string;
  size: string;
  type: string;
  modified: string;
  icon: string;
  checked?: boolean;
}

import { FileText, Image as ImageIcon, Undo, Scissors, Copy, Trash2, Info, List as ListIcon, Check } from 'lucide-react';

interface FileExplorerProps {
  tasks: Task[];
  onDelete: (id: string) => void;
}

export default function FileExplorer({ tasks, onDelete }: FileExplorerProps) {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  return (
    <div className="flex flex-col h-full">
      {/* Menu Bar */}
      <div className="flex gap-4 px-2 py-0.5 text-xs border-b border-white/20 select-none">
        {['File', 'Edit', 'View', 'Go', 'Favorites', 'Help'].map(item => (
          <span key={item} className="hover:underline cursor-pointer">{item}</span>
        ))}
      </div>
      
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-1 border-b border-win-shadow/40 bg-win-gray">
        <ToolbarButton icon={<Undo size={14} />} label="Undo" />
        <div className="w-[2px] h-8 bg-win-shadow mx-1 border-r border-white"></div>
        <ToolbarButton icon={<Scissors size={14} />} label="Cut" />
        <ToolbarButton icon={<Copy size={14} />} label="Copy" />
        <ToolbarButton 
          icon={<Trash2 size={14} />} 
          label="Delete" 
          onClick={() => selectedId && onDelete(selectedId)}
          disabled={!selectedId}
        />
        <div className="w-[2px] h-8 bg-win-shadow mx-1 border-r border-white"></div>
        <ToolbarButton icon={<Info size={14} />} label="Properties" />
        <ToolbarButton icon={<ListIcon size={14} />} label="Views" />
      </div>

      {/* Content Area */}
      <div className="flex-1 win95-inset bg-white m-0.5 overflow-auto win95-scroll-y font-mono">
        <table className="w-full">
          <thead className="sticky top-0 bg-win-gray z-10">
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Type</th>
              <th>Modified</th>
            </tr>
          </thead>
          <tbody className="font-handwriting text-lg text-[#1b1c1c]">
            {tasks.map(task => (
              <tr 
                key={task.id} 
                className={`group cursor-pointer ${selectedId === task.id ? 'bg-win-blue text-white' : 'hover:bg-win-blue/10'} ${task.checked ? 'opacity-60' : ''}`}
                onClick={() => setSelectedId(task.id)}
              >
                <td className={`flex items-center gap-2 ${task.checked ? 'line-through' : ''}`}>
                  <div className="relative">
                    {task.icon === 'file-text' ? <FileText size={14} /> : <ImageIcon size={14} />}
                    {task.checked && (
                      <div className="absolute -top-1 -right-1 bg-green-500 rounded-full border border-white">
                        <Check size={8} className="text-white" />
                      </div>
                    )}
                  </div>
                  {task.name}
                </td>
                <td>{task.size}</td>
                <td>{task.type}</td>
                <td>{task.modified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Bar */}
      <div className="win95-inset m-0.5 p-0.5 flex justify-between text-[10px] bg-win-gray">
        <div className="flex-1 border-r border-win-shadow px-2">{tasks.length} object(s)</div>
        <div className="flex-1 border-r border-win-shadow px-2">3.52 MB</div>
        <div className="flex-1 px-2 flex items-center gap-1">My Computer</div>
      </div>
    </div>
  );
}

function ToolbarButton({ icon, label, onClick, disabled }: { icon: React.ReactNode, label: string, onClick?: () => void, disabled?: boolean }) {
  return (
    <button 
      className={`win95-outset win95-button flex flex-col items-center justify-center p-1 min-w-[50px] ${disabled ? 'opacity-30' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      <span className="text-[9px] leading-none mt-1">{label}</span>
    </button>
  );
}
