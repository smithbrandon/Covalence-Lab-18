app.factory('User', ['$resource',function($resource){
    return $resource('/api/users');
}])