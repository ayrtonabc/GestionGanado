import React from 'react';

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  type: 'breeding' | 'birth' | 'health' | 'movement' | 'other';
  description: string;
  animalId?: string;
  animalName?: string;
}

interface EventsTimelineProps {
  events: TimelineEvent[];
}

const EventsTimeline: React.FC<EventsTimelineProps> = ({ events }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'breeding':
        return (
          <div className="p-1 text-pink-500 bg-pink-100 rounded-full">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        );
      case 'birth':
        return (
          <div className="p-1 text-blue-500 bg-blue-100 rounded-full">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        );
      case 'health':
        return (
          <div className="p-1 text-red-500 bg-red-100 rounded-full">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        );
      case 'movement':
        return (
          <div className="p-1 text-green-500 bg-green-100 rounded-full">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-1 text-gray-500 bg-gray-100 rounded-full">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  {getEventIcon(event.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{event.title}</div>
                      {event.animalName && (
                        <div className="text-sm text-gray-500">
                          Animal: {event.animalName} ({event.animalId})
                        </div>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    <p>{event.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsTimeline;
