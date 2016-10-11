'use strict';

describe('myApp.question module', function() {

    beforeEach(module('myApp.question'));

    describe('question controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var questionCtrl = $controller('QuestionCtrl');
            expect(questionCtrl).toBeDefined();
        }));

    });
});