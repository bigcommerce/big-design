import React, { memo } from 'react';

import { Link } from '../../Link';

const HigherOrderBreadcrumbItem = (Component: typeof Link): typeof Link =>
  memo((props) => <Component {...props} breadcrumbItem />);

export const BreadcrumbItem = HigherOrderBreadcrumbItem(Link);
