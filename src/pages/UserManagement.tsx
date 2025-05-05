import React, { useState, useMemo } from 'react';
import { useUser } from '../context/UserContext';
import { useEstablishment } from '../context/EstablishmentContext';
import { User, UserRole } from '../types/user';
import { Plus, Edit, Trash2, UserCheck, UserX } from 'lucide-react';

const UserManagement: React.FC = () => {
  const { allUsers, currentUser, hasRole } = useUser();
  const { establishments, currentEstablishmentId } = useEstablishment();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Verificar si el usuario actual tiene permisos de administrador
  const isAdmin = useMemo(() => hasRole(['admin']), [hasRole]);

  // Filtrar usuarios según el establecimiento seleccionado
  const filteredUsers = useMemo(() => {
    if (currentEstablishmentId === 'global') {
      return allUsers;
    }
    return allUsers.filter(user => 
      user.establishmentIds.includes(currentEstablishmentId)
    );
  }, [allUsers, currentEstablishmentId]);

  // Obtener el nombre del establecimiento por ID
  const getEstablishmentName = (id: string) => {
    const establishment = establishments.find(est => est.id === id);
    return establishment ? establishment.name : 'Desconocido';
  };

  // Traducir el rol a español
  const translateRole = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'manager': return 'Gerente';
      case 'employee': return 'Empleado';
      default: return role;
    }
  };

  // Función para manejar la edición de un usuario (simulada)
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  // Función para manejar la eliminación de un usuario (simulada)
  const handleDeleteUser = (userId: string) => {
    // En un entorno real, esto sería una llamada a API
    alert(`Eliminación de usuario ${userId} simulada`);
  };

  // Función para manejar la activación/desactivación de un usuario (simulada)
  const handleToggleUserStatus = (userId: string, currentStatus: boolean) => {
    // En un entorno real, esto sería una llamada a API
    alert(`Cambio de estado de usuario ${userId} a ${!currentStatus ? 'activo' : 'inactivo'} simulado`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-900">Gestión de Usuarios</h1>
        {isAdmin && (
          <button 
            className="btn btn-primary flex items-center"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Añadir nuevo usuario
          </button>
        )}
      </div>

      {!isAdmin && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Solo los administradores pueden gestionar usuarios.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredUsers.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-500">
              No hay usuarios para mostrar
            </li>
          ) : (
            filteredUsers.map(user => (
              <li key={user.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {user.profileImage ? (
                        <img 
                          className="h-10 w-10 rounded-full" 
                          src={user.profileImage} 
                          alt={user.name} 
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-lg font-medium text-gray-600">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.active ? 'Activo' : 'Inactivo'}
                    </span>
                    <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {translateRole(user.role)}
                    </span>
                    <div className="ml-4 text-sm text-gray-500">
                      {user.establishmentIds.map(estId => (
                        <span key={estId} className="mr-1 px-2 py-1 text-xs rounded bg-gray-100">
                          {getEstablishmentName(estId)}
                        </span>
                      ))}
                    </div>
                  </div>
                  {isAdmin && currentUser?.id !== user.id && (
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleToggleUserStatus(user.id, user.active)}
                        className="p-1 rounded-full text-gray-400 hover:text-gray-500"
                        title={user.active ? 'Desactivar usuario' : 'Activar usuario'}
                      >
                        {user.active ? 
                          <UserX className="h-5 w-5" /> : 
                          <UserCheck className="h-5 w-5" />
                        }
                      </button>
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="p-1 rounded-full text-gray-400 hover:text-gray-500"
                        title="Editar usuario"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1 rounded-full text-gray-400 hover:text-red-500"
                        title="Eliminar usuario"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Aquí irían los modales para añadir/editar usuarios */}
      {/* Por simplicidad, no se implementan completamente en este ejemplo */}

      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Añadir nuevo usuario</h3>
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
                  alert('Creación de usuario simulada');
                  setShowAddModal(false);
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Editar usuario: {selectedUser.name}</h3>
            <p className="text-gray-500 mb-4">Funcionalidad simulada para demostración</p>
            <div className="flex justify-end">
              <button 
                className="btn btn-outline-secondary mr-2"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                }}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  alert(`Edición de usuario ${selectedUser.id} simulada`);
                  setShowEditModal(false);
                  setSelectedUser(null);
                }}
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;