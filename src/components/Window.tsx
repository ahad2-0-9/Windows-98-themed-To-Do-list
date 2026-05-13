/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  width?: string;
  height?: string;
  className?: string;
  icon?: React.ReactNode;
}

export default function Window({ title, children, onClose, width = 'auto', height = 'auto', className = '', icon }: WindowProps) {
  return (
    <div 
      className={`win95-outset bg-win-gray flex flex-col ${className}`}
      style={{ width, height }}
    >
      <div className="win95-titlebar m-0.5">
        <div className="flex items-center gap-1.5 px-0.5">
          {icon && <span className="w-4 h-4">{icon}</span>}
          <span className="font-heading truncate uppercase tracking-tight">{title}</span>
        </div>
        <div className="flex gap-0.5">
          <button className="win95-window-btn"><Minus size={10} /></button>
          <button className="win95-window-btn"><Square size={8} /></button>
          <button className="win95-window-btn bg-[#c0c0c0]" onClick={onClose}><X size={12} /></button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-1">
        {children}
      </div>
    </div>
  );
}
