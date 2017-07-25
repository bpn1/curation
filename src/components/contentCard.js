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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';

class ContentCard extends Component {
  render() {
    const styles = {
      width: '100%',
      height: '100%',
      transition: 'all .45s ease-out'
    };

    return (
      <Card zDepth={2} style={styles}>
        <CardText>
          {this.props.children}
        </CardText>
      </Card>
    );
  }
}
ContentCard.propTypes = {
  children: PropTypes.node
};

ContentCard.defaultProps = {
  children: null
};

export default ContentCard;
