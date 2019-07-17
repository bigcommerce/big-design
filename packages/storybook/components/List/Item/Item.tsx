import React from 'react';

export type ListItemProps = React.LabelHTMLAttributes<HTMLLIElement>;

export const ListItem: React.FC<ListItemProps> = ({ children, ...props }) => <li {...props}>{children}</li>;
