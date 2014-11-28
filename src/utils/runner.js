/**
 * This file is part of Thrall.
 *
 * (c) Elliot Wright <elliot@elliotwright.co>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

module.exports = new (function() {

    "use strict";

    var bluebird  = require("bluebird");
    var chalk     = require("chalk");
    var exec      = require('exec');
    var figures   = require("figures");
    var moment    = require("moment");
    var logger    = require("./logger");
    var Exception = require("../exception/exception");

    var self = this;

    self.validateConfig = function(config) {
        if (typeof config !== "function") {
            throw new Exception(null, "Invalid configuration.");
        }
    };

    self.target = function(runner) {
        var self = this;

        self.runner = runner;

        return function(target, deps, callback) {
            console.log(target, deps);

            if (typeof callback === "function") {
                callback();
            }
        };
    };

    self.task = function(runner) {
        var self = this;

        self.runner = runner;

        return function(task) {
            console.log(task);
        }
    }

    self.executeConfig = function(config) {
        try {
            config(self.target(self), self.task(self));
        } catch (e) {
            throw new Exception(null, "Invalid thrallfile.");
        }
    };

    return {
        process: function(file) {
            var deferred = bluebird.defer();

            exec(['ls', '-lha'], function(err, out, code) {
                if (err instanceof Error) {
                    throw err;
                }

                console.log(err);
                console.log(out);
            });

            return deferred.promise;

            // console.log(child);
            // var config;

            // try {
            //     config = require(file);
            // } catch (e) {
            //     throw new Exception(null, "Couldn't find thrallfile, forget to create one?.");
            // }

            // logger.log("Registering targets from file " + chalk.yellow("\"" + file + "\""));

            // self.validateConfig(config);
            // self.executeConfig(config);
        }
    }

})();
