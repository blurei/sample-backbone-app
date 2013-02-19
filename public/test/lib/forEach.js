(function(global, undefined) {
    
    var SEARCH_REGEX = /\{\{.*\}\}/;
    
    var TestWithDataGroup = function(listOfObjects) {
        this.listOfObjects = listOfObjects;
    };
    
    function makeTestCallback(test, objectToTest) {
        return function() {
            test.call(this, objectToTest);
        };
    }

    TestWithDataGroup.prototype = {
        listOfObjects: null,
        
        it: function(message, test) {
            var listOfObjects = this.listOfObjects;
            
            for(var reasonInList in listOfObjects) {
                if (listOfObjects.hasOwnProperty(reasonInList)) {

                    var currentMessage = message.replace(SEARCH_REGEX, reasonInList);
                    var objectToTest = listOfObjects[reasonInList];

                    it(currentMessage, makeTestCallback(test, objectToTest));

                }
            }

            return this;
        }
    };

    var forEach = function(listOfObjects) {
        return new TestWithDataGroup(listOfObjects);
    };
    
    global.forEach = forEach;
    
    if (typeof global.define === "function" && global.define.amd && global.define.amd.jQuery) {
        define(function () { return forEach; } );
    }
})(this);