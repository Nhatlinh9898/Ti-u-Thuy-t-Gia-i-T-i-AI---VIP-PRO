import React from 'react';
import { NovelNode } from '../types';

interface TreeRendererProps {
  node: NovelNode;
  selectedId: string | null;
  onSelect: (node: NovelNode) => void;
  onToggle: (nodeId: string) => void;
  onAddChild?: (parentNodeId: string) => void;
  onDeleteNode?: (nodeId: string) => void;
  depth?: number;
}

export const TreeRenderer: React.FC<TreeRendererProps> = ({
  node,
  selectedId,
  onSelect,
  onToggle,
  onAddChild,
  onDeleteNode,
  depth = 0
}) => {
  const isSelected = selectedId === node.id;
  const hasChildren = node.children && node.children.length > 0;
  const wordCount = (node.content || '').trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="select-none text-xs">
      <div
        className={`
          flex items-center justify-between py-2 px-2.5 cursor-pointer transition-all duration-200 border-l-2 group
          ${
            isSelected
              ? 'bg-purple-950/60 border-vip-accent text-vip-gold shadow-sm font-medium'
              : 'border-transparent text-gray-300 hover:bg-white/5 hover:text-white'
          }
        `}
        style={{ paddingLeft: `${depth * 1.25 + 0.5}rem` }}
        onClick={() => onSelect(node)}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggle(node.id);
            }}
            className={`w-4 h-4 flex items-center justify-center text-gray-400 hover:text-white transition-transform ${
              node.isExpanded ? 'rotate-90 text-vip-gold' : ''
            }`}
          >
            {hasChildren ? '▶' : '•'}
          </button>

          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-mono uppercase text-purple-400 font-semibold tracking-wider">
              {node.type}
            </span>
            <span className="truncate font-medium text-gray-200 group-hover:text-white">
              {node.title}
            </span>
          </div>
        </div>

        {/* Badges & Actions */}
        <div className="flex items-center gap-1.5 ml-2 opacity-80 group-hover:opacity-100">
          {wordCount > 0 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700">
              {wordCount} từ
            </span>
          )}

          {onAddChild && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddChild(node.id);
              }}
              className="w-5 h-5 flex items-center justify-center rounded hover:bg-purple-800/50 text-gray-400 hover:text-vip-gold text-xs transition-colors"
              title="Thêm mục con"
            >
              +
            </button>
          )}

          {onDeleteNode && depth > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`Bạn có chắc muốn xóa "${node.title}"?`)) {
                  onDeleteNode(node.id);
                }
              }}
              className="w-5 h-5 flex items-center justify-center rounded hover:bg-red-900/50 text-gray-500 hover:text-red-300 text-xs transition-colors"
              title="Xóa mục này"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {node.isExpanded && hasChildren && (
        <div>
          {node.children.map((child) => (
            <TreeRenderer
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
              onToggle={onToggle}
              onAddChild={onAddChild}
              onDeleteNode={onDeleteNode}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
