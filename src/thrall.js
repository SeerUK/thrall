#!/usr/bin/env node

/**
 * This file is part of Thrall.
 *
 * (c) Elliot Wright <elliot@elliotwright.co>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

"use strict";

var bluebird = require("bluebird");
var chalk    = require("chalk");
var findup   = require("findup-sync");
var moment   = require("moment");
var prettyMs = require('pretty-ms');
var eh       = require("./utils/exception-handler");
var logger   = require("./utils/logger");
var runner   = require("./utils/runner");
var pkg      = require("../package.json");
var version  = pkg.version;

var Exception = require("./exception/exception");

var options = require("commander")
    .version(version)
    .option("-k, --keep-going", "continue as much as possible after an error")
    .option("-p, --plain", "disable colors")
    .option("-q, --quiet", "don't print any output")
    .parse(process.argv);

/**
 * Start module
 *
 * @param {Object} options Parsed Commander options object
 *
 * @return {Object} The Thrall module
 */
var thrall = new (function(options) {
    var self = this;
    var started = moment();

    /**
     * Process CLI options
     *
     * @return {Void}
     */
    self.processOptions = function() {
        if (options.plain) { logger.setPlain(true); }
        if (options.quiet) { logger.setEnabled(false); }
    };

    /**
     * Process the targets in the thrallfile
     *
     * @return {Object} Parsed configuration
     */
    self.processTargets = function() {
        return runner.process(findup("thrallfile.js"));
    };

    /**
     * Exits the application
     *
     * @param {Integer} code Exit code
     *
     * @return {Void}
     */
    self.exit = function(code) {
        var et = parseInt(moment().format("x")) - parseInt(started.format("x"));

        logger.break();
        logger.log(chalk.underline("Execution Time"));
        logger.log(chalk.magenta("Total: " + prettyMs(et)));
        logger.break();

        process.exit(code);
    };

    return {
        /**
         * Run Thrall
         *
         * @return {Void}
         */
        run: function() {
            logger.break();

            self.processOptions(options);
            self.processTargets().then(
                function() {
                    self.exit(0);
                },
                function() {
                    self.exit(1);
                }
            );
        },

        exit: self.exit
    };
})(options);

try {
    thrall.run();
} catch (e) {
    eh.handle(e);
    thrall.exit(1);
}
