import { FC } from 'react';

import { LINE_COLORS, VisitDataKeys } from './constants';

const valueFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
});

export interface ChartTagProps {
  name: VisitDataKeys;
  value: number;
}

export const ChartTag: FC<ChartTagProps> = ({ name, value }) => {
  return (
    <div className="tag" style={{ ['--tag-color' as any]: LINE_COLORS[name] }}>
      <span className="tag__name">{name}</span>
      <span className="tag__value">{valueFormatter.format(value)}</span>
    </div>
  );
};
