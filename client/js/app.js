var arquiApp = angular.module('arquiModule',  ['lbServices']);

arquiApp.controller('MessageListController', function MessageListController($scope, Message) {
  $scope.messages = Message.find({},
    function() { 
      $scope.messages.reverse();
    },
    function() { /* Failed */ }
    );

  $scope.$on('newMessage', function(event){
    $scope.messages = Message.find({},
      function() { 
        $scope.messages.reverse(); 
      },
      function() { /* Failed */ }
      );
  });

});

arquiApp.controller('PostMessageController', function PostMessageController($rootScope, $scope, $http, Message) {
  $scope.submit = function(){
    if ($scope.message){
      $http.get("https://ipinfo.io/json").then(
        function (response) { 
          $scope.ip = response.data.ip; 
          $scope.newMessage = Message.create({ ip: $scope.ip, content: $scope.message }, 
            function() { $rootScope.$broadcast('newMessage',[]) },
            function() { /* Failed*/  }
          );
          $scope.message = "";
        });
      
    }
  }
});