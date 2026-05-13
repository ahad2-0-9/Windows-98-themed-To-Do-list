/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface NewTaskDialogProps {
  onAdd: (name: string, description: string) => void;
}

export default function NewTaskDialog({ onAdd }: NewTaskDialogProps) {
  const [name, setName] = React.useState('Fix the core legacy database');
  const [desc, setDesc] = React.useState('Initial audit of the Task Core system suggests several memory leaks in the primary registry. Need to re-evaluate the stack allocation for the UI renders...');

  return (
    <div className="p-4 flex flex-col gap-4 max-w-md bg-win-gray">
      <div className="flex gap-1 border-b border-win-shadow/40 mb-2">
        <button className="win95-outset px-4 py-1 text-sm bg-win-gray">General</button>
        <button className="win95-inset px-4 py-1 text-sm bg-win-gray opacity-60">Advanced</button>
        <button className="win95-inset px-4 py-1 text-sm bg-win-gray opacity-60">Scheduling</button>
      </div>

      <div>
        <label className="block text-sm font-bold mb-1">Task Name:</label>
        <div className="win95-inset bg-white p-2">
          <input 
            type="text" 
            className="w-full border-none outline-none font-handwriting text-xl" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold mb-1">Description:</label>
        <div className="win95-inset bg-white p-2">
          <textarea 
            className="w-full h-32 border-none outline-none font-mono text-xs resize-none"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 win95-inset p-2">
          <label className="block text-xs font-bold mb-2">Priority</label>
          <div className="flex flex-col gap-2">
            {['Low', 'Medium', 'High (Urgent)'].map((p, i) => (
              <label key={p} className="flex items-center gap-2 text-xs">
                <input type="checkbox" checked={i === 1} className="win95-inset" onChange={() => {}} />
                {p}
              </label>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold mb-1">Assigned To:</label>
          <select className="win95-inset bg-white w-full text-xs p-1 outline-none">
            <option>SYS_ADMIN</option>
            <option>ROOT_USER</option>
            <option>GUEST_DEV</option>
          </select>
          <label className="flex items-center gap-2 text-xs mt-4">
            <input type="checkbox" checked onChange={() => {}} />
            Send email notification
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button 
          className="win95-outset win95-button px-6 py-1 text-sm min-w-[80px]"
          onClick={() => onAdd(name, desc)}
        >
          OK
        </button>
        <button className="win95-outset win95-button px-6 py-1 text-sm min-w-[80px]">Cancel</button>
        <button className="win95-outset win95-button px-6 py-1 text-sm min-w-[80px] opacity-60" disabled>Apply</button>
      </div>
    </div>
  );
}
