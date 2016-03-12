$( document ).ready(function() {
    var names = ["Fulanito", "Menganito", "Zutanito"];
    
    $("#add-name").one('click', function() {
        
        while (names.length > 0) {
            var newElement = $('<li class="list-group-item">');
            newElement.text(names.pop());
            $(".list-group").append(newElement);
        }
        
        
        $("#alert").removeClass("hidden");
        $("#add-name").addClass("disabled");
        
    })    
});