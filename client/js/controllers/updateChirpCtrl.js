app.controller('updateChirpCtrl',['$scope','$http','$routeParams','Chirp',function($scope,$http,$routeParams,Chirp){
    $scope.empty = true;

    var id = $routeParams.id;
    $('#users').hide();

    $scope.oldChirp = Chirp.get({ id : id});    
    $scope.updateChirp = function(){
        $scope.oldChirp.$update() 
        .then(function(success){
            window.location.replace('#/chirps/' + id);
        },function(err){
            console.log(err);
        })
    }

$('#chirp').keyup(function () {
    checkMsg();
    updateCount();
})

function updateCount() {
    $('#word-cnt > span').text($('#chirp').val().length);
}

function checkMsg() {
    var chars = $('#chirp').val().length;
    if (chars > 0) {
        $scope.empty = false;
    } else {
        $scope.empty = true;
    }
}

}]);
