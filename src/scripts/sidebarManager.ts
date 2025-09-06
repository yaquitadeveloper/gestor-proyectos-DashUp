
import { type Workspace, WORKSPACE_LIMITS } from '../types/domain';

export async function initializeSidebar(userId: string): Promise<void> {
  try {
    console.log('🚀 Inicializando sidebar...');
    
    // Obtener workspaces del usuario desde Firebase
    const workspaces = await getUserWorkspaces(userId);
    
    // Renderizar workspaces en el sidebar
    renderWorkspaces(workspaces);
    
    // Configurar event listeners
    setupEventListeners();
    
    console.log('✅ Sidebar inicializado correctamente');
  } catch (error) {
    console.error('❌ Error inicializando sidebar:', error);
  }
}

async function getUserWorkspaces(userId: string): Promise<Workspace[]> {
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
    
    console.log('📊 Workspaces obtenidos:', workspaces.length);
    return workspaces;
  } catch (error) {
    console.error('❌ Error obteniendo workspaces:', error);
    return [];
  }
}

function renderWorkspaces(workspaces: Workspace[]): void {
  const workspacesContainer = document.getElementById('workspacesList');
  if (!workspacesContainer) {
    console.warn('⚠️ No se encontró el contenedor de workspaces');
    return;
  }
  
  workspacesContainer.innerHTML = '';
  
  if (workspaces.length === 0) {
    workspacesContainer.innerHTML = `
      <div class="text-center py-4 text-gray-500 text-sm">
        No tienes espacios de trabajo aún.<br>
        ¡Crea tu primer espacio!
      </div>
    `;
    return;
  }
  
  workspaces.forEach(workspace => {
    const workspaceElement = createWorkspaceElement(workspace);
    workspacesContainer.appendChild(workspaceElement);
  });
}

function createWorkspaceElement(workspace: Workspace): HTMLElement {
  const div = document.createElement('div');
  div.className = 'workspace-item mb-2';
  div.innerHTML = `
    <div class="flex items-center justify-between p-2 hover:bg-gray-200 rounded cursor-pointer" data-workspace-id="${workspace.id}">
      <div class="flex items-center space-x-2">
        <div class="w-6 h-6 bg-pink-500 rounded flex items-center justify-center text-xs font-bold text-white">
          ${workspace.name.charAt(0).toUpperCase()}
        </div>
        <span class="text-gray-800 text-sm">${workspace.name}</span>
      </div>
      <button class="text-gray-400 hover:text-gray-600 workspace-toggle">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    </div>
    <div class="workspace-content ml-8 space-y-1 hidden">
      <a href="#" class="flex items-center space-x-2 text-black hover:bg-blue-500 px-2 py-1 rounded text-sm transition-colors">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
        </svg>
        <span>Tableros</span>
      </a>
      <a href="#" class="flex items-center space-x-2 text-black hover:bg-blue-500 px-2 py-1 rounded text-sm transition-colors">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
        </svg>
        <span>Miembros</span>
      </a>
      <a href="#" class="flex items-center space-x-2 text-black hover:bg-blue-500 px-2 py-1 rounded text-sm transition-colors">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path>
        </svg>
        <span>Configuración</span>
      </a>
    </div>
  `;
  
  return div;
}

function setupEventListeners(): void {
  // Toggle workspace content
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('workspace-toggle')) {
      const workspaceItem = target.closest('.workspace-item');
      const content = workspaceItem?.querySelector('.workspace-content');
      if (content) {
        content.classList.toggle('hidden');
      }
    }
  });
}
