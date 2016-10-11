/**
 * Created by Sanjay on 10/6/2016.
 */
'use strict';

angular.module('myApp.question', ['ngRoute'])

    .config(['$routeProvider','$resourceProvider', function($routeProvider,$resourceProvider) {
        $routeProvider.when('/question', {
            templateUrl: 'question/question.html',
            controller: 'QuestionCtrl'
        });
        $resourceProvider.defaults.stripTrailingSlashes = true;
    }])

    .controller('QuestionCtrl', ['$scope','$location','$window','$route',function($scope,$location,$window,$route) {

        $scope.gameInit=function(){
            $scope.currentRow = 0;
            $scope.currentCol= 0;
            $scope.level=0;
            $scope.showQuestion=false;
            $scope.showLogo=true;
            $scope.showAnswer=false;
            $scope.levelTimer=5;
            $scope.endGame=false;
        };
        $scope.gameAnswerInit=function(){
            $scope.answerCounter=0;
            $scope.answerLength=0;
            $scope.answerLength=$scope.questionArray.length-1;
            $scope.wrongPathSelected = false;
            $scope.showWhenWrong = false;
            $scope.percentageCorrect = 0;
            $scope.userDetails = {};
            $scope.showLeaderBoardForm= true;
            $scope.showWhenFinish=false;
            $scope.showWhenRight=false;
            $scope.rightPathSelected=false;
        };
        $scope.goToNextLevel=function(){

            $scope.levelTimer=$scope.levelTimer-0.5;
            if($scope.levelTimer>0){
                $scope.showQuestion=true;
                $scope.showAnswer=false;
                $scope.initialiseGrid();
                $scope.gameAnswerInit();
                angular.element($( "td" ).removeClass( "selected-question" ));
                angular.element($( "td" ).removeClass( "selected-answer-correct" ));
                angular.element($( "td" ).removeClass( "selected-answer-wrong" ));
                //$scope.resetClock();
                $scope.$broadcast('timer-set-countdown-seconds',$scope.levelTimer);
            }
            else{
                $scope.showAnswer=false;
                $scope.endGame=true;
            }


        };
        $scope.leaderBoard=[
            {name:"Bruce Wayne",points:589},
            {name:"Diana Prince",points:502},
            {name:"Clark Kent",points:452},
            {name:"Barry Allen",points:433},
            {name:"Arthur Curry",points:373}
        ]
        $scope.leaderBoard.sort(function(a, b){
            return b.points-a.points;
        })
        $scope.addToLeaderBoard= function(){
            $scope.userDetails.points = $scope.percentageCorrect;
            $scope.leaderBoard.push($scope.userDetails);
            $scope.leaderBoard.sort();
            $scope.showLeaderBoardForm=false;
            $scope.showWhenWrong = false;
            $scope.showWhenFinish=true;
        }
        $scope.gameInit();
        $scope.setLevel=function(){
            $scope.level = $scope.level+1;
            $scope.numOfRows = $scope.level+3;
            $scope.numOfCols = $scope.level+3;
        };
        $scope.setGridDimensions= function(level){
            $scope.numOfRows = level+3;
            $scope.numOfCols = level+3;
        };
        $scope.setGridDimensions($scope.level);
        $scope.createGridArray=function(numOfRows,numOfCols){
            $scope.myGrid =new Array(numOfRows+1);
            for (var i=0; i <numOfCols+1; i++)
                $scope.myGrid[i]=new Array(numOfCols+1);
            //console.log($scope.myGrid);
        };
        $scope.createGridArray( $scope.numOfRows, $scope.numOfCols)
        $scope.getNumber=function(num){
            var x=new Array(); for(var i=0;i<num;i++){ x.push(i+1); } return x;
        };

        $scope.getRandomInt= function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        $scope.getNextTile= function(){
            var goVerticalorHorizontal = $scope.getRandomInt(0,6);
            switch (goVerticalorHorizontal) {
                case 0:
                    return $scope.goVertical();
                    break;
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    return $scope.goHorizontal();
                    break;
            }
        };

        $scope.checkIfBoxIsMade=function(direction){

            if(direction == "left"){
                if( $scope.myGrid[$scope.currentRow+1][$scope.currentCol-1]!="1"  ){
                    return true
                }
                else
                    return false
            }
            if(direction == "right"){
                if( $scope.myGrid[$scope.currentRow+1][$scope.currentCol+1]!="1"){
                    return true
                }
                else
                    return false
            }

        };

        $scope.goLeft=function(){
            if(($scope.currentCol-1)<0){
                return $scope.goVertical()
            }
            else {
                if($scope.myGrid[$scope.currentRow][$scope.currentCol-1]!="1" && $scope.checkIfBoxIsMade("left")){
                    $scope.currentCol--;
                    $scope.myGrid[$scope.currentRow][$scope.currentCol]={};
                    $scope.myGrid[$scope.currentRow][$scope.currentCol]="1"
                    var tileObj = {row:$scope.currentRow,col:$scope.currentCol}
                    return tileObj ;
                }
                else{
                    return $scope.goVertical();
                }
            }
            //return "Going left";
        };

        $scope.goRight=function(){
            if(($scope.currentCol+1)>=$scope.numOfCols){
                return $scope.goVertical()
            }
            else {
                if($scope.myGrid[$scope.currentRow][$scope.currentCol+1]!="1" && $scope.checkIfBoxIsMade("right")){
                    $scope.currentCol++;
                    $scope.myGrid[$scope.currentRow][$scope.currentCol]={};
                    $scope.myGrid[$scope.currentRow][$scope.currentCol]="1"
                    var tileObj = {row:$scope.currentRow,col:$scope.currentCol}
                    return tileObj ;
                }
                else{
                    return $scope.goVertical();
                }
            }
            //return "Going right";
        }

        $scope.goVertical=function(){
            if($scope.currentRow-1 >= 0){
                $scope.currentRow--;
                $scope.myGrid[$scope.currentRow][$scope.currentCol]={};
                $scope.myGrid[$scope.currentRow][$scope.currentCol]="1";
                var tileObj = {row:$scope.currentRow,col:$scope.currentCol}
                return tileObj;
            }
            else{
                $scope.currentRow--;
                return "end"
            }
        };
        $scope.goHorizontal=function(){
            var goLeftorRight = $scope.getRandomInt(0,1);
            if($scope.currentRow == 0){
                $scope.currentRow--;
                return "end";
            }
            if(goLeftorRight == 0){
               return $scope.goLeft();
            }
            else if(goLeftorRight == 1){
                return $scope.goRight();
            }
        };

        $scope.drawPath=function(){
            $scope.questionArray= [];
            var startRow = $scope.numOfRows - 1;
            var endRow = 0;
            var startCol = $scope.getRandomInt(0,startRow);
            console.log("StartRow"+startRow);
            console.log("StartCol"+startCol);
            $scope.currentRow=startRow;
            $scope.currentCol=startCol;
            var tileObj = {row:startRow,col:startCol};
            $scope.questionArray.push(tileObj);
            //console.log($scope.myGrid);
            // $scope.myGrid[startRow]={};
            $scope.myGrid[startRow][startCol] = {};
            $scope.myGrid[startRow][startCol] = "1";
            do{
                var newTileObj =$scope.getNextTile()
                $scope.questionArray.push(newTileObj)
            }while($scope.currentRow>=0)
            //console.log($scope.myGrid);
            console.log($scope.questionArray);
            for(var i=0; i<$scope.questionArray.length;i++){
                var node = $scope.questionArray[i];
                //console.log("node:"+node);
                //console.log("row:"+node.row);
                // console.log("col:"+node.col);
                var rownum = node.row;
                var colnum = node.col;
                var myEl = angular.element( document.querySelector("tr[data-value-row='"+rownum+"'] td[data-value-col='"+colnum+"']") );
                myEl.addClass('selected-question');
            }
            $scope.gameAnswerInit();
        }
        $scope.$on('timer-stopped', function (event, data){
            console.log('Timer Stopped - data = ', data);
            $scope.showQuestion=false;
            $scope.showAnswer=true;
            //$location.url('/view1');
            $scope.$apply()
        });
        $scope.startLevelTimer=function(){
            $scope.$broadcast('timer-start');
            $scope.timerRunning = true;
        }
        $scope.resetClock = function() {
            if ((!$scope.timerRunning))
                $scope.$broadcast('timer-reset');
        }
        $scope.initialiseGrid=function(){
            $scope.questionArray= [];
            $scope.setLevel();
            //$scope.setGridDimensions($scope.level);
            $scope.createGridArray( $scope.numOfRows, $scope.numOfCols)
            $scope.timerRunning=false;
        };
        $scope.generateQuestion= function(){
            $scope.drawPath();
            $scope.startLevelTimer();
        }
        $scope.startGame=function(){
            $scope.showQuestion=true;
            $scope.showLogo=false;
            $scope.initialiseGrid();
        };
        $scope.validateAnswer=function(event){
            //console.log(event.target);
            //console.log(event.target.parentNode);
            //console.log("qtnrow:"+$(event.target.parentNode).attr("answer-data-value-row"));
            //console.log("qtncol:"+$(event.target).attr("answer-data-value-col"));
            var answerCurrentRow = parseInt($(event.target.parentNode).attr("answer-data-value-row"));
            var answerCurrentCol = parseInt($(event.target).attr("answer-data-value-col"));
            var correctTile = $scope.questionArray[$scope.answerCounter];
            console.log("qtncol:"+correctTile.col);
            console.log("qtnrow:"+correctTile.row);
            console.log($scope.answerCounter)
            //console.log("ansrow:"+answerCurrentRow);
            //console.log("anscol:"+answerCurrentCol);
           // $scope.answerCounter = $scope.answerCounter +1;
            if( $scope.answerCounter == $scope.answerLength){
                $scope.rightPathSelected =true;
            }

            if($scope.wrongPathSelected == false && $scope.rightPathSelected == false){
                if(correctTile.row==answerCurrentRow && correctTile.col==answerCurrentCol){
                    var myEl = angular.element( document.querySelector("tr[answer-data-value-row='"+answerCurrentRow+"'] td[answer-data-value-col='"+answerCurrentCol+"']") );
                    myEl.addClass('selected-answer-correct');
                    $scope.answerCounter = $scope.answerCounter +1;
                    if($scope.answerCounter == $scope.answerLength){
                        $scope.showWhenRight = true;
                    }
                }
                else{
                    var myEl = angular.element( document.querySelector("tr[answer-data-value-row='"+answerCurrentRow+"'] td[answer-data-value-col='"+answerCurrentCol+"']") );
                    myEl.addClass('selected-answer-wrong');
                    $scope.wrongPathSelected = true;
                    $scope.showWhenWrong = true;
                    $scope.percentageCorrect = parseInt(($scope.answerCounter/($scope.answerLength))*100);
                }
            }

        };

        $scope.finishGame=function(){
            $scope.gameInit();
            $scope.gameAnswerInit();
            $scope.initialiseGrid();
           // $location.path('/question');
           // $window.location.href='/question';
            //$window.location.reload();
            $route.reload();
            //$scope.$apply();
        }
    }])

    .controller('StartPageCtrl', ['$scope',function($scope) {

    }]);