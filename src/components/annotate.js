import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';;

class ContentCard extends Component{

  render() {
    const styles = {
      width: '100%',
      backgroundColor: 'white',
      position: '',
      margin: '10px',
    };

    return (
      <Card zDepth={1} style={styles}>
        <CardActions>
          <FloatingActionButton>
            <ContentAdd />
          </FloatingActionButton>
        </CardActions>
        <CardText>
          {this.props.children}
        </CardText>
      </Card>
    );
  }
}

export default ContentCard
