import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';;

class AnnotationView extends Component{

  render() {
    const styles = {
      width: 'auto',
      backgroundColor: 'white',
      position: '',
      margin: '10px',
      height: 'inherit'

    };

    return (
      <Card zDepth={1} style={styles}>
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    );
  }
}

export default AnnotationView
