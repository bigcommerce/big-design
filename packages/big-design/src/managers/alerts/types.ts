import { AlertProps } from '../../components';
import { MessagingType } from '../../utils';

export type TypeMap = { [key in MessagingType]: number };

export type Subscriber = (alert: AlertProps | null) => void;
