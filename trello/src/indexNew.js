import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.editText = this.editText.bind(this);
    this.name = this.props.name;
  }

  editText(){
    const newName = prompt('New card text')
    this.name = newName;
  }

  render() {
    if (this.props.isVisible){
      return (
        <div>
        <button className="square" id="cardTitle" >
          {this.props.name}
        </button>
        </div>
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
      cards: ['Jake', 'Car'],
    };
    this.cleanCards = this.cleanCards.bind(this);
  }

  addCard(){
    const newCard = prompt('Name the new card');
    const actualCards = this.state.cards
    this.setState({
      cards: actualCards.concat(newCard)
    })
  }

  duplicateCard(name){
    const newCard = name;
    const actualCards = this.state.cards
    this.setState({
      cards: actualCards.concat(newCard)
    })
  }

  cleanCards(){
    this.setState({
      cards: []
    })
  }

  archiveCard(name){
    const actualCards = this.state.cards;
    actualCards.splice( actualCards.indexOf(name), 1 );
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
      return (<div className="board-row" key={this.state.cards.indexOf(name)}>
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
    this.state = {
      columns: columnsBoard(),
    };
    this.addColumn = this.addColumn.bind(this);
    this.archiveColumn = this.archiveColumn.bind(this);
    this.editTitle = this.editTitle.bind(this);
    
  }

  addColumn(){
    const newColumnTitle = document.getElementById("newColumn").value;
    columnsInBoard.concat(newColumnTitle)
    localStorage.setItem('columnsInBoard', columnsInBoard);
    const actualColumns = this.state.columns
    this.setState({
      columns: actualColumns.concat(newColumnTitle)
    })
  }

  duplicateColumn(name){
    const newColumnTitle = name;
    const actualColumns = this.state.columns
    this.setState({
      columns: actualColumns.concat(newColumnTitle)
    })
  }

  archiveColumn(name){
    const actualColumns = this.state.columns;
    actualColumns.splice( actualColumns.indexOf(name), 1 );
    this.setState({
      columns: actualColumns
    })
  }

  editTitle(name){
    const actualColumns = this.state.columns;
    actualColumns[actualColumns.indexOf(name)] =  prompt('New title');
    this.setState({
      columns: actualColumns
    })
  }

  render() {
    const renderColumns = this.state.columns.map(name => {
    return (<div className="column-board" key={this.state.columns.indexOf(name)}>
      <div className="buttons-column">
        <button onClick={() => this.editTitle(name)}>Edit title</button>
        <button onClick={() => this.archiveColumn(name)}>Archive</button>
        <button onClick={() => this.duplicateColumn(name)}>Duplicate</button>
      </div>
      <Column title={name}/>
      
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
localStorage.setItem('columnsInBoard', columnsInBoard);

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);

