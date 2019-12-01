const open = (editType, name, cardName) => {
    const modal = document.getElementById("modal");
    const edit = document.getElementById("edit");
    modal.style.display = "block";
    localStorage.setItem('Edit', JSON.stringify({name:name, editType:editType, newName:edit.value,cardName:cardName}))
    return {name:name, editType:editType, newName:edit.value, cardName:cardName}
  }
  
  export default open;