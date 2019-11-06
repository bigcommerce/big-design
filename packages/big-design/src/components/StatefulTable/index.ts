import {
  StatefulTableColumn as _StatefulTableColumn,
  StatefulTableProps as _StatefulTableProps,
} from './StatefulTable';

export { StatefulTable } from './StatefulTable';

export type StatefulTableProps<T> = _StatefulTableProps<T>;
export type StatefulTableColumn<T> = _StatefulTableColumn<T>;
