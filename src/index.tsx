import { FC, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { Chart } from './Chart';
import { ChartTag } from './ChartTag';
import { visitData, VisitDataKeys } from './constants';
import './index.css';

const App = () => {
  const totalVisits = useMemo(
    () =>
      visitData.reduce(
        (acc, current) => {
          acc.daily += current.daily;
          acc.weekly += current.weekly;
          acc.monthly += current.monthly;

          return acc;
        },
        {
          monthly: 0,
          weekly: 0,
          daily: 0,
        }
      ),
    []
  );

  return (
    <section className="chart">
      <header className="chart__header">
        <h1 className="chart__title">Active community member</h1>
        <div className="chart__total-info">
          {(Object.keys(totalVisits) as VisitDataKeys[]).map((key) => (
            <ChartTag key={key} name={key} value={totalVisits[key]} />
          ))}
        </div>
      </header>
      <Chart data={visitData} />
    </section>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
);
