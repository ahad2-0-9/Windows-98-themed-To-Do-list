/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Monitor, Volume2, FolderOpen } from 'lucide-react';

export default function Taskbar() {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="h-8 bg-win-gray border-t border-white flex items-center px-1 z-[100] gap-1">
      <button className="win95-outset win95-button flex items-center gap-1 px-3 py-0.5 font-bold bg-win-gray italic h-6">
        <Monitor size={14} />
        <span className="text-xs">Start</span>
      </button>

      <div className="h-6 w-[1.5px] bg-win-shadow border-r border-white mx-1"></div>

      <div className="flex-1 flex gap-1 items-center h-full overflow-hidden">
        <div className="win95-inset px-3 py-0.5 flex items-center gap-2 bg-[#f5f3f3] h-6 max-w-[150px]">
          <FolderOpen size={12} className="text-win-blue" />
          <span className="text-[10px] font-mono truncate">DAILY_TASKS</span>
        </div>
      </div>

      <div className="win95-inset px-2 flex items-center gap-3 bg-win-gray h-6 ml-auto">
        <Volume2 size={12} className="text-black/70" />
        <span className="font-mono text-[10px] font-bold">{time}</span>
      </div>
    </footer>
  );
}
