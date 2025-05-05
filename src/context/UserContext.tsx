import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole } from '../types/user';
import { users } from '../data/mockUsers';

// Definir el tipo para el contexto de usuario
interface UserContextType {
  currentUser: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (establishmentId: string) => boolean;
  hasRole: (roles: UserRole[]) => boolean;
  allUsers: User[];
  getUserById: (id: string) => User | undefined;
  getUsersByEstablishment: (establishmentId: string) => User[];
}

// Crear el contexto con un valor inicial indefinido
const UserContext = createContext<UserContextType | undefined>(undefined);

// Definir el componente proveedor
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Efecto para cargar el usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error al cargar usuario desde localStorage:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  // Función para iniciar sesión (simulada)
  const login = async (username: string, password: string): Promise<boolean> => {
    // En un entorno real, esto sería una llamada a API
    // Por ahora, simplemente buscamos en los datos de ejemplo
    const user = users.find(u => u.username === username && u.active);
    
    if (user) {
      // Simulamos una verificación de contraseña exitosa
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      // Guardar en localStorage para persistencia
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Actualizar último inicio de sesión (en un entorno real, esto se haría en el backend)
      user.lastLogin = new Date().toISOString();
      
      return true;
    }
    
    return false;
  };

  // Función para cerrar sesión
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  // Verificar si el usuario tiene acceso a un establecimiento específico
  const hasPermission = (establishmentId: string): boolean => {
    if (!currentUser) return false;
    
    // Los administradores tienen acceso a todo
    if (currentUser.role === 'admin') return true;
    
    // Verificar si el establecimiento está en la lista de establecimientos del usuario
    return currentUser.establishmentIds.includes(establishmentId);
  };

  // Verificar si el usuario tiene uno de los roles especificados
  const hasRole = (roles: UserRole[]): boolean => {
    if (!currentUser) return false;
    return roles.includes(currentUser.role);
  };

  // Obtener usuario por ID
  const getUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
  };

  // Obtener usuarios por establecimiento
  const getUsersByEstablishment = (establishmentId: string): User[] => {
    return users.filter(user => user.establishmentIds.includes(establishmentId));
  };

  // Proporcionar el estado y las funciones a los componentes consumidores
  const contextValue: UserContextType = {
    currentUser,
    login,
    logout,
    isAuthenticated,
    hasPermission,
    hasRole,
    allUsers: users,
    getUserById,
    getUsersByEstablishment
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser debe ser utilizado dentro de un UserProvider');
  }
  return context;
};