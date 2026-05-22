/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Sidebar from './components/Sidebar';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import FileExplorer from './components/FileExplorer';
import NewTaskDialog from './components/NewTaskDialog';
import RemindersDesktop from './components/RemindersDesktop';
import Checklist from './components/Checklist';
import { Search, Settings, HelpCircle, Folder, Trash2, Camera, CheckSquare } from 'lucide-react';
import { isSupabaseConfigured, supabase } from './lib/supabase';
import type { Reminder, Task } from './types';

const defaultTasks: Task[] = [
  { id: '1', name: 'morning_routine.txt', size: '2 KB', type: 'Text Document', modified: '10/24/98 08:30 AM', icon: 'file-text', checked: true, note: '// Spray paint confirmation: OK' },
  { id: '2', name: 'dream_vision_98.bmp', size: '1,024 KB', type: 'Bitmap Image', modified: '10/24/98 02:15 AM', icon: 'image', checked: true, note: '// Status: Archived' },
  { id: '3', name: 'grocery_list_final.txt', size: '1 KB', type: 'Text Document', modified: '10/23/98 06:45 PM', icon: 'file-text', checked: false },
  { id: '4', name: 'Review new reminder notifications', size: '1 KB', type: 'System Task', modified: '10/23/98 06:45 PM', icon: 'file-text', checked: false },
  { id: '5', name: 'Draft next week\'s system architecture...', size: '5 KB', type: 'System Task', modified: '10/23/98 06:45 PM', icon: 'file-text', checked: false, faded: true },
];

const defaultReminders: Reminder[] = [
  { id: '1', title: 'CRITICAL_ALERT.EXE', text: 'Buy groceries or we will starve to death by Tuesday!', type: 'critical', pos: { top: '10%', left: '5%' } },
  { id: '2', title: 'System Notice', text: 'Doctor appointment tomorrow at 10:00 AM. Don\'t forget the paperwork.', type: 'info', pos: { top: '35%', left: '40%' } },
  { id: '3', title: 'Reminder #402', text: 'Call Mom. She\'s been waiting for an update about the garden.', type: 'sticky', pos: { top: '55%', left: '10%' } },
];

