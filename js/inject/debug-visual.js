var inject = function () {
  document.head.appendChild((function () {

    var fn = function bootstrap (window){

        var __vd = {};
        /*******************************************/
        //Helpers
        /*******************************************/
        // Based on cycle.js
        // https://github.com/douglascrockford/JSON-js/blob/master/cycle.js

        // Make a deep copy of an object or array, assuring that there is at most
        // one instance of each object or array in the resulting structure. The
        // duplicate references (which might be forming cycles) are replaced with
        // an object of the form
        //      {$ref: PATH}
        // where the PATH is a JSONPath string that locates the first occurrence.
        var decycle = function (object) {
            var objects = [],   // Keep a reference to each unique object or array
                paths = [];     // Keep the path to each unique object or array

            return (function derez(value, path) {
                var i,          // The loop counter
                    name,       // Property name
                    nu;         // The new object or array
                switch (typeof value) {
                    case 'object':
                        if (value instanceof HTMLElement) {
                            return value.innerHTML.toString().trim();
                        }
                        if (!value) {
                            return null;
                        }
                        for (i = 0; i < objects.length; i += 1) {
                            if (objects[i] === value) {
                                return {$ref: paths[i]};
                            }
                        }
                        objects.push(value);
                        paths.push(path);
                        if (value instanceof Array) {
                            nu = [];
                            for (i = 0; i < value.length; i += 1) {
                                nu[i] = derez(value[i], path + '[' + i + ']');
                            }
                        } else {
                            nu = {};
                            for (name in value) {
                                if (name[0] !== '$' && Object.prototype.hasOwnProperty.call(value, name)) {
                                    nu[name] = derez(value[name],
                                        path + '[' + JSON.stringify(name) + ']');
                                }
                            }
                        }
                        return nu;
                    case 'number':
                    case 'string':
                    case 'boolean':
                        return value;
                }
            }(object, '$'));
        };
        // End
        // ===
        var class2type = {};
        var core_toString = class2type.toString;
        var core_hasOwn = class2type.hasOwnProperty;
        var items = "Boolean Number String Function Array Date RegExp Object Error";
        items.split(" ").forEach(function(name , i) {
            class2type[ "[object " + name + "]" ] = name.toLowerCase();
        });
        var type = function( obj ) {
            if ( obj == null ) {
                return String( obj );
            }
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[ core_toString.call(obj) ] || "object" :
                typeof obj;
        };
        var isWindow = function( obj ) {
            /* jshint eqeqeq: false */
            return obj != null && obj == obj.window;
        };

        var isPlainObject = function( obj ) {
            var key;

            // Must be an Object.
            // Because of IE, we also have to check the presence of the constructor property.
            // Make sure that DOM nodes and window objects don't pass through, as well
            if ( !obj || type(obj) !== "object" || obj.nodeType || isWindow( obj ) ) {
                return false;
            }

            try {
                // Not own constructor property must be Object
                if ( obj.constructor &&
                    !core_hasOwn.call(obj, "constructor") &&
                    !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
                    return false;
                }
            } catch ( e ) {
                // IE8,9 Will throw exceptions on certain host objects #9897
                return false;
            }


            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.
            for ( key in obj ) {}

            return key === undefined || core_hasOwn.call( obj, key );
        };


        window.visualDebug = {};
        var vd = window.visualDebug;
        vd.version = "0.0.1";
        vd.keys = Object.keys(window).filter(function(item, index){
            return isPlainObject(window[item]);
        });

    };



    // Return a script element with the above code embedded in it
    var script = window.document.createElement('script');
    script.innerHTML = '(' + fn.toString() + '(window))';

    return script;
  }()));
};

  document.addEventListener('DOMContentLoaded', inject);