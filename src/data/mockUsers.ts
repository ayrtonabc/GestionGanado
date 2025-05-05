import { User, Ticket, UserTask } from '../types/user';
import { establishments } from './mockData';

// Datos de ejemplo para usuarios
export const users: User[] = [
  {
    id: 'user-1',
    username: 'admin',
    email: 'admin@ganaderiaapp.com',
    name: 'Administrador Principal',
    role: 'admin',
    establishmentIds: ['est-1', 'est-2', 'est-3'], // Acceso a todos los establecimientos
    active: true,
    createdAt: '2023-01-01',
    lastLogin: '2024-08-01',
    profileImage: '/assets/profiles/admin.jpg'
  },
  {
    id: 'user-2',
    username: 'manager1',
    email: 'manager1@ganaderiaapp.com',
    name: 'Gerente Lechería',
    role: 'manager',
    establishmentIds: ['est-1'], // Solo acceso al establecimiento lechero
    active: true,
    createdAt: '2023-01-15',
    lastLogin: '2024-08-02',
    profileImage: '/assets/profiles/manager1.jpg'
  },
  {
    id: 'user-3',
    username: 'manager2',
    email: 'manager2@ganaderiaapp.com',
    name: 'Gerente Cría',
    role: 'manager',
    establishmentIds: ['est-2'], // Solo acceso al establecimiento de cría
    active: true,
    createdAt: '2023-01-20',
    lastLogin: '2024-08-01',
    profileImage: '/assets/profiles/manager2.jpg'
  },
  {
    id: 'user-4',
    username: 'employee1',
    email: 'employee1@ganaderiaapp.com',
    name: 'Técnico Veterinario',
    role: 'employee',
    establishmentIds: ['est-1', 'est-2'], // Acceso a dos establecimientos
    active: true,
    createdAt: '2023-02-01',
    lastLogin: '2024-08-03'
  },
  {
    id: 'user-5',
    username: 'employee2',
    email: 'employee2@ganaderiaapp.com',
    name: 'Operario Lechería',
    role: 'employee',
    establishmentIds: ['est-1'], // Solo acceso al establecimiento lechero
    active: true,
    createdAt: '2023-02-15',
    lastLogin: '2024-08-02'
  },
  {
    id: 'user-6',
    username: 'employee3',
    email: 'employee3@ganaderiaapp.com',
    name: 'Operario Engorde',
    role: 'employee',
    establishmentIds: ['est-3'], // Solo acceso al establecimiento de engorde
    active: true,
    createdAt: '2023-03-01',
    lastLogin: '2024-07-30'
  }
];

// Datos de ejemplo para tareas asignadas a usuarios
export const userTasks: UserTask[] = [
  {
    id: 'ut-1',
    taskId: 'task-1',
    userId: 'user-5',
    status: 'assigned',
    assignedAt: '2024-08-01T10:00:00',
    comments: 'Revisar especialmente la sección norte del perímetro'
  },
  {
    id: 'ut-2',
    taskId: 'task-2',
    userId: 'user-2',
    status: 'in_progress',
    assignedAt: '2024-08-01T09:30:00',
    startedAt: '2024-08-01T11:00:00',
    comments: 'Contactando proveedores para comparar precios'
  },
  {
    id: 'ut-3',
    taskId: 'task-3',
    userId: 'user-4',
    status: 'completed',
    assignedAt: '2024-07-30T14:00:00',
    startedAt: '2024-07-31T08:00:00',
    completedAt: '2024-07-31T16:30:00',
    comments: 'Visita programada para el 20 de agosto a las 9:00 AM'
  }
];

// Datos de ejemplo para tickets
export const tickets: Ticket[] = [
  {
    id: 'ticket-1',
    title: 'Falla en sistema de ordeñe',
    description: 'La unidad 3 del sistema de ordeñe automático no está funcionando correctamente',
    createdBy: 'user-5',
    createdAt: '2024-08-01T08:30:00',
    priority: 'high',
    status: 'in_progress',
    category: 'issue',
    assignedTo: 'user-2',
    establishmentId: 'est-1',
    dueDate: '2024-08-03',
    comments: [
      {
        id: 'comment-1',
        ticketId: 'ticket-1',
        userId: 'user-5',
        content: 'La unidad no enciende desde esta mañana',
        createdAt: '2024-08-01T08:30:00'
      },
      {
        id: 'comment-2',
        ticketId: 'ticket-1',
        userId: 'user-2',
        content: 'Técnico programado para revisar mañana a primera hora',
        createdAt: '2024-08-01T10:15:00'
      }
    ]
  },
  {
    id: 'ticket-2',
    title: 'Solicitud de insumos veterinarios',
    description: 'Necesitamos reponer el stock de antibióticos para el tratamiento preventivo',
    createdBy: 'user-4',
    createdAt: '2024-07-29T14:20:00',
    priority: 'medium',
    status: 'open',
    category: 'request',
    establishmentId: 'est-2',
    comments: [
      {
        id: 'comment-3',
        ticketId: 'ticket-2',
        userId: 'user-4',
        content: 'El stock actual alcanza solo para una semana más',
        createdAt: '2024-07-29T14:20:00'
      }
    ]
  },
  {
    id: 'ticket-3',
    title: 'Sugerencia para mejorar rotación de pasturas',
    description: 'Propongo implementar un nuevo sistema de rotación para optimizar el uso de las pasturas en el sector B',
    createdBy: 'user-6',
    createdAt: '2024-07-25T11:45:00',
    priority: 'low',
    status: 'resolved',
    category: 'suggestion',
    assignedTo: 'user-1',
    establishmentId: 'est-3',
    comments: [
      {
        id: 'comment-4',
        ticketId: 'ticket-3',
        userId: 'user-6',
        content: 'Basado en mi experiencia, podríamos aumentar la capacidad de carga en un 15%',
        createdAt: '2024-07-25T11:45:00'
      },
      {
        id: 'comment-5',
        ticketId: 'ticket-3',
        userId: 'user-1',
        content: 'Excelente sugerencia, implementaremos un período de prueba el próximo mes',
        createdAt: '2024-07-26T09:30:00'
      }
    ]
  }
];