export type VisitData = {
  date: string;
  monthly: number;
  weekly: number;
  daily: number;
};

export type VisitDataKeys = Exclude<keyof VisitData, 'date'>;

export const LINE_COLORS: Record<VisitDataKeys, string> = {
  monthly: 'blue',
  weekly: 'blueviolet',
  daily: 'violet',
};

export const visitData: VisitData[] = [
  {
    date: '2022-05-29T00:00:00.000+03:00',
    monthly: 700,
    weekly: 1200,
    daily: 500,
  },
  {
    date: '2022-06-05T00:00:00.000+03:00',
    monthly: 800,
    weekly: 1300,
    daily: 650,
  },
  {
    date: '2022-06-12T00:00:00.000+03:00',
    monthly: 850,
    weekly: 1150,
    daily: 500,
  },
  {
    date: '2022-06-19T00:00:00.000+03:00',
    monthly: 650,
    weekly: 1200,
    daily: 550,
  },
  {
    date: '2022-06-26T00:00:00.000+03:00',
    monthly: 800,
    weekly: 1300,
    daily: 600,
  },
];
