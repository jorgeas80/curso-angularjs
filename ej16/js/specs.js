describe("myApp", function() {
 
    beforeEach(module('myApp'));
 
    describe("SimpleController", function() {
 
        var SimpleController;
                
        beforeEach(inject(function($controller) {
            SimpleController = $controller("SimpleController");
        }));

        it("should start with x = 3", function() {
            expect(SimpleController.x).toBe(3);
        });

        it("should start with y = 4", function() {
            expect(SimpleController.y).toBe(4);
        })
 
        it("should double the numbers x", function() {
            SimpleController.doubleIt();
            expect(SimpleController.x).toBe(6);
        });
        
        it("should double the numbers y", function() {
            SimpleController.doubleIt();
            expect(SimpleController.y).toBe(8);
        });
    });
});