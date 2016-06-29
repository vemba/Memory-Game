angular.element(document).ready(function() {
    angular.bootstrap(document, ['App']);
});

var app = angular.module('App',['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/template', {
        templateUrl: 'template.html',
        controller: 'templateCtrl'
    }).otherwise({
        redirectTo: '/template'
    });
}]);

//angular.module('App').controller('templateCtrl', ['$scope', '$cookies', function($scope, $cookies) {
angular.module('App').controller('templateCtrl', ['$scope','$timeout', function($scope,$timeout) {

    var shuffle = function(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
   }
   
    $scope.generateCard = function(){
        var dataset=[];
        $scope.cardLayout = [];
        $scope.move = 0;
        for(var i=0;i<($scope.row*$scope.row)/2;i++){
            dataset.push(i);
        }
        dataset = dataset.concat(dataset);
        dataset = shuffle(dataset);
        var index = 0;
        for(var i=0;i<parseInt($scope.row);i++){
            $scope.cardLayout.push([]);
            for(var j=0;j<parseInt($scope.row);j++){
                var card = {
                    No:'',
                    status:'unmatch'
                };
                card.No = dataset[index];
                index += 1;
                $scope.cardLayout[i].push(card);
            }
        }
    }
    
    $scope.match = [];
    $scope.cardFunction = function(card,row,column){
        $scope.move += 1;
        console.log(card,row,column);
        var arr = {
            row:row,
            column:column,
            obj:card
        };
        $scope.cardLayout[row][column].status = 'open';
        $scope.match.push(arr);
        if($scope.match.length==2){
            if($scope.match[0].obj.No == $scope.match[1].obj.No){
                console.log($scope.match);
                console.log( $scope.cardLayout[0]);
                $scope.cardLayout[$scope.match[0].row][$scope.match[0].column].status = 'matched';
                $scope.cardLayout[$scope.match[1].row][$scope.match[1].column].status = 'matched';
                $scope.match = [];
            }else{
                $timeout(function(){
                    $scope.cardLayout[$scope.match[0].row][$scope.match[0].column].status = 'unmatch';
                    $scope.cardLayout[$scope.match[1].row][$scope.match[1].column].status = 'unmatch';   
                    $scope.match = [];
                },200);       
            }
        }
    }


}]);