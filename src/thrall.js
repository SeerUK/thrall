#!/usr/bin/env node

/**
 * This file is part of nomake.
 *
 * (c) Elliot Wright <elliot@elliotwright.co>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

"use strict";

var options = require("commander"),
    nomake;

options
    .version("0.0.1a")
    .option("-c, --config", "specify a 'Nomakefile'")
    .option("-k, --keep-going", "continue as much as possible after an error")
    .option("-q, --quiet", "don't print any output")
    .parse(process.argv);

nomake = new (function(options) {
    var self = this;

    self.foo = function() {
        console.log(self.bar());
    };

    self.bar = function() {
        return "bar";
    };

    return {
        run: function() {
            self.foo();
        },
        task: function(dependencies, commands) {
            var self = this;


        }
    };
})(options);

if (!module.parent) {
    nomake.run();
} else {
    module.exports = nomake;
}
