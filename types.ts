
import * as d3 from 'd3';

export enum StructureCategory {
  LINEAR = 'Linear',
  NON_LINEAR = 'Non-Linear',
  HASH_BASED = 'Hash-Based'
}

export type StructureType = 
  | 'Array' | 'Linked List' | 'Stack' | 'Queue' 
  | 'Binary Tree' | 'Graph' 
  | 'Hash Map' | 'Set';

export interface DataNode {
  id: string;
  value: string | number;
  next?: string;
  children?: string[];
}

// Added d3 import to satisfy SimulationNodeDatum type
export interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
}

// Added d3 import to satisfy SimulationLinkDatum type
export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string;
  target: string;
}
