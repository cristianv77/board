// Initialize the cards of the board. It has an object with name, column and the visibility in the board
export const initializeCards = () => {
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

  // Initialize the columns of the board
  export const initializeColumns= () =>{
    let columnsInBoard = ['To do', 'In progress', 'Done'];
    if (!localStorage.getItem('columnsInBoard')) {
     localStorage.setItem('columnsInBoard', columnsInBoard);
    } else {
      columnsInBoard = localStorage.getItem('columnsInBoard').split(',');
    }
    return columnsInBoard;
  }