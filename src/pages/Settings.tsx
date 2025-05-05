import React from 'react';
import { User, Building2, Bell, Shield, Database, Printer } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-900">Ustawienia</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                <h2 className="text-lg font-medium text-gray-900">Profil użytkownika</h2>
              </div>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Imię i nazwisko</label>
                  <input type="text" className="input" defaultValue="Jan Kowalski" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="input" defaultValue="jan@example.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Telefon</label>
                  <input type="tel" className="input" defaultValue="+48 123 456 789" />
                </div>
                <button type="submit" className="btn btn-primary">
                  Zapisz zmiany
                </button>
              </form>
            </div>
          </div>

          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-primary" />
                <h2 className="text-lg font-medium text-gray-900">Dane gospodarstwa</h2>
              </div>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Nazwa gospodarstwa</label>
                  <input type="text" className="input" defaultValue="Gospodarstwo Kowalski" />
                </div>
                <div className="form-group">
                  <label className="form-label">Adres</label>
                  <input type="text" className="input" defaultValue="ul. Rolna 1" />
                </div>
                <div className="form-group">
                  <label className="form-label">NIP</label>
                  <input type="text" className="input" defaultValue="123-456-78-90" />
                </div>
                
                <button type="submit" className="btn btn-primary">
                  Zapisz zmiany
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-primary" />
                <h2 className="text-lg font-medium text-gray-900">Powiadomienia</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-500">Otrzymuj powiadomienia email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">SMS</p>
                    <p className="text-sm text-gray-500">Otrzymuj powiadomienia SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary" />
                <h2 className="text-lg font-medium text-gray-900">Bezpieczeństwo</h2>
              </div>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Aktualne hasło</label>
                  <input type="password" className="input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Nowe hasło</label>
                  <input type="password" className="input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Potwierdź nowe hasło</label>
                  <input type="password" className="input" />
                </div>
                <button type="submit" className="btn btn-primary">
                  Zmień hasło
                </button>
              </form>
            </div>
          </div>

          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <Printer className="w-5 h-5 mr-2 text-primary" />
                <h2 className="text-lg font-medium text-gray-900">Preferencje wydruku</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Format papieru</label>
                  <select className="select">
                    <option>A4</option>
                    <option>A5</option>
                    <option>Letter</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Orientacja</label>
                  <select className="select">
                    <option>Pionowa</option>
                    <option>Pozioma</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
