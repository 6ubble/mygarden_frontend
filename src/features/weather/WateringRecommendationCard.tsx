import { Cloud, Droplets, Thermometer } from 'lucide-react';
import { type WateringAlertData } from '../../shared/api/weather/wateringAlertApi';

interface WateringRecommendationCardProps {
  alert: WateringAlertData | null;
  isLoading: boolean;
}

export function WateringRecommendationCard({ alert, isLoading }: WateringRecommendationCardProps) {
  // Если нет рекомендации или идёт загрузка - не показываем
  if (isLoading || !alert || !alert.recommendation.recommendation) {
    return null;
  }

  const rec = alert.recommendation;
  const isRain = alert.rain.isRain;
  const isHeat = alert.heat.isHeat;

  if (isRain) {
    return (
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-lg shadow-md p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <Cloud className="w-6 h-6 text-blue-600" />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold text-blue-900 mb-2">
              🌧️ Дождик спасёт!
            </h3>

            <p className="text-blue-800 mb-3">
              {rec.recommendation}
            </p>

            <div className="flex items-center gap-3 bg-white bg-opacity-60 px-3 py-2 rounded w-fit">
              <Droplets className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs text-blue-700 font-semibold">Ожидаемые осадки</p>
                <p className="text-lg font-bold text-blue-900">{alert.rain.totalRain} мм</p>
              </div>
            </div>

            <div className="mt-3 text-sm text-blue-700">
              <p>✅ Растения получат необходимую влагу. Поливать не нужно!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isHeat) {
    const bgColor = alert.heat.isExtreme 
      ? 'from-red-50 to-red-100 border-red-500' 
      : 'from-yellow-50 to-yellow-100 border-yellow-500';
    
    const textColor = alert.heat.isExtreme 
      ? 'text-red-900 text-red-700' 
      : 'text-yellow-900 text-yellow-700';

    const borderColor = alert.heat.isExtreme ? 'border-l-4 border-red-500' : 'border-l-4 border-yellow-500';

    return (
      <div className={`mb-8 bg-gradient-to-r ${bgColor} ${borderColor} rounded-lg shadow-md p-6`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <Thermometer className={`w-6 h-6 ${alert.heat.isExtreme ? 'text-red-600' : 'text-yellow-600'}`} />
          </div>

          <div className="flex-1">
            <h3 className={`text-lg font-bold ${textColor.split(' ')[0]} mb-2`}>
              {alert.heat.isExtreme ? '🔥 Экстремальная жара!' : '☀️ Очень жарко!'}
            </h3>

            <p className={textColor.split(' ')[1]}>
              {rec.recommendation}
            </p>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className={`flex items-center gap-2 bg-white bg-opacity-60 px-3 py-2 rounded`}>
                <Thermometer className={`w-5 h-5 ${alert.heat.isExtreme ? 'text-red-600' : 'text-yellow-600'}`} />
                <div>
                  <p className={`text-xs font-semibold ${textColor.split(' ')[1]}`}>Максимум</p>
                  <p className={`text-lg font-bold ${textColor.split(' ')[0]}`}>{alert.heat.maxTemp}°C</p>
                </div>
              </div>

              <div className={`flex items-center gap-2 bg-white bg-opacity-60 px-3 py-2 rounded`}>
                <Droplets className={`w-5 h-5 ${alert.heat.isExtreme ? 'text-red-600' : 'text-yellow-600'}`} />
                <div>
                  <p className={`text-xs font-semibold ${textColor.split(' ')[1]}`}>Влажность</p>
                  <p className={`text-lg font-bold ${textColor.split(' ')[0]}`}>{alert.heat.humidity}%</p>
                </div>
              </div>
            </div>

            <div className={`mt-3 text-sm ${textColor.split(' ')[1]}`}>
              <p>💡 Совет: Полейте растения вечером, когда жара спадёт. Это поможет им пережить день.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}