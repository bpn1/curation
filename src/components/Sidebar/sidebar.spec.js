import React from 'react'
import Sidebar from './sidebar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

test('Sidebar snapshot test', () =>{
  const component = shallow(<MuiThemeProvider><Sidebar>Testo</Sidebar></MuiThemeProvider>);
  expect(component).toMatchSnapshot()
});
