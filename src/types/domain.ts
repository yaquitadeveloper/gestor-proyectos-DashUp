// Interfaces core del dominio
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos de roles
export type UserRole = 'owner' | 'admin' | 'member';
export type TaskPriority = 'low' | 'medium' | 'high';
export type NotificationType = 'workspace_invitation' | 'task_assigned' | 'task_updated' | 'comment_added' | 'board_shared';

// Usuario básico
export interface User extends BaseEntity {
  name: string;
  email: string;
  role: UserRole;
  activeWorkspaceIds: string[];
  profilePicture?: string;
}

// Workspace básico
export interface Workspace extends BaseEntity {
  name: string;
  description?: string;
  ownerId: string;
  members: string[];
  settings: {
    isPublic: boolean;
    allowMemberInvites: boolean;
    maxBoards: number;
  };
}

// Miembro de workspace
export interface WorkspaceMember extends BaseEntity {
  userId: string;
  workspaceId: string;
  role: UserRole;
  joinedAt: Date;
  permissions: {
    canCreateBoards: boolean;
    canInviteMembers: boolean;
    canManageWorkspace: boolean;
    canDeleteBoards: boolean;
    canEditBoards: boolean;
    canExpelMembers: boolean;
  };
  status: 'active' | 'pending' | 'suspended';
}

// Invitación a workspace
export interface WorkspaceInvitation extends BaseEntity {
  workspaceId: string;
  workspaceName: string;
  invitedEmail: string;
  invitedBy: string; // userId del que invita
  role: 'admin' | 'member';
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  expiresAt: Date;
  token: string;
}

// Tablero básico
export interface Board extends BaseEntity {
  name: string;
  description?: string;
  workspaceId: string;
  ownerId: string;
  members?: string[];
  isPublic: boolean;
}

// Tarea básica
export interface Task extends BaseEntity {
  title: string;
  description?: string;
  columnId: string;
  boardId: string;
  order: number;
  dueDate?: Date;
  assignees?: string[];
  priority: TaskPriority;
  createdBy: string;
}

// Límites para versión free
export const WORKSPACE_LIMITS = {
  FREE: {
    maxWorkspaces: 10,
    maxBoardsPerWorkspace: 10,
    maxMembersPerWorkspace: 5,
    maxTasksPerBoard: 100
  },
  PREMIUM: {
    maxWorkspaces: -1, // Ilimitado
    maxBoardsPerWorkspace: -1,
    maxMembersPerWorkspace: -1,
    maxTasksPerBoard: -1
  }
};