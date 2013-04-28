define([], function() {

	var superIndex = '_super';
		
	function extend(Child, Parent){
			
		if (typeof Child !== 'function' || typeof Parent !== 'function') {
			throw('Class::extend - Could not extend class');
		};
		
		function Temp(){};
		Temp.prototype        = Parent.prototype;
		var prototype         = new Temp();
		prototype.constructor = Child;
		
		for (var key in Child.prototype) {
			if (typeof prototype[key] === 'function' && typeof Child.prototype[key] === 'function') {
				prototype[key] = superMethod(prototype[key], Child.prototype[key]);
			} else {
				prototype[key] = Child.prototype[key];
			};
		};
		
		Child.prototype = prototype;
		
		return Child;
		
	}
	
	function superMethod(superMethod, currentMethod){
		
		return function() {
			var tmp          = this[superIndex];
			this[superIndex] = superMethod;
			var result       = currentMethod.apply(this, arguments);
			
			if (tmp == null) {
				delete(this[superIndex]);
			}
			else {
				this[superIndex] = tmp;
			}
			
			return result;
		};
	}
	
	return {
		extend: extend
	};

});
