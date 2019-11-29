import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.name = this.props.name;
  }

  render() {
    if (this.props.isVisible){
      return (
        
        <button className="square" id="cardTitle" >
          {this.props.name}
        </button>
      );
    }
    return (<div></div>);
  }
}

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.addCard = this.addCard.bind(this);
    this.archiveCard = this.archiveCard.bind(this);
    this.editCard = this.editCard.bind(this);
    this.state = {
      cards: this.props.cards,
    };
  }

  addCard(){
    const newCard = prompt('Name the new card');
    const card = {name:newCard, title:this.props.title};
    const actualCards = this.state.cards
    cardsInBoard.push(card);
    actualCards.push(newCard);
    localStorage.setItem('cardsInBoard', JSON.stringify(cardsInBoard));
    this.setState({
      cards: actualCards
    })
  }

  duplicateCard(name){
    const newCard = name;
    const card = {name:newCard, title:this.props.title};
    const actualCards = this.state.cards
    cardsInBoard.push(card);
    actualCards.push(newCard);
    localStorage.setItem('cardsInBoard', JSON.stringify(cardsInBoard));
    this.setState({
      cards: actualCards
    })
  }

  archiveCard(name){
    const actualCards = this.state.cards
    let index;
    for (const i in cardsInBoard){
      if (cardsInBoard[i].title === this.props.title && cardsInBoard[i].name === name){
        index = i;
      }
    }
    cardsInBoard.splice(index,1);
    actualCards.splice(actualCards.indexOf(name),1);
    localStorage.setItem('cardsInBoard', JSON.stringify(cardsInBoard));
    this.setState({
      cards: actualCards
    })
  }

  editCard(name){
    const newCard = prompt('Name the new card');
    const card = {name:newCard, title:this.props.title};
    const actualCards = this.state.cards
    let index;
    for (const i in cardsInBoard){
      if (cardsInBoard[i].title === this.props.title && cardsInBoard[i].name === name){
        index = i;
      }
    }
    cardsInBoard[index] = card;
    actualCards[actualCards.indexOf(name)] =  newCard
    localStorage.setItem('cardsInBoard', JSON.stringify(cardsInBoard));
    this.setState({
      cards: actualCards
    })
  }

  onDragOver = (ev) => {
    ev.preventDefault();
  }

  onDragStart = (ev, name, column) => {
    console.log('dragstart:',name,column);
    ev.dataTransfer.setData("nameCard", name);
    ev.dataTransfer.setData("columnCard", column);
    console.log(name)  
  }

  onDragStartColumn = (ev, column) => {
    console.log('dragstart:',column);
    ev.dataTransfer.setData("columnCard", column);
    localStorage.setItem('ColumnDrag',column)
  }

  onDragEnd = (ev, name, column) => {
    const actualCards = this.state.cards
    actualCards.splice(actualCards.indexOf(name), 1)
    this.setState({
      cards: actualCards
    })
  }

  onDrop = (ev, newColumn) => {
  const name = ev.dataTransfer.getData("nameCard");
  const column = ev.dataTransfer.getData("columnCard");
  if(name !== ''){
  const actualCards = this.state.cards
  const card = {name:name, title:newColumn, visible:true};
  let index;
  for (const i in cardsInBoard){
    if (cardsInBoard[i].title === column && cardsInBoard[i].name === name){
      index = i;
    }
  }
  cardsInBoard[index] = card;
  if (newColumn !== column){ 
   actualCards.push(name);
  }
  localStorage.setItem('cardsInBoard', JSON.stringify(cardsInBoard));
  this.setState({
    cards: actualCards
  })
}
}

  render() {
    const renderCards = this.state.cards.map(name => {
      return (<div className="board-row" key={Math.random()} >
        <div draggable="true" onDragEnd={(e) => this.onDragEnd(e, name, this.props.title)} onDragStart={(e) => this.onDragStart(e, name, this.props.title)}>
        <Card name={name} isVisible={true} column={this.props.title}/>
        <button onClick={() => this.archiveCard(name)}>Archive</button>
        <button onClick={() => this.editCard(name)}>Edit text</button>
        <button onClick={() => this.duplicateCard(name)}>Duplicate card</button>
        </div>
      </div>)})

    return (
      <div id="Column" className="column" draggable="true" onDragStart={(e)=> this.onDragStartColumn(e, this.props.title)} onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>{this.onDrop(e, this.props.title)}} >
        <div className="status" >{this.props.title}</div>
        {renderCards}
        <button onClick={this.addCard}>Add Card</button>
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    const columnsBoard = () => {
      if (localStorage.getItem('columnsInBoard')) {
        return localStorage.getItem('columnsInBoard').split(',');
      }
      return columnsInBoard
    }
    const cardsBoard = () => {
      if (localStorage.getItem('cardsInBoard')) {
        return JSON.parse(localStorage.getItem('cardsInBoard').split(','));
      }
      return cardsInBoard
    }
    this.state = {
      columns: columnsBoard(),
      cards: cardsBoard(),
    };
    this.addColumn = this.addColumn.bind(this);
    this.archiveColumn = this.archiveColumn.bind(this);
    this.editTitle = this.editTitle.bind(this);
    this.searchCards = this.searchCards.bind(this);
    
  }

  searchCards(){

  }

  addColumn(){
    const newColumnTitle = document.getElementById("newColumn").value;
    columnsInBoard.push(newColumnTitle)
    localStorage.setItem('columnsInBoard', columnsInBoard);
    this.setState({
      columns: columnsInBoard
    })
  }

  duplicateColumn(name){
    const newColumnTitle = name;
    columnsInBoard.splice(columnsInBoard.indexOf(name), 0, newColumnTitle);
    //columnsInBoard.push(newColumnTitle)
    localStorage.setItem('columnsInBoard', columnsInBoard);
    this.setState({
      columns: columnsInBoard
    })
  }

  archiveColumn(name){
    columnsInBoard.splice( columnsInBoard.indexOf(name), 1 );
    localStorage.setItem('columnsInBoard', columnsInBoard);
    this.setState({
      columns: columnsInBoard
    })
  }

  editTitle(name){
    const newTitle = prompt('New title');
    columnsInBoard[columnsInBoard.indexOf(name)] =  newTitle
    localStorage.setItem('columnsInBoard', columnsInBoard);
    for (const i in cardsInBoard){
      if (cardsInBoard[i].title === name){
        cardsInBoard[i].title = newTitle
      }
    }
    localStorage.setItem('cardsInBoard',JSON.stringify(cardsInBoard));
    this.setState({
      columns: columnsInBoard,
      cards: cardsInBoard
    })
  }

  onDrop = (ev, newColumn) => {
  const newList = columnsInBoard;
  const column = localStorage.getItem('ColumnDrag');
  const indexActual = this.state.columns.indexOf(column)
  const indexNew = this.state.columns.indexOf(newColumn)
  
  if(newColumn === 0){
    newList.splice(indexActual,1)
    newList.splice(0,0,column);
  } else{
    if (indexActual < indexNew){
    newList.splice(indexActual,1)
    newList.splice(indexNew,0,column);
    } else {
      newList.splice(indexActual,1)
    newList.splice(indexNew+1,0,column);
    }
  }
  localStorage.setItem('columnsInBoard', columnsInBoard);
    this.setState({
      columns: newList
    })
  }

  onDragOver = (ev) => {
    ev.preventDefault();
  }

  render() {
    const ListOfCards = name => {
      const list = [];
      cardsInBoard.map (card => {
        if (card.title === name){
          list.push(card.name)
          return '';
        }
        return '';
      })
      return list;
    }

    const renderColumns = this.state.columns.map(name => {
    const index = this.state.columns.indexOf(name) +1;
    return (<div className="column-board" key={Math.random()}>
      <div className="buttons-column">
        <button onClick={() => this.editTitle(name)}>Edit title</button>
        <button onClick={() => this.archiveColumn(name)}>Archive</button>
        <button onClick={() => this.duplicateColumn(name)}>Duplicate</button>
      </div>
      <Column title={name} cards={ListOfCards(name)}/>
      <div className="Dropabble, column-drop" id={index} key={index} onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e,name)}></div>
    </div>)}
    )
  

    return (
      <div className="container-drag, game">
        <div className="columns" id="columns">
        <div className="Dropabble, column-drop" id={0} key={0} onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e,0)}></div>
          {renderColumns}
        </div>
        <div className="game-info">
        <input id="search" placeholder="Search..."></input>
        <button onClick={this.searchCards}>{'Search cards'}</button>
        <br></br>
        <br></br>
        <br></br>
          <input id="newColumn" placeholder="New column title"></input>
          <button onClick={this.addColumn}>{'Add column'}</button>
        </div>
      </div>
    );
  }
}

// ========================================

let columnsInBoard = ['To do', 'In progress', 'Done'];
if (!localStorage.getItem('columnsInBoard')) {
  localStorage.setItem('columnsInBoard', columnsInBoard);
} else {
  columnsInBoard = localStorage.getItem('columnsInBoard').split(',')
}

let cardsInBoard = [{name:'Go to CDS',title:'To do',visible:true},{name:'Next interview',title:'To do',visible:true}, {name:'Exam study',title:'In progress',visible:true}, {name:'This test',title:'Done',visible:true}];
if (!localStorage.getItem('cardsInBoard')) {
  localStorage.setItem('cardsInBoard', JSON.stringify(cardsInBoard));
} else {
  cardsInBoard = JSON.parse(localStorage.getItem('cardsInBoard').split(','));
}

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);

