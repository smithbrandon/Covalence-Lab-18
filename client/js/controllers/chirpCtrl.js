app.controller('chirpCtrl',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
    $scope.empty = false;
    var id = $routeParams.id;
    //Get all Users
    $http({
        method: "GET",
        url: '/api/users'
    }).then(function(users){
        $scope.users = users.data;
    }, function(err){
        console.log(err);
    })

    //Get specified Chirp
    $http({
        method: "GET",
        url: "/api/chirps/" + id
        }).then(function(chirp){
            $scope.chirp = chirp.data[0];
        },function(err){
            console.log(err);
    })

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
                $http({
                    method: "DELETE",
                    url:  '/api/chirps/'+ id
                }).then(function(success){
                    window.location.replace("#/chirps");
                },function(err){
                    console.log(err);
                })
            }
        }
    
    $scope.captureChirp = function(){
        var chirp= {};
        chirp.message = $scope.chirpMessage;
        chirp.user = $scope.selected.id;
            $http({
            method: "POST",
            url: "/api/chirps",
            contentType: "application/json",
            data: chirp
        }).then(function (success) {
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