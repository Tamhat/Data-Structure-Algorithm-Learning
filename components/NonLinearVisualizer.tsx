
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { GraphNode, GraphLink, StructureType } from '../types';

interface NonLinearVisualizerProps {
  type: StructureType;
}

const NonLinearVisualizer: React.FC<NonLinearVisualizerProps> = ({ type }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 400;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous

    if (type === 'Binary Tree') {
      const data = {
        name: "10",
        children: [
          { name: "5", children: [{ name: "2" }, { name: "7" }] },
          { name: "15", children: [{ name: "12" }, { name: "20" }] }
        ]
      };

      const treeLayout = d3.tree().size([width - 100, height - 100]);
      const root = d3.hierarchy(data);
      treeLayout(root);

      const g = svg.append("g").attr("transform", "translate(50, 50)");

      g.selectAll(".link")
        .data(root.links())
        .enter()
        .append("path")
        .attr("class", "link-line")
        .attr("d", d3.linkVertical().x(d => d.x).y(d => d.y) as any);

      const nodes = g.selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("transform", d => `translate(${d.x},${d.y})`);

      nodes.append("circle")
        .attr("r", 20)
        .attr("class", "node-circle");

      nodes.append("text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("class", "node-text")
        .text(d => d.data.name);

    } else if (type === 'Graph') {
      const nodesData: GraphNode[] = [
        { id: 'A', name: 'A' }, { id: 'B', name: 'B' }, 
        { id: 'C', name: 'C' }, { id: 'D', name: 'D' },
        { id: 'E', name: 'E' }
      ];
      const linksData: GraphLink[] = [
        { source: 'A', target: 'B' }, { source: 'B', target: 'C' },
        { source: 'C', target: 'D' }, { source: 'D', target: 'A' },
        { source: 'A', target: 'E' }, { source: 'C', target: 'E' }
      ];

      const simulation = d3.forceSimulation<GraphNode>(nodesData)
        .force("link", d3.forceLink<GraphNode, GraphLink>(linksData).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2));

      const link = svg.append("g")
        .selectAll("line")
        .data(linksData)
        .enter().append("line")
        .attr("class", "link-line");

      const node = svg.append("g")
        .selectAll("g")
        .data(nodesData)
        .enter().append("g")
        .call(d3.drag<SVGGElement, GraphNode>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }) as any);

      node.append("circle")
        .attr("r", 20)
        .attr("class", "node-circle");

      node.append("text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("class", "node-text")
        .text(d => d.name);

      simulation.on("tick", () => {
        link
          .attr("x1", d => (d.source as any).x)
          .attr("y1", d => (d.source as any).y)
          .attr("x2", d => (d.target as any).x)
          .attr("y2", d => (d.target as any).y);

        node.attr("transform", d => `translate(${d.x},${d.y})`);
      });
    }

  }, [type]);

  return (
    <div className="flex flex-col items-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-sky-400">{type} Visualization</h3>
        <p className="text-sm text-slate-400">Interactive structure simulation</p>
      </div>
      <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-inner">
        <svg ref={svgRef} width="600" height="400" className="max-w-full h-auto" />
      </div>
      <div className="mt-6 text-slate-300 text-sm max-w-2xl text-center leading-relaxed">
        {type === 'Binary Tree' ? 
          "A hierarchical structure where each node has at most two children (left and right). Efficient for searching and sorting (BST)." :
          "A collection of nodes (vertices) and edges that connect them. Represents complex relationships like social networks or internet topology."
        }
      </div>
    </div>
  );
};

export default NonLinearVisualizer;
