import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface EventItem {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'exam' | 'event' | 'class' | 'study' | string;
}

interface UpcomingEventsProps {
  events: EventItem[];
}

const getEventStatusColor = (type: string) => {
  switch (type) {
    case 'exam':
      return 'bg-red-100 text-red-800';
    case 'event':
      return 'bg-purple-100 text-purple-800';
    case 'class':
      return 'bg-blue-100 text-blue-800';
    case 'study':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const CalendarEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Calendar className="h-5 w-5 text-purple-500 mr-2" />
          Upcoming Events
        </h2>
        <Link to="/calendar" className="text-sm font-medium text-blue-600 hover:underline">
          Full Calendar
        </Link>
      </div>

      <ul className="divide-y">
        {events.map((event) => {
          const [day, month] = event.date.split(',')[0].split(' ');
          return (
            <li key={event.id} className="flex px-5 py-4 gap-4">
              <div className="text-center bg-gray-100 rounded-lg px-3 py-2 min-w-[56px]">
                <p className="text-xs font-medium text-gray-600">{day}</p>
                <p className="text-sm font-bold text-gray-900">{month}</p>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900">{event.title}</h3>
                <div className="flex items-center text-xs text-gray-600 mt-1 space-x-3">
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {event.time}
                  </span>
                  {event.location && (
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {event.location}
                    </span>
                  )}
                </div>
                <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full font-medium ${getEventStatusColor(event.type)}`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CalendarEvents;
