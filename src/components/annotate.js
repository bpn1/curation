import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
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
        <CardText>
          {this.props.children}
        </CardText>
      </Card>
    );
  }
}

export default ContentCard
