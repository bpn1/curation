import React, {Component} from 'react';
import PropTypes from 'prop-types';
import muiThemable from 'material-ui/styles/muiThemeable';
import {Card, CardText} from 'material-ui/Card';

class ContentCard extends Component {
  render() {
    const styles = {
      width: '100%',
      height: '100%',
      margin: '10px',
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

export default muiThemable()(ContentCard);
