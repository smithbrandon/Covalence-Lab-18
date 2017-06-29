app.factory('Chirp',['$resource',function($resource){
    return $resource('/api/chirps/:id', {
        id: '@id'
    },{
        update: { method: 'PUT' }
    });
}]);