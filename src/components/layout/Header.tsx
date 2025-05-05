import React, { useState } from 'react';
import { Bell, User, ChevronDown } from 'lucide-react';
import { notifications } from '../../data/mockData';
import EstablishmentSelector from './EstablishmentSelector';
// Removed useEstablishment import as it's now used within EstablishmentSelector

interface HeaderProps {
  openSidebar: () => void;
  notificationCount: number;
}

const Header: React.FC<HeaderProps> = ({ openSidebar, notificationCount }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  // Removed context usage here, it's handled inside the selector

  const getNotificationTypeText = (type: string): string => {
    const types = {
      warning: 'Ostrzeżenie',
      info: 'Informacja',
      error: 'Błąd',
      success: 'Sukces'
    };
    return types[type as keyof typeof types] || type;
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 bg-white border-b border-gray-200 sm:px-6">
      <div className="flex items-center md:hidden">
        <button
          className="inline-flex items-center justify-center p-2 text-gray-500 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={openSidebar}
        >
          <span className="sr-only">Otwórz menu</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <div className="hidden md:flex md:items-center md:space-x-4">
        {/* EstablishmentSelector now gets its data from context */}
        <EstablishmentSelector /> 
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            className="p-1 text-gray-500 bg-white rounded-full hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <span className="sr-only">Zobacz powiadomienia</span>
            <Bell className="w-6 h-6" />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 z-10 w-80 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-4 py-3">
                <h3 className="text-sm font-medium text-gray-900">Powiadomienia</h3>
              </div>
              <div className="py-1 max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-2 text-sm text-gray-500">Brak powiadomień</div>
                ) : (
                  notifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 ${
                        !notification.read ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          {notification.type === 'warning' && (
                            <div className="p-1 text-yellow-500 bg-yellow-100 rounded-full">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                          {notification.type === 'info' && (
                            <div className="p-1 text-blue-500 bg-blue-100 rounded-full">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                          {notification.type === 'error' && (
                            <div className="p-1 text-red-500 bg-red-100 rounded-full">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                          {notification.type === 'success' && (
                            <div className="p-1 text-green-500 bg-green-100 rounded-full">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="ml-3 w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                          <p className="mt-1 text-xs text-gray-400">{new Date(notification.date).toLocaleDateString('pl-PL')}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="px-4 py-2">
                <button className="w-full px-4 py-2 text-sm font-medium text-center text-primary hover:bg-primary/5 rounded-md">
                  Zobacz wszystkie powiadomienia
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative ml-3">
          <div>
            <button
              className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <span className="sr-only">Abrir menú de usuario</span>
              <div className="p-1 bg-gray-100 rounded-full">
                {currentUser?.profileImage ? (
                  <img 
                    src={currentUser.profileImage} 
                    alt={currentUser.name} 
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <User className="w-6 h-6 text-gray-600" />
                )}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">
                {currentUser?.name || 'Usuario'}
              </span>
              <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
            </button>
          </div>

          {showUserMenu && (
            <div className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-4 py-2 text-sm text-gray-900 border-b border-gray-100">
                <p className="font-medium">{currentUser?.name}</p>
                <p className="text-xs text-gray-500">{currentUser?.email}</p>
              </div>
              <a
                href="/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
