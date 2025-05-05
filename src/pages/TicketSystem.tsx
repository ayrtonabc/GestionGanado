import React, { useState, useMemo } from 'react';
import { useUser } from '../context/UserContext';
import { useEstablishment } from '../context/EstablishmentContext';
import { Ticket } from '../types/user';
import { Plus, MessageSquare, AlertCircle, CheckCircle, Clock, Filter } from 'lucide-react';
import { tickets } from '../data/mockUsers';

const TicketSystem: React.FC = () => {
  const { currentUser, getUserById } = useUser();
  const { currentEstablishmentId } = useEstablishment();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newComment, setNewComment] = useState('');

  // Filtrar tickets según el establecimiento seleccionado y permisos del usuario
  const filteredTickets = useMemo(() => {
    if (!currentUser) return [];
    
    let filtered = [...tickets];
    
    // Filtrar por establecimiento si no es vista global
    if (currentEstablishmentId !== 'global') {
      filtered = filtered.filter(ticket => ticket.establishmentId === currentEstablishmentId);
    }
    
    // Si no es admin, solo mostrar tickets creados por el usuario o asignados a él
    if (currentUser.role !== 'admin') {
      filtered = filtered.filter(ticket => 
        ticket.createdBy === currentUser.id || 
        ticket.assignedTo === currentUser.id
      );
    }
    
    return filtered;
  }, [tickets, currentEstablishmentId, currentUser]);

  // Obtener el nombre del usuario por ID
  const getUserName = (userId: string) => {
    const user = getUserById(userId);
    return user ? user.name : 'Usuario desconocido';
  };

  // Obtener el icono según la prioridad del ticket
  const getPriorityIcon = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'critical': return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'high': return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'medium': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'low': return <Clock className="w-5 h-5 text-blue-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  // Obtener el icono según el estado del ticket
  const getStatusIcon = (status: Ticket['status']) => {
    switch (status) {
      case 'open': return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'in_progress': return <Clock className="w-5 h-5 text-yellow-500 animate-pulse" />;
      case 'resolved': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'closed': return <CheckCircle className="w-5 h-5 text-gray-500" />;
      default: return <MessageSquare className="w-5 h-5 text-gray-500" />;
    }
  };

  // Obtener la clase CSS según la prioridad
  const getPriorityClass = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'critical': return 'border-l-4 border-red-500';
      case 'high': return 'border-l-4 border-orange-500';
      case 'medium': return 'border-l-4 border-yellow-500';
      case 'low': return 'border-l-4 border-blue-500';
      default: return 'border-l-4 border-gray-300';
    }
  };

  // Traducir la prioridad a español
  const translatePriority = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'critical': return 'Crítica';
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return priority;
    }
  };

  // Traducir el estado a español
  const translateStatus = (status: Ticket['status']) => {
    switch (status) {
      case 'open': return 'Abierto';
      case 'in_progress': return 'En progreso';
      case 'resolved': return 'Resuelto';
      case 'closed': return 'Cerrado';
      default: return status;
    }
  };

  // Traducir la categoría a español
  const translateCategory = (category: Ticket['category']) => {
    switch (category) {
      case 'issue': return 'Problema';
      case 'request': return 'Solicitud';
      case 'suggestion': return 'Sugerencia';
      case 'other': return 'Otro';
      default: return category;
    }
  };

  // Función para manejar la apertura de detalles de un ticket
  const handleOpenTicketDetails = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowDetailModal(true);
  };

  // Función para manejar el envío de un nuevo comentario (simulada)
  const handleSubmitComment = () => {
    if (!selectedTicket || !newComment.trim()) return;
    
    alert(`Comentario añadido al ticket ${selectedTicket.id}: ${newComment}`);
    setNewComment('');
  };

  // Función para manejar el cambio de estado de un ticket (simulada)
  const handleChangeTicketStatus = (ticketId: string, newStatus: Ticket['status']) => {
    alert(`Cambio de estado del ticket ${ticketId} a ${translateStatus(newStatus)} simulado`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-900">Sistema de Tickets</h1>
        <button 
          className="btn btn-primary flex items-center"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Crear nuevo ticket
        </button>
      </div>

      <div className="flex space-x-4 mb-4">
        <button className="btn btn-outline-primary flex items-center">
          <Filter className="w-4 h-4 mr-2" /> Filtros
        </button>
      </div>

      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay tickets</h3>
            <p className="mt-1 text-sm text-gray-500">
              No hay tickets para mostrar con los filtros actuales.
            </p>
            <div className="mt-6">
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddModal(true)}
              >
                Crear primer ticket
              </button>
            </div>
          </div>
        ) : (
          filteredTickets.map((ticket) => (
            <div 
              key={ticket.id} 
              className={`card p-4 cursor-pointer hover:bg-gray-50 ${getPriorityClass(ticket.priority)}`}
              onClick={() => handleOpenTicketDetails(ticket)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 pt-1">
                    {getStatusIcon(ticket.status)}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">{ticket.title}</h3>
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800">
                        #{ticket.id.split('-')[1]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">{ticket.description}</p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span className="mr-2">Creado por: {getUserName(ticket.createdBy)}</span>
                      <span className="mx-2">•</span>
                      <span>Fecha: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                      ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {translateStatus(ticket.status)}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      ticket.priority === 'critical' ? 'bg-red-100 text-red-800' :
                      ticket.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {translatePriority(ticket.priority)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {ticket.comments.length} comentarios
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal para crear nuevo ticket */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Crear nuevo ticket</h3>
            <p className="text-gray-500 mb-4">Funcionalidad simulada para demostración</p>
            <div className="flex justify-end">
              <button 
                className="btn btn-outline-secondary mr-2"
                onClick={() => setShowAddModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  alert('Creación de ticket simulada');
                  setShowAddModal(false);
                }}
              >
                Crear ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de detalles del ticket */}
      {showDetailModal && selectedTicket && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <h3 className="text-xl font-medium text-gray-900">{selectedTicket.title}</h3>
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800">
                    #{selectedTicket.id.split('-')[1]}
                  </span>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <span>Creado por {getUserName(selectedTicket.createdBy)} el {new Date(selectedTicket.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedTicket(null);
                }}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Estado</span>
                <div className="mt-1 flex items-center">
                  {getStatusIcon(selectedTicket.status)}
                  <span className="ml-1 text-sm text-gray-900">{translateStatus(selectedTicket.status)}</span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Prioridad</span>
                <div className="mt-1 flex items-center">
                  {getPriorityIcon(selectedTicket.priority)}
                  <span className="ml-1 text-sm text-gray-900">{translatePriority(selectedTicket.priority)}</span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Categoría</span>
                <div className="mt-1">
                  <span className="text-sm text-gray-900">{translateCategory(selectedTicket.category)}</span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Asignado a</span>
                <div className="mt-1">
                  <span className="text-sm text-gray-900">
                    {selectedTicket.assignedTo ? getUserName(selectedTicket.assignedTo) : 'No asignado'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-sm font-medium text-gray-500">Descripción</span>
              <div className="mt-1 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-900">{selectedTicket.description}</p>
              </div>
            </div>

            {/* Acciones del ticket */}
            <div className="mt-4 flex space-x-2">
              {selectedTicket.status === 'open' && (
                <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleChangeTicketStatus(selectedTicket.id, 'in_progress')}
                >
                  Iniciar trabajo
                </button>
              )}
              {selectedTicket.status === 'in_progress' && (
                <button 
                  className="btn btn-sm btn-outline-success"
                  onClick={() => handleChangeTicketStatus(selectedTicket.id, 'resolved')}
                >
                  Marcar como resuelto
                </button>
              )}
              {selectedTicket.status === 'resolved' && (
                <button 
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handleChangeTicketStatus(selectedTicket.id, 'closed')}
                >
                  Cerrar ticket
                </button>
              )}
              {(currentUser?.role === 'admin' || currentUser?.role === 'manager') && (
                <button className="btn btn-sm btn-outline-primary">
                  Asignar
                </button>
              )}
            </div>

            {/* Comentarios */}
            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-900">Comentarios</h4>
              <div className="mt-2 space-y-4">
                {selectedTicket.comments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{getUserName(comment.userId)}</span>
                      <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulario para nuevo comentario */}
            <div className="mt-4">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Añadir comentario</label>
              <div className="mt-1">
                <textarea
                  id="comment"
                  name="comment"
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-2 flex justify-end">
                <button 
                  className="btn btn-primary"
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                >
                  Enviar comentario
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketSystem;