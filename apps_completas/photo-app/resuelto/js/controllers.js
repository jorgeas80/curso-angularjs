function PhotoSearchController(photoSearchService) {
    var vm = this;
    
    // Modelo de datos
    vm.photos = [];
    
    vm.search = {
        keyword: ''
    }
    
    vm.thumbSize = {
        size: 'small'
    }
    
    vm.submitSearch = function() {
        vm.photos = photoSearchService.findPhotos(vm.search.keyword);
    }
    
    vm.setThumbSize = function(size) {
        vm.thumbSize.size = size;
    }
}
    