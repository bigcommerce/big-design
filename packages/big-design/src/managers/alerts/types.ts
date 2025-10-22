import { AlertProps } from '../../components';
import { MessagingType } from '../../utils';

export type TypeMap = Record<MessagingType, number>;

export type Subscriber = (alert: AlertProps | null) => void;
