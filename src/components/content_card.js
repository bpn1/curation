import React, { Component } from 'react';
import PropTypes from 'prop-types';
import muiThemable from 'material-ui/styles/muiThemeable';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Card, CardText } from 'material-ui/Card';

class ContentCard extends Component {
  render() {
    const styles = {
      width: '100%',
      transition: 'all .45s ease-out'
    };

    const fabStyle = {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    };

    return (
      <Card zDepth={1} style={styles}>
        <CardText>
          {this.props.children}
        </CardText>
        <FloatingActionButton style={fabStyle}>
          <ContentAdd />
        </FloatingActionButton>
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

export default muiThemable()(ContentCard);
