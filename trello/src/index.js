import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Card from './Card';


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
    const actualCards = this.state.cards;
    actualCards[actualCards.indexOf(name)] =  prompt('New card name');
    this.setState({
      cards: actualCards
    })
  }

  render() {
    const renderCards = this.state.cards.map(name => {
      return (<div className="board-row" key={Math.random()}>
        <Card name={name} isVisible={true}/>
        <button onClick={() => this.archiveCard(name)}>Archive</button>
        <button onClick={() => this.editCard(name)}>Edit text</button>
        <button onClick={() => this.duplicateCard(name)}>Duplicate card</button>
      </div>)})

    return (
      <div className="column">
        <div className="status">{this.props.title}</div>
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
    return (<div className="column-board" key={Math.random()}>
      <div className="buttons-column">
        <button onClick={() => this.editTitle(name)}>Edit title</button>
        <button onClick={() => this.archiveColumn(name)}>Archive</button>
        <button onClick={() => this.duplicateColumn(name)}>Duplicate</button>
      </div>
      <Column title={name} cards={ListOfCards(name)}/>
      
    </div>)})
  

    return (
      <div className="game">
        <div className="columns" id="columns">
          {renderColumns}
        </div>
        <div className="game-info">
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

let cardsInBoard = [{name:'Go to CDS',title:'To do'},{name:'Next interview',title:'To do'}, {name:'Exam study',title:'In progress'}, {name:'This test',title:'Done'}];
if (!localStorage.getItem('cardsInBoard')) {
  localStorage.setItem('cardsInBoard', JSON.stringify(cardsInBoard));
} else {
  cardsInBoard = JSON.parse(localStorage.getItem('cardsInBoard').split(','));
}


ReactDOM.render(
  <Board />,
  document.getElementById('root')
);

