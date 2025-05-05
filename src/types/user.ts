// Definiciones de tipos para el sistema multiusuario

export type UserRole = 'admin' | 'manager' | 'employee';

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: UserRole;
  establishmentIds: string[];
  active: boolean;
  lastLogin?: string;
  createdAt: string;
  profileImage?: string;
}

export interface UserTask {
  id: string;
  taskId: string;
  userId: string;
  status: 'assigned' | 'in_progress' | 'completed' | 'rejected';
  assignedAt: string;
  startedAt?: string;
  completedAt?: string;
  comments?: string;
  attachments?: string[];
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  category: 'issue' | 'request' | 'suggestion' | 'other';
  assignedTo?: string;
  establishmentId: string;
  dueDate?: string;
  comments: TicketComment[];
  attachments?: string[];
}

export interface TicketComment {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  createdAt: string;
  attachments?: string[];
}