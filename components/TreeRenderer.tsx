import React from 'react';
import { NovelNode } from '../types';

interface TreeRendererProps {
  node: NovelNode;
  selectedId: string | null;
  onSelect: (node: NovelNode) => void;
  onToggle: (nodeId: string) => void;
  depth?: number;
}

export const TreeRenderer: React.FC<TreeRendererProps> = ({ node, selectedId, onSelect, onToggle, depth = 0 }) => {
  const isSelected = selectedId === node.id;
  const hasChildren = node.children.length > 0;

  return (
    <div className="select-none">
      <div 
        className={`
          flex items-center gap-2 py-2 px-3 cursor-pointer transition-colors duration-200 border-l-2
          ${isSelected ? 'bg-vip-purple/20 border-vip-accent text-vip-gold' : 'border-transparent text-gray-300 hover:bg-white/5'}
        `}
        style={{ paddingLeft: `${depth * 1.5 + 0.5}rem` }}
        onClick={() => onSelect(node)}
      >
        <span 
          onClick={(e) => { e.stopPropagation(); onToggle(node.id); }}
          className={`text-gray-500 hover:text-white transition-transform duration-200 ${node.isExpanded ? 'rotate-90' : ''}`}
        >
          {hasChildren ? '▶' : '•'}
        </span>
        <div className="flex flex-col">
            <span className="text-xs font-mono uppercase text-gray-500 tracking-wider">{node.type}</span>
            <span className="font-medium truncate max-w-[200px]">{node.title}</span>
        </div>
      </div>

      {node.isExpanded && hasChildren && (
        <div>
          {node.children.map(child => (
            <TreeRenderer 
              key={child.id} 
              node={child} 
              selectedId={selectedId} 
              onSelect={onSelect} 
              onToggle={onToggle}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
