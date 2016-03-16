describe('Testing sampleOne directive', function() {
  var scope,
      elem,
      directive,
      compiled,
      html;
      
  beforeEach(function (){
    //load the module
    module('plunker');
    
    //set our view html.
    html = '<div sample-one="foo"></div>';
    
    inject(function($compile, $rootScope) {
      //create a scope (you could just use $rootScope, I suppose)
      scope = $rootScope.$new();
      
      //get the jqLite or jQuery element
      elem = angular.element(html);
      
      //compile the element into a function to 
      // process the view.
      compiled = $compile(elem);
      
      //run the compiled view.
      compiled(scope);
      
      //call digest on the scope! (we need to do it because AngularJS is not updating view and model. We are in testing.)
      scope.$digest();
    });
  });

  it('Should set the text of the element to whatever was passed.', function() {
    //set a value (the same one we had in the html)
    scope.foo = 'bar';
    
    //check to see if it's blank first.
    expect(elem.text()).toBe('');
    
    //click the element.
    elem[0].click();
    
    //test to see if it was updated.
    expect(elem.text()).toBe('bar');
  });
});

describe('sampleTwo directive', function (){
  var scope, html, elem, compiled;
  
  beforeEach(function (){
    module('plunker');
    
    html = '<sample-two value="foo"></sample-two>';
    
    inject(function($compile, $rootScope) {
      //create the scope.
      scope = $rootScope.$new();
      
      //set the test value.
      scope.foo = 'bar';
      
      //get the element.
      elem = angular.element(html);
      
      //compile the view.
      compiled = $compile(elem);
      
      //run the view against the scope.
      compiled(scope);
      
      //call digest to update the view!
      scope.$digest();
    });
  });
  
  it('should set text to "bar"', function (){
    expect(elem.text()).toBe('bar');
  });
  
  it('should set text to whatever is in foo', function (){
    //do something to change the value.
    scope.foo = 'blah';
    
    //apply it to the view.
    scope.$digest();
    
    //test it.
    expect(elem.text()).toBe('blah');
  })
})