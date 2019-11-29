import React from 'react';
import './index.css';
import Card from './Card'

export default class Column extends React.Component {
    constructor(props) {
      super(props);
      this.addCard = this.addCard.bind(this);
      this.archiveCard = this.archiveCard.bind(this);
      this.editCard = this.editCard.bind(this);
      this.state = {
        cards: this.props.cards,
      };
      this.cleanCards = this.cleanCards.bind(this);
    }
  
    addCard(){
      const newCard = prompt('Name the new card');
      const card = {name:newCard, title:this.props.title};
      cardsInBoard.push(card);
      localStorage.setItem('cardsInBoard', JSON.stringify(cardsInBoard));
      alert(cardsInBoard)
      this.setState({
        cards: cardsInBoard
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