import React from "react";
import "./index.css";
import { open, close } from "./Modal";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.name = this.props.name;
    this.save = this.save.bind(this);
  }

  //Returns a card object
  parseCard(name, title) {
    const card = { name: name, title: title, visible: true };
    return card;
  }

  //Edit the cards name
  editCard(title, name, newCard) {
    const boardCards = JSON.parse(
      localStorage.getItem("cardsInBoard").split(",")
    );
    if (newCard !== "" && newCard !== null) {
      const card = this.parseCard(newCard, title);
      let index;
      for (const indexCard in boardCards) {
        if (
          boardCards[indexCard].title === title &&
          boardCards[indexCard].name === name
        ) {
          index = indexCard;
        }
      }
      boardCards[index] = card;
      localStorage.setItem("cardsInBoard", JSON.stringify(boardCards));
      window.location.reload(false);
    }
  }

  //MODAL METHODS
  openModal(editType, name, cardName) {
    open("modalCard", editType, name, cardName);
  }

  save() {
    const editElement = JSON.parse(localStorage.getItem("Edit"));
    const edit = document.getElementById("editCard");
    this.editCard(editElement.name, editElement.cardName, edit.value);
    document.getElementById("modalCard").style.display = "none";
    edit.value = "";
  }

  closeModal() {
    close("modalCard", "editCard");
  }

  //END MODAL METHODS CALLS

  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.openModal("EditCard", this.props.title, this.props.name)
          }
          id="BtnActions"
        >
          Edit text
        </button>
        <button
          className="square"
          id="cardTitle"
          onDoubleClick={() =>
            this.openModal("EditCard", this.props.title, this.props.name)
          }
        >
          {this.props.name}
        </button>
        <div id="modalCard" className="modal">
          <div className="modal-header" id="divModalH">
            <span
              className="close"
              id="closeModalBtn"
              onClick={this.closeModal}
            >
              &times;
            </span>
          </div>
          <div className="modal-content">
            <input placeholder="Edit" required id="editCard"></input>
            <br />
            <button id="buttonSave" onClick={this.save}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
