import { autoPlacement, flip, type Middleware, type Placement } from '@floating-ui/react';
import { type Placement as PopperPlacement } from '@popperjs/core';

// Placement props are still typed with popper's Placement, which includes 'auto*'
// values that floating-ui only supports via the autoPlacement middleware.
export function getFloatingPlacement(placement: PopperPlacement): {
  placement?: Placement;
  middleware: Middleware;
} {
  switch (placement) {
    case 'auto':
      return { middleware: autoPlacement() };

    case 'auto-start':
      return { middleware: autoPlacement({ alignment: 'start' }) };

    case 'auto-end':
      return { middleware: autoPlacement({ alignment: 'end' }) };

    default:
      return { middleware: flip(), placement };
  }
}
