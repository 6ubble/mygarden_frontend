import { AlertTriangle, Thermometer, Clock } from 'lucide-react';
import { type FrostAlertData } from '../../shared/api/weather/frostAlertApi';

interface FrostAlertCardProps {
  alert: FrostAlertData | null;
  isLoading: boolean;
}

export function FrostAlertCard({ alert, isLoading }: FrostAlertCardProps) {
  // Если нет заморозков или идёт загрузка - не показываем карточку
  if (isLoading || !alert || !alert.isFrost) {
    return null;
  }

  return (
    <div className="mb-8 bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 rounded-lg shadow-md p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-orange-900 mb-2">
            🧊 Внимание: Заморозки в {alert.city}!
          </h3>
          
          <p className="text-orange-800 mb-3">
            Завтра ночью ожидается падение температуры ниже нуля. 
            Рекомендуем защитить чувствительные растения.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 bg-white bg-opacity-60 px-3 py-2 rounded">
              <Thermometer className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-xs text-orange-700 font-semibold">Минимум</p>
                <p className="text-lg font-bold text-orange-900">{alert.temp}°C</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white bg-opacity-60 px-3 py-2 rounded">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-xs text-orange-700 font-semibold">Самый холодный час</p>
                <p className="text-lg font-bold text-orange-900">{alert.time}</p>
              </div>
            </div>
          </div>

          <div className="mt-3 text-sm text-orange-700">
            <p>💡 Совет: Переместите горшки в помещение или накройте растения агроволокном</p>
          </div>
        </div>
      </div>
    </div>
  );
}