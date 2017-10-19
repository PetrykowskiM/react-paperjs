// @flow

import React from 'react';
import Paper, { Tool } from 'paper';

// Styled Components
import WhiteboardComp from './Whiteboard.js';

// WhiteboardItem
import Selector from './Selector.jsx';

export class Whiteboard extends React.Component<PropsType> {

  constructor(props: PropsType) {
    super(props);
    if (process.env.NODE_ENV === 'development')
      window.Paper = Paper;

    this.state = {whiteboardItems: []}
  }

  componentDidMount() {
    // Setup paper
    Paper.setup(this.whiteboard);
    this.paperTool = new Tool();
    Paper.project.view.zoom = 1;

    this.setState({
      whiteboardItems: {
        1: {
          id: 1,
          type: 'Selector',
          data: {
            color: 'black',
            radius: 5,
            position: {x: 100, y: 100}
          }
        },
        2: {
          id: 2,
          type: 'Selector',
          data: {
            color: 'black',
            radius: 5,
            position: {x: 100, y: 200}
          }
        }
      }
    })

    // Test Change Propagation
    setTimeout(() => {
      this.setState({
        whiteboardItems: {
          ...this.state.whiteboardItems,
          3: {
            id: 3,
            type: 'Selector',
            data: {
              color: 'red',
              radius: 5,
              position: {x: 200, y: 300}
            }
          },
          2: {
            id: 2,
            type: 'Selector',
            data: {
              color: 'green',
              radius: 5,
              position: {x: 300, y: 200}
            }
          }
        }
      })
    }, 2000)
  }

  itemForType(type: String, props, id) {
    switch(type){
      case 'Selector':
        return ( <Selector {...props} key={id}/> )
      default:
        return null
    }
  }

  render() {
    return (
      <WhiteboardComp
        id="canvas"
        data-paper-resize="true"
        innerRef={(whiteboard: HTMLCanvasElement) => { this.whiteboard = whiteboard; }}
      >
        {
          Object.values(this.state.whiteboardItems).map( (whiteboardItem) => 
            this.itemForType(whiteboardItem.type, whiteboardItem.data, whiteboardItem.id)
          )
        }
      </WhiteboardComp>
    );
  }
}

export default Whiteboard;
