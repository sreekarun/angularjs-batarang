var inject = function () {
  document.head.appendChild((function () {

    var fn = function bootstrap (window){
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

        window.visualDebug = {};
        var vd = window.visualDebug;
        vd.version = "0.0.1";

    }



    // Return a script element with the above code embedded in it
    var script = window.document.createElement('script');
    script.innerHTML = '(' + fn.toString() + '(window))';

    return script;
  }()));
};

// only inject if cookie is set
  document.addEventListener('DOMContentLoaded', inject);