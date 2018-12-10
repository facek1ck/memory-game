var setPack = function() {
    switch($('#packs :selected').text()){
      case 'Animals': 
      localStorage.setItem('selectedPack','animals');
      break;
      
      case 'Christmas': 
      localStorage.setItem('selectedPack','christmas');
      break;
    }
    window.location.replace('game.html');
}

$( document ).ready(function() {
    switch($('#packs :selected').text()){
        case 'Animals': 
        $('#christmas').attr('style','display: none');
        $('#animals').attr('style','display: inline');
        break;

        case 'Christmas': 
        $('#animals').attr('style','display: none');
        $('#christmas').attr('style','display: inline');
        break;
      }
    $('#packs').change(function() {   
        switch($('#packs :selected').text()){
            case 'Animals': 
            $('#christmas').attr('style','display: none');
            $('#animals').attr('style','display: inline');
            break;
    
            case 'Christmas': 
            $('#animals').attr('style','display: none');
            $('#christmas').attr('style','display: inline');
            break;
          }
    });
});
