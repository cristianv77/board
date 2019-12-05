import React from 'react';
import './index.css';
import { open, close } from './Modal'
import Column from './Column'

export default class Board extends React.Component {
    constructor(props) {
      super(props);
      const columnsBoard = this.initializeColumns();
      const cardsBoard = this.initializeCards();
      this.state = {
        columns: columnsBoard,
        cards: cardsBoard,
        duplicate: 1
      };
      this.addColumn = this.addColumn.bind(this);
      this.archiveColumn = this.archiveColumn.bind(this);
      this.editTitle = this.editTitle.bind(this);
      this.searchCards = this.searchCards.bind(this);
      this.save = this.save.bind(this);
    }
  
    initializeColumns(){
      let columnsInBoard = ['To do', 'In progress', 'Done'];
      if (!localStorage.getItem('columnsInBoard')) {
       localStorage.setItem('columnsInBoard', columnsInBoard);
      } else {
        columnsInBoard = localStorage.getItem('columnsInBoard').split(',');
      }
      return columnsInBoard;
    }
  
    initializeCards(){
      let cardsInBoard = [
        { name: 'Go to CDS', title: 'To do', visible: true },
        { name: 'Exam study', title: 'In progress', visible: true },
        { name: 'Pay accounts', title: 'Done', visible: true }
      ];
      if (!localStorage.getItem('cardsInBoard')) {
        localStorage.setItem('cardsInBoard', JSON.stringify(cardsInBoard));
      } else {
        cardsInBoard = JSON.parse(localStorage.getItem('cardsInBoard').split(','));
      }
      return cardsInBoard;
    }
  
    searchCards() {
      const searchWords = document.getElementById('search').value.toLowerCase();
      const actualCards = this.state.cards;
      actualCards.map(card => {
        const nameLow = card.name.toLowerCase();
        if (nameLow.includes(searchWords)) {
          card.visible = true;
        } else {
          card.visible = false;
        }
        return '';
      });
      localStorage.setItem('cardsInBoard', JSON.stringify(actualCards));
      this.setState({
        cards: actualCards,
      });
    }
  
    addColumn() {
      const actualColumns = this.state.columns;
      const newColumnTitle = document.getElementById('newColumn').value;
      actualColumns.push(newColumnTitle);
      localStorage.setItem('columnsInBoard', actualColumns);
      this.setState({
        columns: actualColumns
      });
    }
  
    duplicateColumn(name) {
      const duplicate = this.state.duplicate;
      const actualColumns = this.state.columns;
      const actualCards = this.state.cards;
      const newColumnTitle = 'v' + duplicate + '_' + name;
      actualColumns.splice(actualColumns.indexOf(name) + 1, 0, newColumnTitle);
      actualCards.map(card => {
        if (card.title === name) {
          actualCards.push({
            name: card.name,
            title: newColumnTitle,
            visible: true
          });
        }
        return '';
      });
      localStorage.setItem('columnsInBoard', actualColumns);
      localStorage.setItem('cardsInBoard', JSON.stringify(actualCards));
      this.setState({
        columns: actualColumns,
        cardsInBoard: actualCards,
        duplicate: duplicate + 1
      });
    }
  
    archiveColumn(name) {
      const actualCards = this.state.cards;
      const indexes = [];
      const actualColumns = this.state.columns;
      actualCards.map(card => {
        if (card.title === name) {
          indexes.unshift(actualCards.indexOf(card));
        }
        return '';
      });
  
      indexes.map(i => {
        actualCards.splice(i, 1);
        return '';
      });
  
      actualColumns.splice(actualColumns.indexOf(name), 1);
      localStorage.setItem('columnsInBoard', actualColumns);
      localStorage.setItem('cardsInBoard', JSON.stringify(actualCards));
      this.setState({
        columns: actualColumns,
        cards: actualCards
      });
    }
  
