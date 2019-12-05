import React from 'react';
import './index.css';
import Card from './Card'
import open from './Modal'

export default class Column extends React.Component {
    constructor(props) {
      super(props);
      this.addCard = this.addCard.bind(this);
      this.archiveCard = this.archiveCard.bind(this);
      this.save = this.save.bind(this);
      this.state = {
        cards: this.props.cards
      };
    }
  
    parseCard(name, title){
        const card = { name: name, title: title, visible: true };
        return card;
    }

    addCard(name) {
      let newCard;
      if (name === ''){
        const idAddCard = 'AddCard' + this.props.title;
        newCard = document.getElementById(idAddCard).value;
      } else{
        newCard = name;
      }
      const title = this.props.title;
      const card = this.parseCard(newCard,title);
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
      for (const card in cardsInBoard) {
        if (
          cardsInBoard[card].title === this.props.title &&
          cardsInBoard[card].name === name
        ) {
          index = card;
        }
      }
      cardsInBoard.splice(index, 1);
      actualCards.splice(actualCards.indexOf(name), 1);
      localStorage.setItem('cardsInBoard', JSON.stringify(cardsInBoard));
      this.setState({
        cards: actualCards
      });
    }
  
    onDragOver = event => {
        event.preventDefault();
    };
  
    onDragStart = (event, name, column) => {
        event.dataTransfer.setData('nameCard', name);
        event.dataTransfer.setData('columnCard', column);
    };
  
    onDragStartColumn = (event, column) => {
        event.dataTransfer.setData('columnCard', column);
      localStorage.setItem('ColumnDrag', column);
    };
  
    onDragEnd = (event, name, column) => {
      const actualCards = this.state.cards;
      actualCards.splice(actualCards.indexOf(name), 1);
      this.setState({
        cards: actualCards
      });
    };
  
    onDrop = (event, newColumn) => {
      const name = event.dataTransfer.getData('nameCard');
      const column = event.dataTransfer.getData('columnCard');
      const cardsInBoard = JSON.parse(localStorage.getItem('cardsInBoard'))
      if (name !== '') {
        const actualCards = this.state.cards;
        const card = this.parseCard(name, newColumn);
        let index;
        for (const indexCard in cardsInBoard) {
          if (cardsInBoard[indexCard].title === column && cardsInBoard[indexCard].name === name) {
            index = indexCard;
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

    editCard(title, name, newCard) {
        const boardCards = JSON.parse(localStorage.getItem('cardsInBoard').split(','));
        if (newCard !== '' && newCard !== null) {
          const card = this.parseCard(newCard,title);
          let index;
          for (const indexCard in boardCards) {
            if (boardCards[indexCard].title === title && boardCards[indexCard].name === name) {
              index = indexCard;
            }
          }
          boardCards[index] = card;
          localStorage.setItem('cardsInBoard', JSON.stringify(boardCards));
          window.location.reload(false);
        }
      }

    save() {
        const editElement = JSON.parse(localStorage.getItem('Edit'));
        const edit = document.getElementById('editCol');
        this.editCard(editElement.name, editElement.cardName, edit.value);
        document.getElementById('modalColumn').style.display = 'none';
        edit.value = '';
      }

    openModal(editType, name, cardName) {
      open('modalColumn',editType, name, cardName);
    }

    close() {
        const edit = document.getElementById('editCol');
        document.getElementById('modalColumn').style.display = 'none';
        edit.value = '';
      }
  
    render() {
      const renderCards = this.state.cards.map(name => {
        return (
          <div className='board-row' key={Math.random()}>
            <div
              draggable='true'
              onDragEnd={event => this.onDragEnd(event, name, this.props.title)}
              onDragStart={event => this.onDragStart(event, name, this.props.title)}
            >
              <Card name={name} />
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
              <button onClick={() => this.addCard(name)} id='BtnActions'>
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
          onDragStart={event => this.onDragStartColumn(event, this.props.title)}
          onDragOver={event => this.onDragOver(event)}
          onDrop={event => {
            this.onDrop(event, this.props.title);
          }}
        >
          <div className='titleColumn'>{title()}</div>
          {renderCards}
          <form onSubmit={() => this.addCard('')}>
            <input
              className='addCardInput'
              id={idAddCard}
              placeholder='New Card'
              required
            ></input>
            <button id='button-add-card'>Add Card</button>
          </form>
          <div id='modalColumn' className='modal'>
            <div className='modal-header' id='divModalH'>
              <span className='close' id='closeModalBtn' onClick={this.close}>
                &times;
              </span>
            </div>
            <div className='modal-content'>
              <input placeholder='Edit' required id='editCol'></input>
              <br />
              <button id='buttonSaveC' onClick={this.save}>
                Save
              </button>
            </div>
          </div>
        </div>
      );
    }
  }