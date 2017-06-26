app.controller('updateChirpCtrl',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
    $scope.empty = true;

    var id = $routeParams.id;
    $('#users').hide();

    $http({
        method: "GET",
        url: "/api/chirps/" + id
    }).then(function(chirp){
            $scope.chirp = chirp.data[0].message;
        },function(err){
            console.log(err);
    })

    $scope.updateChirp = function(){
        var chirp = {};
        chirp.message = $scope.chirp;
        chirp.user = parseInt(id);
        
        $http({
            method: 'PUT',
            url: '/api/chirps/' + id,
            contentType: 'application/json',
            data: JSON.stringify(chirp)
        }).then(function(success){
            window.location.replace('#/chirps/' + id);
        },function(err){
            console.log(err);
        })
    }

//Start Heree

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