    editTitle(name, newTitle) {
      const actualCards = this.state.cards;
      const actualColumns = this.state.columns;
      const index = actualColumns.indexOf(name);
      actualColumns[index] = newTitle;
      localStorage.setItem('columnsInBoard', actualColumns);
      for (const card in actualCards) {
        if (actualCards[card].title === name) {
          actualCards[card].title = newTitle;
        }
      }
      localStorage.setItem('cardsInBoard', JSON.stringify(actualCards));
      this.setState({
        columns: actualColumns,
        cards: actualCards
      });
    }
  
  
    onDrop = (event, newColumn) => {
      const newList = this.state.columns;
      const column = localStorage.getItem('ColumnDrag');
      const indexActual = this.state.columns.indexOf(column);
      const indexNew = this.state.columns.indexOf(newColumn);
      if (newColumn === 0) {
        newList.splice(indexActual, 1);
        newList.splice(0, 0, column);
      } else {
        if (indexActual < indexNew) {
          newList.splice(indexActual, 1);
          newList.splice(indexNew, 0, column);
        } else if (indexActual > indexNew) {
          newList.splice(indexActual, 1);
          newList.splice(indexNew + 1, 0, column);
        }
      }
      localStorage.setItem('columnsInBoard', newList);
      this.setState({
        columns: newList
      });
    };
  
    openModal(editType, name) {
      open('modal',editType, name);
    }
  
    save() {
      const editElement = JSON.parse(localStorage.getItem('Edit'));
      const edit = document.getElementById('edit');
      this.editTitle(editElement.name, edit.value);
      document.getElementById('modal').style.display = 'none';
      edit.value = '';
    }
  
    closeModal() {
        close('modal','edit')
    }
    
  
    onDragOver = event => {
        event.preventDefault();
    };
  
    render() {
      const ListOfCards = name => {
        const cardsInBoard = this.state.cards;
        const list = [];
        cardsInBoard.map(card => {
          if (card.title === name && card.visible) {
            list.push(card.name);
            return '';
          }
          return '';
        });
        return list;
      };
  
      const renderColumns = this.state.columns.map(name => {
        const index = this.state.columns.indexOf(name) + 1;
        return (
          <div className='column-board' key={Math.random()}>
            <div className='buttons-column'>
              <button
                onClick={() => this.openModal('EditTitle', name)}
                id='BtnActions'
              >
                Edit title
              </button>
              <button onClick={() => this.archiveColumn(name)} id='BtnActions'>
                Archive
              </button>
              <button onClick={() => this.duplicateColumn(name)} id='BtnActions'>
                Duplicate
              </button>
            </div>
            <Column title={name} cards={ListOfCards(name)} />
            <div
              className='Dropabble, column-drop'
              id={index}
              key={index}
              onDragOver={e => this.onDragOver(e)}
              onDrop={e => this.onDrop(e, name)}
            ></div>
          </div>
        );
      });
  
      return (
        <div className='container-drag, board'>
          <div className='board-info'>
            <input
              onChange={this.searchCards}
              id='search'
              placeholder='Search'
            ></input>
            <br></br>
            <br></br>
            <form onSubmit={this.addColumn}>
              <input
                id='newColumn'
                placeholder='New column title'
                required
              ></input>
              <button type='submit'>{'+'}</button>
            </form>
          </div>
          <div className='columns' id='columns'>
            <div className='column-board' key={Math.random()}>
              <div
                className='Dropabble, column-drop'
                id={0}
                key={0}
                onDragOver={e => this.onDragOver(e)}
                onDrop={e => this.onDrop(e, 0)}
              ></div>
            </div>
            {renderColumns}
          </div>
          <div id='modal' className='modal'>
            <div className='modal-header' id='divModalH'>
              <span className='close' id='closeModalBtn' onClick={this.closeModal}>
                &times;
              </span>
            </div>
            <div className='modal-content'>
              <input placeholder='Edit' required id='edit'></input>
              <br />
              <button id='buttonSave' onClick={this.save}>
                Save
              </button>
            </div>
          </div>
        </div>
      );
    }
  }