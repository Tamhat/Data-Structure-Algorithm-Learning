
import React, { useState, useEffect } from 'react';
import { StructureType } from '../types';

interface LinearVisualizerProps {
  type: StructureType;
}

const LinearVisualizer: React.FC<LinearVisualizerProps> = ({ type }) => {
  const [elements, setElements] = useState<number[]>([10, 20, 30, 40]);
  const [inputValue, setInputValue] = useState('');

  const handlePush = () => {
    if (!inputValue) return;
    const val = parseInt(inputValue);
    if (isNaN(val)) return;

    if (type === 'Stack') {
      setElements([...elements, val]);
    } else if (type === 'Queue') {
      setElements([...elements, val]);
    } else {
      setElements([...elements, val]);
    }
    setInputValue('');
  };

  const handlePop = () => {
    if (elements.length === 0) return;
    if (type === 'Stack') {
      setElements(elements.slice(0, -1));
    } else if (type === 'Queue') {
      setElements(elements.slice(1));
    } else {
      setElements(elements.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-8 bg-slate-800/50 rounded-2xl border border-slate-700">
      <div className="flex space-x-4">
        <input 
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter number"
          className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg text-white outline-none focus:ring-2 focus:ring-sky-500 w-32"
        />
        <button 
          onClick={handlePush}
          className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg transition-all font-medium"
        >
          {type === 'Stack' ? 'Push' : type === 'Queue' ? 'Enqueue' : 'Add'}
        </button>
        <button 
          onClick={handlePop}
          className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg transition-all font-medium"
        >
          {type === 'Stack' ? 'Pop' : type === 'Queue' ? 'Dequeue' : 'Remove'}
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 min-h-[120px] w-full">
        {elements.map((el, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center animate-bounce-in">
              <div className="w-16 h-16 bg-sky-500 flex items-center justify-center rounded-lg shadow-lg shadow-sky-900/40 text-xl font-bold border-2 border-sky-300">
                {el}
              </div>
              <span className="mt-2 text-xs text-slate-400 font-mono">[{i}]</span>
            </div>
            {type === 'Linked List' && i < elements.length - 1 && (
              <div className="text-sky-400 text-2xl">→</div>
            )}
          </React.Fragment>
        ))}
        {elements.length === 0 && (
          <p className="text-slate-500 italic">Structure is empty...</p>
        )}
      </div>

      <div className="w-full text-slate-300 text-sm leading-relaxed max-w-2xl text-center">
        {type === 'Stack' && "LIFO (Last In First Out). The last element added is the first one removed."}
        {type === 'Queue' && "FIFO (First In First Out). The first element added is the first one removed."}
        {type === 'Array' && "Fixed-size or dynamic sequential memory allocation accessed by index."}
        {type === 'Linked List' && "Nodes connected via pointers. Dynamic size, O(1) insertion at head/tail if reference is held."}
      </div>
    </div>
  );
};

export default LinearVisualizer;
