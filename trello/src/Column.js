import React from 'react';
import './index.css';
import Card from './Card'
import open from './Modal'

export default class Column extends React.Component {
    constructor(props) {
      super(props);
      this.addCard = this.addCard.bind(this);
      this.archiveCard = this.archiveCard.bind(this);
      this.state = {
        cards: this.props.cards
      };
    }
  
    addCard() {
      const idAddCard = 'AddCard' + this.props.title;
      const newCard = document.getElementById(idAddCard).value;
      const card = { name: newCard, title: this.props.title, visible: true };
      const actualCards = this.state.cards;
      const cardsInBoard = JSON.parse(localStorage.getItem('cardsInBoard'))
      cardsInBoard.push(card);
      actualCards.push(newCard);
      localStorage.setItem('cardsInBoard', JSON.stringify(cardsInBoard));
      this.setState({
        cards: actualCards
      });
    }
  
    duplicateCard(name) {
      const newCard = name;
      const card = { name: newCard, title: this.props.title, visible: true };
      const actualCards = this.state.cards;
      const cardsInBoard = JSON.parse(localStorage.getItem('cardsInBoard'))
      cardsInBoard.push(card);
      actualCards.push(newCard);
      localStorage.setItem('cardsInBoard', JSON.stringify(cardsInBoard));
      this.setState({
        cards: actualCards
      });
    }
  
    archiveCard(name) {
      const actualCards = this.state.cards;
      let index;
      const cardsInBoard = JSON.parse(localStorage.getItem('cardsInBoard'))
      for (const i in cardsInBoard) {
        if (
          cardsInBoard[i].title === this.props.title &&
          cardsInBoard[i].name === name
        ) {
          index = i;
        }
      }
      cardsInBoard.splice(index, 1);
      actualCards.splice(actualCards.indexOf(name), 1);
      localStorage.setItem('cardsInBoard', JSON.stringify(cardsInBoard));
      this.setState({
        cards: actualCards
      });
    }
  
    onDragOver = ev => {
      ev.preventDefault();
    };
  
    onDragStart = (ev, name, column) => {
      ev.dataTransfer.setData('nameCard', name);
      ev.dataTransfer.setData('columnCard', column);
    };
  
    onDragStartColumn = (ev, column) => {
      ev.dataTransfer.setData('columnCard', column);
      localStorage.setItem('ColumnDrag', column);
    };
  
    onDragEnd = (ev, name, column) => {
      const actualCards = this.state.cards;
      actualCards.splice(actualCards.indexOf(name), 1);
      this.setState({
        cards: actualCards
      });
    };
  
    onDrop = (ev, newColumn) => {
      const name = ev.dataTransfer.getData('nameCard');
      const column = ev.dataTransfer.getData('columnCard');
      const cardsInBoard = JSON.parse(localStorage.getItem('cardsInBoard'))
      if (name !== '') {
        const actualCards = this.state.cards;
        const card = { name: name, title: newColumn, visible: true };
        let index;
        for (const i in cardsInBoard) {
          if (cardsInBoard[i].title === column && cardsInBoard[i].name === name) {
            index = i;
          }
        }
        cardsInBoard[index] = card;
        if (newColumn !== column) {
          actualCards.push(name);
        }
        localStorage.setItem('cardsInBoard', JSON.stringify(cardsInBoard));
        this.setState({
          cards: actualCards
        });
      }
    };
  
    openModal(editType, name, cardName) {
      open(editType, name, cardName);
    }
  
    render() {
      const renderCards = this.state.cards.map(name => {
        return (
          <div className='board-row' key={Math.random()}>
            <div
              draggable='true'
              onDragEnd={e => this.onDragEnd(e, name, this.props.title)}
              onDragStart={e => this.onDragStart(e, name, this.props.title)}
            >
              <Card name={name} isVisible={true} column={this.props.title} />
              <button
                onClick={() => this.openModal('EditCard', this.props.title, name)}
                id='BtnActions'
              >
                Edit text
              </button>
              <button
                draggable='false'
                onClick={() => this.archiveCard(name)}
                id='BtnActions'
              >
                Archive
              </button>
              <button onClick={() => this.duplicateCard(name)} id='BtnActions'>
                Duplicate card
              </button>
            </div>
          </div>
        );
      });
  
      const title = () => {
        const titleAux = this.props.title;
        if (titleAux.includes('_')) {
          return titleAux.split('_')[1];
        }
        return titleAux;
      };
      const idAddCard = 'AddCard' + this.props.title;
      return (
        <div
          id='Column'
          className='column'
          draggable='true'
          onDragStart={e => this.onDragStartColumn(e, this.props.title)}
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => {
            this.onDrop(e, this.props.title);
          }}
        >
          <div className='titleColumn'>{title()}</div>
          {renderCards}
          <form onSubmit={this.addCard}>
            <input
              className='addCardInput'
              id={idAddCard}
              placeholder='New Card'
              required
            ></input>
            <button id='button-add-card'>Add Card</button>
          </form>
        </div>
      );
    }
  }