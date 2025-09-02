// src/types/domain.ts

// Plano para un Espacio de Trabajo (Workspace)
export interface Workspace {
  id: string; // Su identificador único (texto)
  name: string; // Su nombre, ej: "Trabajos de la Universidad" (texto)
  boards: Board[]; // Una lista de Tableros.
}

// Plano para un Tablero (Board)
export interface Board {
  id: string; // Su identificador único (texto)
  name: string; // Su nombre, ej: "Proyecto de Astro" (texto)
  columns: Column[]; // Una lista de Columnas.
}

// Plano para una Columna (Column)
export interface Column {
  id: string; // Su identificador único (texto)
  name: string; // Su nombre, ej: "Por Hacer" (texto)
  tasks: Task[]; // Una lista de Tareas. '[]' significa "lista de".
}

// Plano para una Tarea (Task)
export interface Task {
  id: string; // Su identificador único (texto)
  title: string; // Su título (texto)
  description?: string; // Su descripción (el '?' significa que es opcional)
}