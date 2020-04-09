'use strict';

$(document).ready(function () {

    $("#addBtn").on('click', addElement);
    $("#itemToAdd").on('keyup', disableButton);

    let shoppingList = new MyList();
    let removedList = new MyList();

    function addElement(e) {
        let text = $('#itemToAdd').val();
        shoppingList.addItem(text);
        
        refresh('#shoppingList', text, "Añadir");
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
        shoppingList.removeItem(event.target.parentNode.id);
        let textValue = event.target.parentNode.childNodes[0].textContent;
        removedList.addItem(textValue);
       
        refresh('#removedList');
        refresh('#shoppingList');       
    }

    function restoreElement() {
        removedList.removeItem(event.target.parentNode.id);
        let textValue = event.target.parentNode.childNodes[0].textContent;
        shoppingList.addItem(textValue);
        refresh('#removedList');
        refresh('#shoppingList');
    }

    function refresh(listName) {
        let index = 0;
        let htmlList = listName == "#shoppingList" ?
            $('#shoppingList') : $('#removedList');
        htmlList.empty();
        let dataList = listName == "#shoppingList" ?
            shoppingList : removedList;
        for (let i = 0; i < dataList.items.length; i++) {
            let item = $('<li>', {
                'id': index++,
                'text': dataList.items[i],
                'class': listName == "#shoppingList" ?
                    'list-group-item list-group-item-danger':  
                    'list-group-item list-group-item-secondary'
            });
            
            item.on('click', listName == "#shoppingList" ?
                removeElement : restoreElement);
            htmlList.append(item);
        }
    }
});