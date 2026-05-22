export interface Task {
  id: string;
  name: string;
  size: string;
  type: string;
  modified: string;
  icon: string;
  checked?: boolean;
  note?: string;
  faded?: boolean;
}

export interface Reminder {
  id: string;
  title: string;
  text: string;
  type: string;
  pos: {
    top: string;
    left: string;
  };
}
