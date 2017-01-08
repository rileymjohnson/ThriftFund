


angular.module('app').controller('itemController', function($scope, $listing, $state, $auth, $wishlist, $timeout) {

$scope.loading = true;

  var itemId = $state.params.itemId;
  $listing.get(itemId).then(function(item){
    $scope.item = item;
    console.log(item);
    $timeout(function(){
      $scope.loading = false;
    }, 500);

  });

  $scope.createComment = function(comment){
    $scope.comment = '';
    $listing.comment(itemId, comment).then(function(comment){

      $scope.item.comments.push(comment);

    });
  };

  $scope.add = function(){
    $wishlist.add(itemId).then(function(user){
      console.log(user);
    });
  }

  $scope.remove = function(){
    $wishlist.remove(itemId).then(function(user){
      console.log(user);
    });
  }



});
