'use strict';

$(document).ready(function () {

    $("#addBtn").on('click', addElement);
    $("#itemToAdd").on('keyup', disableButton);

    let shoppingList = new MyList();
    let removedList = new MyList();

    function addElement(e) {
        let text = $('#itemToAdd').val();
        shoppingList.addItem(text);
        refresh('#shoppingList', text, "Add");
        $('#itemToAdd').val('');
        $("#addBtn").prop('disabled', true);
        }

    function disableButton(){
     
            if ($('#itemToAdd').val().length > 0){
                $("#addBtn").prop('disabled', false);
              
            }
            else {
                $("#addBtn").prop('disabled', true);

            }
        } 



    function removeElement() {
        let textValue = event.target.innerText;
        shoppingList.removeItem(textValue);
        removedList.addItem(textValue);
        refresh('#shoppingList', textValue, "Delete");
        refresh('#removedList', textValue, "Add");
    }

    function restoreElement() {
        let textValue = event.target.innerText;
        removedList.removeItem(textValue);
        shoppingList.addItem(textValue);
        refresh('#removedList', textValue, "Delete");
        refresh('#shoppingList', textValue, "Add");
    }

    function refresh(listName, textValue, funcion) {
        //let index = 0;
        let htmlList = listName == "#shoppingList" ?
            $('#shoppingList') : $('#removedList');
    
        //let dataList = listName == "#shoppingList" ?
         //   shoppingList : removedList;
        let item = $('<li>', {
                'id': textValue,
                'text': textValue,
                'class': listName == "#shoppingList" ?
                    'list-group-item list-group-item-primary':  
                    'list-group-item list-group-item-secondary'
            })

            if(funcion == "Add") htmlList.append(item);
            else $("#" +textValue).remove();
                  
            item.on('click', listName == "#shoppingList" ?
             removeElement : restoreElement);
           
        
    }
});