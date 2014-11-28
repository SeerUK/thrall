module.exports = function(target, task) {

    "use strict";

    /**
     * Default task
     */
    target("default", [ "test" ]);

    /**
     * Install prerequisites
     */
    target("setup", [], function() {
        task("nvm use 0.10");
        task("npm install");
    });

    /**
     * Run tests
     */
    target("test", [ "setup" ], function() {
        task("npm test");
    });
};
