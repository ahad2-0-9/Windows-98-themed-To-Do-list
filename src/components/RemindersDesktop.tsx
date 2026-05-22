/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Window from './Window';
import LogWindow from './LogWindow';
import { AlertTriangle, Info, StickyNote, Bug } from 'lucide-react';
import type { Reminder } from '../types';

interface RemindersDesktopProps {
  reminders: Reminder[];
  onClose: (id: string) => void;
  onAdd: (text: string) => void;
}

export default function RemindersDesktop({ reminders, onClose, onAdd }: RemindersDesktopProps) {
  const [newReminderText, setNewReminderText] = React.useState('');

  return (
    <div className="relative w-full h-full p-8 overflow-hidden">
      {/* Add Reminder Widget */}
      <div className="absolute top-4 right-4 z-50">
        <Window title="Add Reminder" width="240px">
          <div className="p-2">
            <textarea 
              className="win95-inset w-full h-20 p-2 text-xs font-mono resize-none focus:outline-none"
              placeholder="What needs to be remembered?"
              value={newReminderText}
              onChange={(e) => setNewReminderText(e.target.value)}
            />
            <button 
              className="win95-outset win95-button w-full mt-2 py-1 text-xs"
              onClick={() => {
                if (newReminderText.trim()) {
                  onAdd(newReminderText);
                  setNewReminderText('');
                }
              }}
            >
              Add Reminder
            </button>
          </div>
        </Window>
      </div>

      {/* Floating Reminders */}
      {reminders.map(rem => (
        <div 
          key={rem.id} 
          className="absolute z-10" 
          style={{ top: rem.pos.top, left: rem.pos.left }}
        >
          <Window 
            title={rem.title} 
            width={rem.type === 'critical' ? '320px' : rem.type === 'info' ? '400px' : '260px'}
            onClose={() => onClose(rem.id)}
            icon={
              rem.type === 'critical' ? <AlertTriangle className="text-white" size={14} /> :
              rem.type === 'info' ? <Info className="text-white" size={14} /> :
              <StickyNote className="text-white" size={14} />
            }
          >
            <div className="p-4">
              {rem.type === 'info' ? (
                <>
                  <div className="win95-inset bg-white p-4 mb-4 min-h-[100px]">
                    <p className="font-handwriting text-2xl text-[#1b1c1c]">{rem.text}</p>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button className="win95-outset win95-button px-8 py-1 text-xs min-w-[100px]" onClick={() => onClose(rem.id)}>Acknowledge</button>
                    <button className="win95-outset win95-button px-8 py-1 text-xs min-w-[100px]" onClick={() => onClose(rem.id)}>Dismiss</button>
                  </div>
                </>
              ) : (
                <div className="flex gap-4">
                  {rem.type === 'critical' && <AlertTriangle className="text-red-600 flex-shrink-0" size={32} />}
                  <div>
                    <p className={`font-handwriting text-2xl leading-tight mb-4 ${rem.type === 'critical' ? 'text-red-600' : 'text-win-blue'}`}>
                      {rem.text}
                    </p>
                    <div className="flex justify-end">
                      <button 
                        className="win95-outset win95-button px-6 py-1 text-xs"
                        onClick={() => onClose(rem.id)}
                      >
                        {rem.type === 'sticky' ? 'Snooze (5m)' : 'OK'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Window>
        </div>
      ))}

      {/* Logs and Asset remains static */}
      <div className="absolute bottom-[5%] right-[5%] z-0">
        <Window title="REMINDER_SERVICE.LOG" width="380px" height="200px" icon={<Bug className="text-white" size={14} />}>
          <LogWindow />
        </Window>
      </div>
    </div>
  );
}
