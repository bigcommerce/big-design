import type { AlertProps } from '../../components';
import type { MessagingType } from '../../utils';

export type TypeMap = Record<MessagingType, number>;

export type Subscriber = (alert: AlertProps | null) => void;
