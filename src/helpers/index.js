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

// from: http://stackoverflow.com/a/7638362
export function randomColor() {
  let c = '';
  while (c.length < 6) {
    c += (Math.random()).toString(16).substr(-6).substr(-1);
  }
  return '#' + c;
}
