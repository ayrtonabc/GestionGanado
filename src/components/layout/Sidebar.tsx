import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Heart, 
  AlertCircle,
  Milk, 
  DollarSign, 
  Package, 
  Pill,
  Calendar,
  Settings,
  FileText,
  HelpCircle,
  ClipboardList,
  MessageSquare,
  UserCog
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { currentUser, hasRole } = useUser();
  
  // Verificar si el usuario tiene permisos de administración
  const isAdmin = hasRole(['admin']);
  
  const navigation = [
    { 
      name: 'Panel Principal',
      description: 'Resumen de información importante',
      href: '/', 
      icon: LayoutDashboard,
      shortcut: '⌘1'
    },
    { 
      name: 'Animales', 
      description: 'Gestión del rebaño',
      href: '/animals', 
      icon: Users,
      shortcut: '⌘2'
    },
    { 
      name: 'Reproducción', 
      description: 'Planificación y monitoreo reproductivo',
      href: '/breeding', 
      icon: Heart,
      shortcut: '⌘3'
    },
    { 
      name: 'Visitas Veterinarias', 
      description: 'Programación e historial de visitas',
      href: '/veterinary', 
      icon: AlertCircle,
      shortcut: '⌘4'
    },
    { 
      name: 'Producción de Leche', 
      description: 'Monitoreo de producción láctea',
      href: '/milk', 
      icon: Milk,
      shortcut: '⌘5'
    },
    { 
      name: 'Tareas', 
      description: 'Gestión de tareas y actividades',
      href: '/tasks', 
      icon: ClipboardList, 
      shortcut: '⌘T'
    },
    { 
      name: 'Tickets', 
      description: 'Sistema de comunicación y reportes',
      href: '/tickets', 
      icon: MessageSquare, 
      shortcut: '⌘K'
    },
    { 
      name: 'Costos', 
      description: 'Gestión financiera',
      href: '/costs', 
      icon: DollarSign,
      shortcut: '⌘6'
    },
    { 
      name: 'Almacén de Alimentos', 
      description: 'Control de inventario de alimentos',
      href: '/feed', 
      icon: Package,
      shortcut: '⌘7'
    },
    { 
      name: 'Medicamentos', 
      description: 'Gestión de medicamentos',
      href: '/medication', 
      icon: Pill,
      shortcut: '⌘8'
    },
    { 
      name: 'Calendario', 
      description: 'Planificación de tareas y eventos',
      href: '/calendar', 
      icon: Calendar,
      shortcut: '⌘9'
    },
    { 
      name: 'Informes', 
      description: 'Análisis y reportes',
      href: '/reports', 
      icon: FileText,
      shortcut: '⌘0'
    },
    // Opción de gestión de usuarios solo visible para administradores
    ...(isAdmin ? [{ 
      name: 'Gestión de Usuarios', 
      description: 'Administración de usuarios y permisos',
      href: '/users', 
      icon: UserCog,
      shortcut: '⌘U'
    }] : []),
    { 
      name: 'Ustawienia', 
      description: 'Konfiguracja systemu',
      href: '/settings', 
      icon: Settings
    },
  ];

  // Adjust slicing if needed based on where Tasks was inserted
  const mainNavigation = navigation.slice(0, 6); // Include Tasks in main
  const secondaryNavigation = navigation.slice(6); // Start secondary after Tasks

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">DemoPrograma</span>
        </div>
      </div>
      
      <div className="flex-1 px-2 py-4 space-y-6 overflow-y-auto">
        <div>
          <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Główne funkcje
          </h2>
          <nav className="mt-2 space-y-1">
            {mainNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-50'
                  } group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200`}
                  title={`${item.description} ${item.shortcut ? `(${item.shortcut})` : ''}`}
                >
                  <item.icon className="flex-shrink-0 w-5 h-5 mr-3" />
                  <div className="flex-1">
                    <span>{item.name}</span>
                    <p className="text-xs text-gray-500 font-normal">{item.description}</p>
                  </div>
                  {item.shortcut && (
                    <span className="text-xs text-gray-400 font-mono">{item.shortcut}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Zarządzanie
          </h2>
          <nav className="mt-2 space-y-1">
            {secondaryNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-50'
                  } group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200`}
                  title={`${item.description} ${item.shortcut ? `(${item.shortcut})` : ''}`}
                >
                  <item.icon className="flex-shrink-0 w-5 h-5 mr-3" />
                  <div className="flex-1">
                    <span>{item.name}</span>
                    <p className="text-xs text-gray-500 font-normal">{item.description}</p>
                  </div>
                  {item.shortcut && (
                    <span className="text-xs text-gray-400 font-mono">{item.shortcut}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-150">
          <HelpCircle className="w-5 h-5 mr-3 text-gray-400" />
          <span>Centrum pomocy</span>
        </button>
        <div className="mt-4 flex items-center px-4 py-3 bg-gray-50 rounded-lg">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              {/* Changed initials here */}
              <span className="text-sm font-medium text-primary">GK</span>
            </div>
          </div>
          <div className="ml-3">
            {/* Changed name here */}
            <p className="text-sm font-medium text-gray-700">Grzegorz Koziura</p>
            <p className="text-xs text-gray-500">Właściciel gospodarstwa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
