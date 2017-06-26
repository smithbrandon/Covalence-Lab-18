app.controller('chirpsCtrl',['$scope','$http', function($scope, $http){
    $scope.empty = true;
    getChirps();

    $http({
        method: "GET",
        url: '/api/users'
    }).then(function(users){
        $scope.users = users.data;
    }, function(err){
        console.log(err);
    })
    
    function getChirps(){
        $http({
            method: "GET",
            url: "/api/chirps"
        }).then(function (success) {
            $scope.chirps = success.data;
        }, function (error) {
            console.log(error);
        })
    }

    $scope.captureChirp = function(){
        var chirp = {};
        chirp.message = $scope.chirp;
        chirp.user = $scope.selected.id;
            $http({
            method: "POST",
            url: "/api/chirps",
            contentType: "application/json",
            data: chirp
        }).then(function (success) {
            getChirps();
            $scope.selected = '';
            $('#chirp-btn').prop('disabled', true);
            $scope.chirp = "";
        }, function (err) {
            console.log(err);
        })
    }
    
    $scope.getdate = function(time) {
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

    $scope.keyUp = function(){
        checkMsg();
        updateCount();
    };

    function updateCount() {
        $scope.wordCnt = $('#chirp').val().length;
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








