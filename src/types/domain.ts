// src/types/domain.ts

// Plano para un Espacio de Trabajo (Workspace)
export interface Workspace {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
 
}

// Plano para un Tablero (Board)
export interface Board {
  id: string;
  name: string;
  workspaceId: string;
  ownerId: string;
  members?: string[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  
}

// Plano para una Columna (Column)
export interface Column {
  id: string;
  name: string;
  boardId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
 
}

// Plano para una Tarea (Task)
export interface Task {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  boardId: string;
  order: number;
  dueDate?: Date;
  labels?: string[];
  attachments?: string[];
  assignees?: string[];
  priority: 'low' | 'medium' | 'high';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  taskId: string;
  text: string;
  authorId: string;
  createdAt: Date;
}