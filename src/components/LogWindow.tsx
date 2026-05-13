/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export default function LogWindow() {
  const logs = [
    "[10:44:01] SERVICE_START: Reminder kernel initialized.",
    "[10:44:05] FETCHING: rem_list.db... OK",
    "[10:45:00] ALERT: \"Grocery\" high priority triggered.",
    "[10:46:22] NOTICE: \"Doctor\" scheduled for T-24h.",
    "[10:47:11] ALERT: \"Call Mom\" snoozed 3 times.",
    "[10:48:00] STATUS: 3 active windows rendered.",
    "> _"
  ];

  return (
    <div className="bg-black text-[#00ff00] p-2 font-mono text-[11px] h-full overflow-y-auto leading-tight win95-inset">
      {logs.map((log, i) => (
        <div key={i} className="mb-0.5">{log}</div>
      ))}
    </div>
  );
}
