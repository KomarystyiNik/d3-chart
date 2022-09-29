import { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';

import { LINE_COLORS, VisitData } from './constants';

export interface ChartProps {
  data: VisitData[];
}

const drawLine = (
  data: VisitData[],
  key: 'monthly' | 'weekly' | 'daily',
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  xScale: d3.ScaleTime<number, number, never>,
  yScale: d3.ScaleLinear<number, number, never>,
  tooltip: d3.Selection<HTMLDivElement, unknown, null, undefined>
) => {
  const generateLine = d3
    .line<VisitData>()
    .x((d) => xScale(new Date(d.date)))
    .y((d) => yScale(d[key]))
    .curve(d3.curveCardinal);

  svg
    .selectAll('.line')
    .data([data])
    .join('path')
    .attr('d', generateLine)
    .attr('fill', 'none')
    .attr('stroke-width', '2')
    .attr('stroke', LINE_COLORS[key]);

  svg
    .selectAll(`.dot-${key}`)
    .data(data)
    .enter()
    .append('circle')
    .attr('class', `dot-${key}`)
    .attr('r', 5)
    .attr('fill', 'white')
    .attr('stroke', LINE_COLORS[key])
    .attr('stroke-width', '2')
    .attr('cx', (d) => xScale(new Date(d.date)))
    .attr('cy', (d) => yScale(d[key]))
    .on('mouseover', (event, d) => {
      const clientRect = (
        event.target as SVGCircleElement
      ).getBoundingClientRect();

      tooltip
        .style('visibility', 'visible')
        .style('left', clientRect.left + 'px')
        .style('top', clientRect.top + 'px')
        .text(d[key]);
    })
    .on('mouseout', () => {
      tooltip.style('visibility', 'hidden');
    });
};

export const Chart: FC<ChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !tooltipRef.current) return;

    const width = 600;
    const height = 300;
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('overflow', 'visible');

    const xScale = d3
      .scaleTime()
      .range([0, width])
      .domain(d3.extent(data, (d) => new Date(d.date)) as [Date, Date]);
    const yScale = d3.scaleLinear().range([height, 0]).domain([0, 1500]);

    const tooltip = d3.select(tooltipRef.current);

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(data.length - 1)
      .tickPadding(16)
      .tickSizeInner(0)
      .tickSizeOuter(0);
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(4)
      .tickPadding(10)
      .tickSizeInner(0)
      .tickSizeOuter(0);

    svg.append('g').attr('class', 'yAxis').attr('color', '#666').call(yAxis);
    svg
      .append('g')
      .attr('class', 'xAxis')
      .attr('stroke', '#666')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    d3.selectAll('g.yAxis g.tick')
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', width)
      .attr('y2', 0)
      .attr('stroke', '#f5f5f5');
    d3.selectAll('g.xAxis g.tick:not(:nth-child(2))')
      .append('line')
      .attr('x1', 0)
      .attr('y1', -height)
      .attr('x2', 0)
      .attr('y2', 0)
      .attr('stroke', '#f5f5f5');

    drawLine(data, 'daily', svg, xScale, yScale, tooltip);
    drawLine(data, 'monthly', svg, xScale, yScale, tooltip);
    drawLine(data, 'weekly', svg, xScale, yScale, tooltip);
  }, [data]);

  return (
    <>
      <svg ref={svgRef} />
      <div className="tooltip" ref={tooltipRef}></div>
    </>
  );
};
