// @flow

import React from 'react';
import { Path, Point } from 'paper';

export class Selector extends React.Component<PropsType> {

  componentDidMount() {
    console.log("Selector created", this.props)
    this.paperElement = new Path.Circle(new Point(this.props.position), this.props.radius )
    this.paperElement.fillColor = this.props.color
  }

  render() {
    if(this.paperElement){
      this.paperElement.position = new Point(this.props.position)
      this.paperElement.radius = this.props.radius
      this.paperElement.fillColor = this.props.color
    }
    return [];
  }
}

export default Selector;
