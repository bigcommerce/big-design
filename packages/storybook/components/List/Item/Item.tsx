import React from 'react';

export type ListItemProps = React.LabelHTMLAttributes<HTMLLIElement>;

export const ListItem: React.FC<ListItemProps> = ({ ...props }) => <li {...props} />;
