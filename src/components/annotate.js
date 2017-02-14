import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Card, CardActions, CardText } from 'material-ui/Card';

class ContentCard extends Component {
  render() {
    const styles = {
      width: '100%',
      backgroundColor: 'white',
      position: '',
      margin: '10px',
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
        <CardActions >
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>
        <FloatingActionButton style={fabStyle}>
          <ContentAdd />
        </FloatingActionButton>
      </Card>
    );
  }
}
ContentCard.propTypes = {
  children: React.PropTypes.node
};

ContentCard.defaultProps = {
  children: null
};

export default ContentCard;
