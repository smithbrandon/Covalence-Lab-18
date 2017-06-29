app.controller('chirpCtrl',['$scope','$http','$routeParams', 'Chirp','User',function($scope,$http,$routeParams, Chirp,User){
    $scope.empty = false;
    var id = $routeParams.id;
    $scope.users = User.query();
    $scope.chirps = Chirp.query();
    $scope.chirp = Chirp.get({id: id});

    $scope.getDate = function(time) {
        var currenttime = new Date();
        var d = new Date(time);
        var diffMin = (currenttime.getTime() - d.getTime()) / 60000;
        if (diffMin < 60) {
            return Math.ceil(diffMin) + " min ago";
        } else if (d.getFullYear() === currenttime.getFullYear() && d.getMonth() === currenttime.getMonth() && d.getDay() === currenttime.getDay()) {
            return Math.ceil(diffMin / 60) + " hours ago";
        } else if (d.getFullYear() === currenttime.getFullYear() && d.getMonth() === currenttime.getMonth() && d.getDate() === (currenttime.getDate() - 1)) {
            return "yesterday";
        } else {
            return Math.ceil(diffMin / (24 * 60)) + " days ago";
        }
    }

    $scope.deleteChirp = function(id){
        var del = confirm('Are you Sure you want to delete this Chirp?');
            if(del){
                $scope.chirp.$delete(function(success){
                    window.location.replace('#/chirps');
                });
            }
        }
    
    $scope.captureChirp = function(){
        
        var chirp = new Chirp({
            message: $scope.chirpMessage,
            user:  $scope.selected.id
        });
        chirp.$save(function (success) {
            $('#chirp-btn').prop('disabled', true);
            $scope.chirpMessage = "";
        }, function (err) {
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
}])