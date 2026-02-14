
import React, { useState } from 'react';
import { StructureCategory, StructureType } from './types';
import LinearVisualizer from './components/LinearVisualizer';
import NonLinearVisualizer from './components/NonLinearVisualizer';
import HashVisualizer from './components/HashVisualizer';
import GeminiChat from './components/GeminiChat';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<StructureCategory>(StructureCategory.LINEAR);
  const [activeType, setActiveType] = useState<StructureType>('Array');

  const categories = [
    { 
      name: StructureCategory.LINEAR, 
      types: ['Array', 'Linked List', 'Stack', 'Queue'] as StructureType[],
      description: "Sequential arrangement of elements."
    },
    { 
      name: StructureCategory.NON_LINEAR, 
      types: ['Binary Tree', 'Graph'] as StructureType[],
      description: "Hierarchical or networked connections."
    },
    { 
      name: StructureCategory.HASH_BASED, 
      types: ['Hash Map', 'Set'] as StructureType[],
      description: "Key-based fast access storage."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass sticky top-0 z-50 p-6 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-sky-900/40">
              DS
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">DataViz Explorer</h1>
              <p className="text-xs text-sky-400 font-medium uppercase tracking-widest">Master Data Structures</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-1 bg-slate-900/50 p-1 rounded-xl border border-slate-700">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveCategory(cat.name);
                  setActiveType(cat.types[0]);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeCategory === cat.name 
                    ? 'bg-sky-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Visualizer Area */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex flex-col space-y-2">
              <h2 className="text-3xl font-extrabold text-white">{activeType}</h2>
              <p className="text-slate-400 max-w-2xl">
                Exploring <span className="text-sky-400 font-semibold">{activeCategory}</span> data structures. Select a specific implementation below to visualize how it operates.
              </p>
            </div>

            {/* Type Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.find(c => c.name === activeCategory)?.types.map(type => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
                    activeType === type
                      ? 'bg-sky-500/10 border-sky-500 text-sky-400'
                      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-slate-800'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Dynamic Visualizer Render */}
            <div className="mt-8 transition-opacity duration-300">
              {activeCategory === StructureCategory.LINEAR && (
                <LinearVisualizer type={activeType} />
              )}
              {activeCategory === StructureCategory.NON_LINEAR && (
                <NonLinearVisualizer type={activeType} />
              )}
              {activeCategory === StructureCategory.HASH_BASED && (
                <HashVisualizer type={activeType} />
              )}
            </div>

            {/* Summary Table View */}
            <div className="mt-16 p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Comparison Summary</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500 font-medium">
                      <th className="pb-4">Structure</th>
                      <th className="pb-4">Best Use Case</th>
                      <th className="pb-4">Access Time</th>
                      <th className="pb-4">Search Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300 divide-y divide-slate-800/50">
                    <tr>
                      <td className="py-4 font-semibold text-white">Array</td>
                      <td className="py-4">Known size, index-based access</td>
                      <td className="py-4 font-mono text-sky-400">O(1)</td>
                      <td className="py-4 font-mono text-amber-400">O(n)</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-semibold text-white">BST</td>
                      <td className="py-4">Ordered data, fast lookup</td>
                      <td className="py-4 font-mono text-sky-400">O(log n)</td>
                      <td className="py-4 font-mono text-sky-400">O(log n)</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-semibold text-white">Hash Map</td>
                      <td className="py-4">Key-value mapping, database indexing</td>
                      <td className="py-4 font-mono text-sky-400">O(1) avg</td>
                      <td className="py-4 font-mono text-sky-400">O(1) avg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* AI Tutor Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <span className="bg-sky-500/20 text-sky-400 p-1.5 rounded-lg mr-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                AI Study Assistant
              </h3>
              <GeminiChat />
              <div className="mt-6 p-4 rounded-2xl bg-slate-800/30 border border-slate-700/50">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Did you know?</h4>
                <p className="text-sm text-slate-400 leading-relaxed italic">
                  Most modern database indexes are built using B-Trees or Hash tables, which allows them to find your data among millions of records in milliseconds!
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800 py-12 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-sm">
            © 2024 DataViz Explorer • Powered by Gemini 3
          </div>
          <div className="flex space-x-6 text-slate-400">
            <a href="#" className="hover:text-sky-400 transition-colors">Documentation</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Github</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
