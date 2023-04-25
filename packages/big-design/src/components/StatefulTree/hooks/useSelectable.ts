'use client';

import { useEffect, useState } from 'react';

import { depthFirstSearch } from '../../../utils';
import { TreeNodeId, TreeSelectable } from '../../Tree';
import { StatefulTreeProps } from '../StatefulTree';

interface UseSelectableProps<T> {
  defaultSelected: StatefulTreeProps<T>['defaultSelected'];
  disabledNodes: StatefulTreeProps<T>['disabledNodes'];
  nodes: StatefulTreeProps<T>['nodes'];
  onSelectionChange?: StatefulTreeProps<T>['onSelectionChange'];
  type: StatefulTreeProps<T>['selectable'];
}

interface GetDefaultSelectedValuesProps<T> extends Pick<UseSelectableProps<T>, 'nodes' | 'type'> {
  selectedNodes: TreeNodeId[];
}

const getDefaultSelectedValues = <T>({
  nodes,
  selectedNodes,
  type,
}: GetDefaultSelectedValuesProps<T>) => {
  if (type === 'radio') {
    const selectedNode = depthFirstSearch(
      nodes,
      ({ id, value }) => selectedNodes.includes(id) && value !== undefined,
    );

    if (selectedNode && selectedNode.value !== undefined) {
      return [selectedNode.value];
    }
  }

  if (type === 'multi') {
    return (
      depthFirstSearch(
        nodes,
        ({ id, value }) => selectedNodes.includes(id) && value !== undefined,
        false,
      )?.reduce<T[]>((acc, node) => (node.value !== undefined ? [...acc, node.value] : acc), []) ??
      []
    );
  }

  return [];
};

export const useSelectable = <T>({
  defaultSelected,
  disabledNodes,
  nodes,
  onSelectionChange,
  type,
}: UseSelectableProps<T>) => {
  const [selectedNodes, setSelectedNodes] = useState(defaultSelected ?? []);
  const [selectedValues, setSelectedValues] = useState<T[]>(() =>
    type ? getDefaultSelectedValues({ nodes, selectedNodes, type }) : [],
  );

  useEffect(() => {
    if (defaultSelected) {
      setSelectedNodes(defaultSelected);
      setSelectedValues(getDefaultSelectedValues({ nodes, selectedNodes: defaultSelected, type }));
    }
  }, [defaultSelected, nodes, type]);

  useEffect(() => {
    if (type === 'radio') {
      if (selectedNodes.length >= 1) {
        setSelectedNodes((prevSelected) => prevSelected.slice(0, 1));
        setSelectedValues((prevValues) => prevValues.slice(0, 1));
      } else if (nodes.length) {
        const firstSelectedNode = depthFirstSearch(nodes, (node) => node.value !== undefined, true);

        // Need to check for undefined value since TS can't determine from DFS check.
        if (firstSelectedNode && firstSelectedNode.value !== undefined) {
          setSelectedNodes([firstSelectedNode.id]);
          setSelectedValues([firstSelectedNode.value]);
        }
      }
    }
  }, [nodes, selectedNodes.length, setSelectedNodes, type]);

  useEffect(() => {
    if (typeof onSelectionChange === 'function') {
      onSelectionChange(selectedValues);
    }
  }, [onSelectionChange, selectedValues]);

  const onSelect: TreeSelectable<T>['onSelect'] = (nodeId, value) => {
    if (disabledNodes?.includes(nodeId)) {
      return;
    }

    if (type === 'multi') {
      if (selectedNodes.includes(nodeId)) {
        setSelectedNodes((prevNodes) => prevNodes.filter((prevNodeId) => prevNodeId !== nodeId));
        setSelectedValues((prevValues) => prevValues.filter((prevValue) => prevValue !== value));
      } else {
        setSelectedNodes([...selectedNodes, nodeId]);
        setSelectedValues([...selectedValues, value]);
      }
    }

    if (type === 'radio' && !selectedNodes.includes(nodeId)) {
      setSelectedNodes([nodeId]);
      setSelectedValues([value]);
    }
  };

  return {
    selectedNodes,
    onSelect,
  };
};
