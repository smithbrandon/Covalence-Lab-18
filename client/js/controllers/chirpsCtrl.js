app.controller('chirpsCtrl',['$scope','$http','Chirp','User', function($scope, $http,Chirp,User){
    $scope.empty = true;
    $scope.chirps = Chirp.query();
    $scope.users = User.query();
    
    $scope.captureChirp = function(){
        var chirp = new Chirp({
            message: $scope.chirp,
            user: $scope.selected.id
        })
        chirp.$save(function (success) {
            $scope.selected = '';
            $scope.empty = true;
            $scope.chirp = "";
            $scope.chirps = Chirp.query();
        }, function (err) {
            console.log(err);
        });
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








