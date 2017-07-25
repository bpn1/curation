/*
Copyright 2016-17, Hasso-Plattner-Institut fuer Softwaresystemtechnik GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Make Enzyme functions available in all test files without importing
import { shallow, render, mount } from 'enzyme';
global.shallow = shallow;
global.render = render;
global.mount = mount;

// Skip createElement warnings but fail tests on any other warning
console.error = message => {
  if (!/(React.createElement: type should not be null)/.test(message)) {
    throw new Error(message);
  }
};
