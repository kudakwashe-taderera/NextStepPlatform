import React from 'react';

interface SummaryCardsProps {
  gpa: number;
  credits: number;
  degreeProgress: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ gpa, credits, degreeProgress }) => {
  const cards = [
    {
      label: 'Current GPA',
      value: gpa.toFixed(2),
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      label: 'Total Credits',
      value: credits,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      label: 'Degree Progress',
      value: `${degreeProgress}%`,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`flex flex-col items-center justify-center text-center px-4 py-6 rounded-xl border shadow-sm ${card.bg}`}
        >
          <p className="text-sm text-gray-600">{card.label}</p>
          <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
