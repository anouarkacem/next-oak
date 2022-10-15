export interface Phase {
  id: number;
  title: string;
  tasks?: Task[];
  done?: boolean;
}

export interface Task {
  id: number;
  title: string;
  done: boolean;
  phaseId: Phase["id"];
}

export interface Db {
  phases: Phase[];
  tasks: Task[];
}

export const db: Db = {
  phases: [],
  tasks: [],
};
