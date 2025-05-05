import React, { useState, useMemo } from 'react';
import { Plus, Filter, Edit, Trash2, CheckCircle, Circle, Clock, MessageSquare } from 'lucide-react';
import { Task } from '../types';
import { useEstablishment } from '../context/EstablishmentContext';
import { useUser } from '../context/UserContext';
import { UserTask } from '../types/user';
// Mock data - replace with actual data fetching/management later
import { establishments } from '../data/mockData';
import { users, userTasks } from '../data/mockUsers';

// Mock tasks data
const mockTasks: Task[] = [
  { 
    id: 'task-1', 
    title: 'Revisar cercado del pastizal A', 
    description: 'Reparar cualquier daño encontrado', 
    dueDate: '2024-08-15', 
    priority: 'high', 
    status: 'pending', 
    assignedTo: 'user-5', 
    assignedBy: 'user-2',
    category: 'maintenance', 
    establishmentId: 'est-1',
    createdAt: '2024-08-01T08:00:00',
    comments: 'Priorizar la sección norte que tiene más desgaste'
  },
  { 
    id: 'task-2', 
    title: 'Ordenar alimento para vacas lecheras', 
    description: 'Se necesitan 2 toneladas de concentrado', 
    dueDate: '2024-08-10', 
    priority: 'medium', 
    status: 'in_progress', 
    assignedTo: 'user-2', 
    assignedBy: 'user-1',
    category: 'feeding', 
    establishmentId: 'est-1',
    createdAt: '2024-08-01T09:30:00',
    updatedAt: '2024-08-01T11:00:00'
  },
  { 
    id: 'task-3', 
    title: 'Programar visita del veterinario', 
    description: 'Control rutinario del rebaño reproductor', 
    dueDate: '2024-08-20', 
    priority: 'medium', 
    status: 'pending', 
    assignedTo: 'user-4', 
    assignedBy: 'user-3',
    category: 'veterinary', 
    establishmentId: 'est-2',
    createdAt: '2024-07-30T14:00:00'
  },
  { 
    id: 'task-4', 
    title: 'Limpiar tanque de leche', 
    description: 'Limpieza semanal programada', 
    dueDate: '2024-08-12', 
    priority: 'low', 
    status: 'completed', 
    assignedTo: 'user-5', 
    assignedBy: 'user-2',
    category: 'maintenance', 
    establishmentId: 'est-1',
    createdAt: '2024-08-05T08:00:00',
    completedAt: '2024-08-05T10:30:00',
    comments: 'Limpieza completada sin problemas'
  },
  { 
    id: 'task-5', 
    title: 'Trasladar vaquillas a nuevo pastizal', 
    description: 'Grupo J2 al pastizal B', 
    dueDate: '2024-08-18', 
    priority: 'medium', 
    status: 'pending', 
    assignedTo: 'user-6', 
    assignedBy: 'user-1',
    category: 'other', 
    establishmentId: 'est-3',
    createdAt: '2024-08-02T15:00:00'
  },
];

const Tasks: React.FC = () => {
  const { currentEstablishmentId } = useEstablishment();
  const [tasks, setTasks] = useState<Task[]>(mockTasks); // Use mock data for now

  // Filter tasks based on the selected establishment
  const filteredTasks = useMemo(() => {
    if (currentEstablishmentId === 'global') {
      return tasks;
    }
    return tasks.filter(task => task.establishmentId === currentEstablishmentId);
  }, [currentEstablishmentId, tasks]);

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'pending': return <Circle className="w-4 h-4 text-yellow-500" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-blue-500 animate-pulse" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityClass = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-red-500';
      case 'medium': return 'border-l-4 border-yellow-500';
      case 'low': return 'border-l-4 border-blue-500';
      default: return 'border-l-4 border-gray-300';
    }
  };
  
  const getEstablishmentName = (id: string) => {
      const est = establishments.find(e => e.id === id);
      return est ? est.name : 'Establecimiento Desconocido';
  }
  
  // Obtener el nombre del usuario asignado
  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Usuario Desconocido';
  }
  
  // Obtener el estado de la tarea asignada al usuario
  const getUserTaskStatus = (taskId: string) => {
    const userTask = userTasks.find(ut => ut.taskId === taskId);
    return userTask ? userTask.status : null;
  }

  // Placeholder function for changing status - implement properly later
  const changeTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    console.log(`Changing status of task ${taskId} to ${newStatus}`);
  };

  // Verificar si el usuario actual tiene permisos para crear tareas
  const { currentUser, hasRole } = useUser();
  const canCreateTasks = useMemo(() => {
    return currentUser && hasRole(['admin', 'manager']);
  }, [currentUser, hasRole]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-900">Tareas</h1>
        {canCreateTasks && (
          <button className="btn btn-primary flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Añadir nueva tarea
          </button>
        )}
      </div>

      {/* Add filters later if needed */}
      {/* <div className="flex space-x-4">
        <button className="btn btn-outline-primary flex items-center">
          <Filter className="w-4 h-4 mr-2" /> Filtry
        </button>
      </div> */}

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
           <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
             <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
             <h3 className="mt-2 text-sm font-medium text-gray-900">No hay tareas</h3>
             <p className="mt-1 text-sm text-gray-500">
               {currentEstablishmentId === 'global' 
                 ? 'No hay tareas para mostrar.' 
                 : 'No hay tareas para el establecimiento seleccionado.'}
             </p>
             {canCreateTasks && (
               <div className="mt-6">
                 <button className="btn btn-primary">
                   Añadir primera tarea
                 </button>
               </div>
             )}
           </div>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className={`card flex items-start p-4 space-x-4 ${getPriorityClass(task.priority)}`}>
              <div className="flex-shrink-0 pt-1">
                {getStatusIcon(task.status)}
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800">
                    #{task.id.split('-')[1]}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span className="mr-2">Asignado a: {getUserName(task.assignedTo)}</span>
                  <span className="mx-2">•</span>
                  <span>Vencimiento: {new Date(task.dueDate).toLocaleDateString()}</span>
                  {task.comments && (
                    <>
                      <span className="mx-2">•</span>
                      <span>Comentarios: {task.comments}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  </div>
                  <div className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    Termin: {new Date(task.dueDate).toLocaleDateString('pl-PL')}
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                     <span>Przypisano: {task.assignedTo}</span>
                     <span>Kategoria: {task.category}</span>
                     {currentEstablishmentId === 'global' && (
                       <span>Gospodarstwo: {getEstablishmentName(task.establishmentId)}</span>
                     )}
                  </div>
                  <div className="flex items-center space-x-2">
                     {/* Status change buttons - basic example */}
                     {task.status !== 'pending' && (
                       <button onClick={() => changeTaskStatus(task.id, 'pending')} title="Oznacz jako oczekujące" className="text-yellow-500 hover:text-yellow-700"><Circle className="w-4 h-4"/></button>
                     )}
                     {task.status !== 'in_progress' && (
                       <button onClick={() => changeTaskStatus(task.id, 'in_progress')} title="Oznacz jako w toku" className="text-blue-500 hover:text-blue-700"><Clock className="w-4 h-4"/></button>
                     )}
                     {task.status !== 'completed' && (
                       <button onClick={() => changeTaskStatus(task.id, 'completed')} title="Oznacz jako ukończone" className="text-green-500 hover:text-green-700"><CheckCircle className="w-4 h-4"/></button>
                     )}
                     <button title="Edytuj" className="text-gray-400 hover:text-gray-600"><Edit className="w-4 h-4"/></button>
                     <button title="Usuń" className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4"/></button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;
