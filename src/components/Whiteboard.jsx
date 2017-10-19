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

    // Thought: How to make sure, that always the right components are being updated, and that not unintentionally new ones are created? -> Otherwise canvas would get messed up. 
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

    this.setUpMouseEvents()
  }

  itemForType(type: String, props, id) {
    switch(type){
      case 'Selector':
        return ( <Selector {...props} key={id}/> )
      default:
        return null
    }
  }

  // Question: Now the state is not being updated correctly. How to correctly pass this events down to the corresponding component
  //           in order to update everything correctly?
  setUpMouseEvents() {
    let selectedItem = null
    this.paperTool.onMouseDown = (event: ToolEvent) => {
      // On mouse down
      selectedItem = event.item
    };

    this.paperTool.onMouseDrag = (event: ToolEvent) => {
      console.log("drag item")
      if(selectedItem){
        selectedItem.position = event.point
      }
    };

    this.paperTool.onMouseUp = (event: ToolEvent) => {
    };
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
