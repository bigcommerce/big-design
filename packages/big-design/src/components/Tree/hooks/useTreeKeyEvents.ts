import {
  NodeMap,
  TreeExpandable,
  TreeFocusable,
  TreeNodeId,
  TreeOnKeyDown,
  TreeSelectable,
} from '../types';

interface UseTreeKeyEventsProps<T> {
  onFocus: TreeFocusable['onFocus'];
  onSelect: TreeSelectable<T>['onSelect'];
  onToggle: TreeExpandable['onToggle'];
  nodeMap: NodeMap;
  visibleNodes: TreeNodeId[];
}

const getNextVisibleNode = (visibleNodeIds: TreeNodeId[], id: TreeNodeId): TreeNodeId => {
  const index = visibleNodeIds.indexOf(id);

  if (index !== -1 && index + 1 < visibleNodeIds.length) {
    return visibleNodeIds[index + 1];
  }

  return id;
};

const getPreviousVisibleNode = (visibleNodeIds: TreeNodeId[], id: TreeNodeId): TreeNodeId => {
  const index = visibleNodeIds.indexOf(id);

  if (index !== -1 && index - 1 >= 0) {
    return visibleNodeIds[index - 1];
  }

  return id;
};

export const useTreeKeyEvents = <T>({
  onFocus,
  onSelect,
  onToggle,
  nodeMap,
  visibleNodes,
}: UseTreeKeyEventsProps<T>) => {
  // Needs to handle the following keyboard events:
  // https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-22
  // eslint-disable-next-line complexity
  const onKeyDown: TreeOnKeyDown<T> = (
    e: React.KeyboardEvent<HTMLLIElement>,
    { id, isExpanded, isSelectable, hasChildren, value },
  ) => {
    const key = e.key;

    if (e.altKey || e.currentTarget !== e.target) {
      return;
    }

    switch (key) {
      // Stopping propagation if inside a form
      case ' ':
        e.preventDefault();
        e.stopPropagation();

        if (isSelectable && onSelect) {
          onSelect(id, value);
        }

        break;

      case 'Enter':
        e.preventDefault();
        e.stopPropagation();

        if (hasChildren) {
          if (onToggle) {
            onToggle(id, isExpanded);
          }
        } else if (isSelectable && onSelect) {
          onSelect(id, value);
        }

        break;

      case 'ArrowDown':
        e.preventDefault();
        onFocus(getNextVisibleNode(visibleNodes, id));
        break;

      case 'ArrowUp':
        e.preventDefault();
        onFocus(getPreviousVisibleNode(visibleNodes, id));
        break;

      case 'ArrowRight':
        e.preventDefault();

        if (hasChildren) {
          if (isExpanded) {
            onFocus(getNextVisibleNode(visibleNodes, id));
          } else if (onToggle) {
            onToggle(id, isExpanded);
          }
        }

        break;

      case 'ArrowLeft':
        e.preventDefault();

        if (hasChildren) {
          if (isExpanded) {
            if (onToggle) {
              onToggle(id, isExpanded);
            }

            break;
          }
        }

        if (nodeMap.get(id)?.parent !== undefined) {
          onFocus(getPreviousVisibleNode(visibleNodes, id));
        }

        break;

      case 'Home':
        e.preventDefault();
        onFocus(visibleNodes[0]);
        break;

      case 'End':
        e.preventDefault();

        onFocus(visibleNodes[visibleNodes.length - 1]);
        break;

      default:
        break;
    }
  };

  return onKeyDown;
};
