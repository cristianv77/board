import React from 'react';
import './index.css';

export default class Card extends React.Component {
    constructor(props) {
      super(props);
      this.editText = this.editText.bind(this);
      this.name = this.props.name;
    }
  
    editText(){
      const newName = prompt('New card text')
      this.name = newName;
    }

    onDragStart = (ev, name) => {
      console.log('dragstart:',name);
      ev.dataTransfer.setData("nameCard", name);
  }

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("nameCard");
    
    let tasks = this.state.tasks.filter((task) => {
        if (task.name == id) {
            task.category = cat;
        }
        return task;
    });

    this.setState({
        ...this.state,
        tasks
    });
 }

  
    render() {
      if (this.props.isVisible){
        return (
          <div draggable="true" onDragStart={(e) => this.onDragStart(e, this.props.name)}>
          <button className="square" id="cardTitle" >
            {this.props.name}
          </button>
          </div>
        );
      }
      return (<div></div>);
    }
  }
