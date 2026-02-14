
import React from 'react';
import { StructureType } from '../types';

interface HashVisualizerProps {
  type: StructureType;
}

const HashVisualizer: React.FC<HashVisualizerProps> = ({ type }) => {
  const sampleData = type === 'Hash Map' 
    ? { "name": "Alice", "id": "101", "role": "Dev", "city": "NYC" }
    : ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

  const hashFunction = (key: string) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) hash += key.charCodeAt(i);
    return hash % 8;
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-slate-800/50 rounded-2xl border border-slate-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Bucket Visualization */}
        <div className="space-y-4">
          <h4 className="text-slate-400 font-semibold uppercase text-xs tracking-wider">Internal Storage (Buckets)</h4>
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center bg-slate-900 border border-slate-700 rounded text-sky-400 font-mono text-sm">
                  {i}
                </div>
                <div className="flex-1 h-10 bg-slate-800/80 rounded border border-slate-700/50 flex items-center px-4 overflow-hidden">
                  {type === 'Hash Map' ? (
                    Object.entries(sampleData).map(([k, v]) => hashFunction(k) === i && (
                      <span key={k} className="bg-sky-500/20 text-sky-300 text-xs px-2 py-1 rounded border border-sky-500/30 mr-2 whitespace-nowrap">
                        {k}: {v}
                      </span>
                    ))
                  ) : (
                    (sampleData as string[]).map((v) => hashFunction(v) === i && (
                      <span key={v} className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-1 rounded border border-emerald-500/30 mr-2 whitespace-nowrap">
                        {v}
                      </span>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Abstract View */}
        <div className="space-y-4">
          <h4 className="text-slate-400 font-semibold uppercase text-xs tracking-wider">User View ({type})</h4>
          <div className="p-6 bg-slate-900 rounded-xl border border-slate-700 font-mono text-sm shadow-inner min-h-[300px]">
            {type === 'Hash Map' ? (
              <div className="space-y-2">
                <div className="text-slate-500">{"{"}</div>
                {Object.entries(sampleData).map(([k, v], i) => (
                  <div key={k} className="pl-4">
                    <span className="text-sky-300">"{k}"</span>: <span className="text-amber-300">"{v}"</span>{i < 3 ? ',' : ''}
                  </div>
                ))}
                <div className="text-slate-500">{"}"}</div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-slate-500">{"["}</div>
                {(sampleData as string[]).map((v, i) => (
                  <div key={v} className="pl-4 text-emerald-300">
                    "{v}"{i < 4 ? ',' : ''}
                  </div>
                ))}
                <div className="text-slate-500">{"]"}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-slate-300 text-sm max-w-2xl text-center">
        {type === 'Hash Map' ? 
          "A structure that maps unique keys to values using a hash function. Average O(1) time complexity for lookup, insert, and delete." :
          "An unordered collection of unique elements. Fast existence checking and duplication prevention using hash tables internally."
        }
      </div>
    </div>
  );
};

export default HashVisualizer;
