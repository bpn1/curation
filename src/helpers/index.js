import React from 'react';
import FontIcon from 'material-ui/FontIcon';

export function isNotEmpty(obj) {
  return Object.keys(obj).length > 0;
}

export function count(obj) {
  return obj ? Object.keys(obj).length : 0;
}

export function materialIcon(iconName, color) {
  return <FontIcon className="material-icons" color={color}>{iconName}</FontIcon>;
}
