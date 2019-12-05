//Opens a modal depending if is edit title or edit card
export const open = (caller, editType, name, cardName) => {
    const modal = document.getElementById(caller);
    const edit = document.getElementById("edit");
    modal.style.display = "block";
    localStorage.setItem('Edit', JSON.stringify({name:name, editType:editType, newName:edit.value,cardName:cardName}))
    return {name:name, editType:editType, newName:edit.value, cardName:cardName}
  };

  //Closes a modal depending if is edit title or edit card
  export const close = (caller, editer) => {
    const edit = document.getElementById(editer);
    document.getElementById(caller).style.display = 'none';
    edit.value = '';
  };
  
  export default { open, close };