export default function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [isSyncing, setIsSyncing] = React.useState(isSupabaseConfigured);
  
  // Tasks State (Shared between Archive, New Task, and Checklist)
  const [tasks, setTasks] = React.useState<Task[]>(defaultTasks);

  // Reminders State
  const [reminders, setReminders] = React.useState<Reminder[]>(defaultReminders);

  React.useEffect(() => {
    if (!supabase) {
      setIsSyncing(false);
      return;
    }

    const client = supabase;

    async function loadData() {
      const [tasksResult, remindersResult] = await Promise.all([
        client.from('tasks').select('*').order('created_at', { ascending: false }),
        client.from('reminders').select('*').order('created_at', { ascending: true }),
      ]);

      if (tasksResult.error || remindersResult.error) {
        console.error('Supabase load failed', tasksResult.error || remindersResult.error);
        setIsSyncing(false);
        return;
      }

      if (tasksResult.data.length > 0) {
        setTasks(tasksResult.data.map(rowToTask));
      } else {
        await client.from('tasks').insert(defaultTasks.map(taskToRow));
      }

      if (remindersResult.data.length > 0) {
        setReminders(remindersResult.data.map(rowToReminder));
      } else {
        await client.from('reminders').insert(defaultReminders.map(reminderToRow));
      }

      setIsSyncing(false);
    }

    loadData();
  }, []);

  const addTask = (name: string, description: string) => {
    const newTask = {
      id: crypto.randomUUID(),
      name: name.endsWith('.txt') ? name : `${name}.txt`,
      size: `${Math.floor(Math.random() * 10) + 1} KB`,
      type: 'Text Document',
      modified: new Date().toLocaleString(),
      icon: 'file-text',
      checked: false,
      note: description ? `// ${description.substring(0, 30)}...` : undefined
    };
    setTasks(current => [newTask, ...current]);
    supabase?.from('tasks').insert(taskToRow(newTask)).then(({ error }) => {
      if (error) console.error('Supabase insert task failed', error);
    });
    setActiveTab('archive');
  };

  const deleteTask = (id: string) => {
    setTasks(current => current.filter(t => t.id !== id));
    supabase?.from('tasks').delete().eq('id', id).then(({ error }) => {
      if (error) console.error('Supabase delete task failed', error);
    });
  };

  const toggleTask = (id: string) => {
    setTasks(current => {
      const nextTasks = current.map(t => t.id === id ? { ...t, checked: !t.checked } : t);
      const changedTask = nextTasks.find(t => t.id === id);

      if (changedTask) {
        supabase?.from('tasks').update({ checked: changedTask.checked }).eq('id', id).then(({ error }) => {
          if (error) console.error('Supabase update task failed', error);
        });
      }

      return nextTasks;
    });
  };

  const closeReminder = (id: string) => {
    setReminders(current => current.filter(r => r.id !== id));
    supabase?.from('reminders').delete().eq('id', id).then(({ error }) => {
      if (error) console.error('Supabase delete reminder failed', error);
    });
  };

  const addReminder = (text: string) => {
    const newRem = {
      id: crypto.randomUUID(),
      title: `Reminder #${Math.floor(Math.random() * 900) + 100}`,
      text: text,
      type: 'sticky',
      pos: { top: `${20 + Math.random() * 40}%`, left: `${20 + Math.random() * 40}%` }
    };
    setReminders(current => [...current, newRem]);
    supabase?.from('reminders').insert(reminderToRow(newRem)).then(({ error }) => {
      if (error) console.error('Supabase insert reminder failed', error);
    });
  };

  return (
    <div className="flex h-screen w-screen bg-win-teal flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="h-14 bg-white/10 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 pl-[240px] shrink-0">
        <div className="font-heading text-lg font-bold text-win-blue/80">TASK_CORE</div>
        {isSyncing && (
          <div className="win95-inset bg-win-gray px-2 py-1 font-mono text-[10px] text-win-blue">
            Connecting to Supabase...
          </div>
        )}
        
        <div className="flex items-center gap-6">
          <div className="win95-inset bg-white px-2 py-1 flex items-center gap-2">
            <Search size={14} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search archive..." 
              className="bg-transparent border-none outline-none font-mono text-[10px] w-48"
            />
          </div>
          
          <div className="flex gap-4">
            <Settings size={18} className="text-gray-600 cursor-pointer hover:text-win-blue transition-colors" />
            <HelpCircle size={18} className="text-gray-600 cursor-pointer hover:text-win-blue transition-colors" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 relative overflow-auto bg-win-teal win95-scroll-y">
          {activeTab === 'dashboard' && (
            <div className="p-12 grid grid-cols-4 gap-8">
              <DesktopIcon icon={<Folder size={48} className="text-yellow-400 fill-yellow-400" />} label="My Projects" />
              <DesktopIcon icon={<Trash2 size={48} className="text-green-500" />} label="Recycle Bin" />
              
              <div className="col-span-4 mt-8 flex justify-center">
                <Window title="Create New Task - task_properties.exe" width="480px">
                  <NewTaskDialog onAdd={addTask} />
                </Window>
              </div>
            </div>
          )}

          {activeTab === 'new-task' && (
            <div className="h-full flex items-center justify-center p-8">
              <Window title="task_wizard.exe" width="500px">
                <NewTaskDialog onAdd={addTask} />
              </Window>
            </div>
          )}

          {activeTab === 'archive' && (
            <div className="p-8 h-full">
              <Window 
                title="C:\SYSTEM\ARCHIVE\DAILY_TASKS" 
                height="90%" 
                width="100%"
                icon={<Folder className="text-white" size={14} />}
              >
                <FileExplorer tasks={tasks} onDelete={deleteTask} />
              </Window>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="p-8 h-full">
              <Window 
                title="TASK_CORE - Checklist.bmp" 
                height="90%" 
                width="100%"
                icon={<CheckSquare className="text-white" size={14} />}
              >
                <Checklist tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
              </Window>
            </div>
          )}

          {activeTab === 'reminders' && (
            <RemindersDesktop 
              reminders={reminders} 
              onClose={closeReminder} 
              onAdd={addReminder}
            />
          )}
        </main>
      </div>

      <Taskbar />
    </div>
  );
}

function taskToRow(task: Task) {
  return {
    id: task.id,
    name: task.name,
    size: task.size,
    type: task.type,
    modified: task.modified,
    icon: task.icon,
    checked: Boolean(task.checked),
    note: task.note ?? null,
    faded: Boolean(task.faded),
  };
}

function rowToTask(row: any): Task {
  return {
    id: row.id,
    name: row.name,
    size: row.size,
    type: row.type,
    modified: row.modified,
    icon: row.icon,
    checked: row.checked,
    note: row.note ?? undefined,
    faded: row.faded,
  };
}

function reminderToRow(reminder: Reminder) {
  return {
    id: reminder.id,
    title: reminder.title,
    text: reminder.text,
    type: reminder.type,
    top: reminder.pos.top,
    left: reminder.pos.left,
  };
}

function rowToReminder(row: any): Reminder {
  return {
    id: row.id,
    title: row.title,
    text: row.text,
    type: row.type,
    pos: {
      top: row.top,
      left: row.left,
    },
  };
}

function DesktopIcon({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer w-24">
      <div className="p-4 hover:bg-win-blue/20 transition-colors rounded">
        {icon}
      </div>
      <span className="bg-win-blue text-white px-2 text-[10px] font-mono group-hover:bg-win-blue/80">
        {label}
      </span>
    </div>
  );
}
