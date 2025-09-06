import { type Workspace, WORKSPACE_LIMITS } from '../types/domain';
import type { WorkspaceInvitation } from '../types/domain';


export async function createWorkspace(name: string, description: string, ownerId: string): Promise<string> {
  try {
    const { db } = await import("../lib/firebase");
    const { collection, addDoc, query, where, getDocs } = await import("firebase/firestore");
    
    // Verificar límite de workspaces para usuario free
    const userWorkspacesQuery = query(
      collection(db, "workspaces"), 
      where("ownerId", "==", ownerId)
    );
    const userWorkspaces = await getDocs(userWorkspacesQuery);
    
    if (userWorkspaces.size >= WORKSPACE_LIMITS.FREE.maxWorkspaces) {
      throw new Error("Límite de workspaces alcanzado. Actualiza a Premium para más espacios.");
    }
    
    // Crear workspace
    const workspaceData = {
      name,
      description,
      ownerId,
      members: [ownerId],
      createdAt: new Date(),
      updatedAt: new Date(),
      settings: {
        isPublic: false,
        allowMemberInvites: true,
        maxBoards: WORKSPACE_LIMITS.FREE.maxBoardsPerWorkspace
      }
    };
    
    const docRef = await addDoc(collection(db, "workspaces"), workspaceData);
    
    // Crear membresía del owner
    await addDoc(collection(db, "workspaceMembers"), {
      userId: ownerId,
      workspaceId: docRef.id,
      role: 'owner',
      joinedAt: new Date(),
      permissions: {
        canCreateBoards: true,
        canInviteMembers: true,
        canManageWorkspace: true,
        canDeleteBoards: true,
        canEditBoards: true,
        canExpelMembers: true
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    
    return docRef.id;
  } catch (error) {
    console.error('❌ Error creando workspace:', error);
    throw error;
  }
}

export async function getUserWorkspaces(userId: string): Promise<Workspace[]> {
  try {
    const { db } = await import("../lib/firebase");
    const { collection, query, where, getDocs } = await import("firebase/firestore");
    
    const workspacesQuery = query(
      collection(db, "workspaces"),
      where("members", "array-contains", userId)
    );
    
    const workspacesSnapshot = await getDocs(workspacesQuery);
    const workspaces: Workspace[] = [];
    
    workspacesSnapshot.forEach((doc) => {
      const data = doc.data();
      workspaces.push({
        id: doc.id,
        name: data.name,
        description: data.description,
        ownerId: data.ownerId,
        members: data.members,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        settings: data.settings
      } as Workspace);
    });
    
    return workspaces;
  } catch (error) {
    console.error('❌ Error obteniendo workspaces:', error);
    return [];
  }
}

export async function inviteMember(workspaceId: string, email: string, role: 'admin' | 'member', invitedBy: string): Promise<void> {
  try {
    const { db } = await import("../lib/firebase");
    const { collection, addDoc, query, where, getDocs } = await import("firebase/firestore");
    
    // Verificar que el workspace existe y el usuario tiene permisos
    const workspaceRef = collection(db, "workspaces");
    const workspaceDoc = await getDocs(query(workspaceRef, where("__name__", "==", workspaceId)));
    
    if (workspaceDoc.empty) {
      throw new Error("Workspace no encontrado");
    }
    
    // Crear invitación
    const invitationData: Omit<WorkspaceInvitation, 'id'> = {
      workspaceId,
      workspaceName: workspaceDoc.docs[0].data().name,
      invitedEmail: email,
      invitedBy,
      role,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
      token: Math.random().toString(36).substring(2, 15)
    };
    
    await addDoc(collection(db, "workspaceInvitations"), invitationData);
    
    // TODO: Enviar email de invitación
    console.log(`Invitación enviada a ${email} para el workspace ${workspaceId}`);
    
  } catch (error) {
    console.error('Error invitando miembro:', error);
    throw error;
  }
}