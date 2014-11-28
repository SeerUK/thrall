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

    var chalk   = require("chalk");
    var figures = require("figures");
    var moment  = require("moment");

    var self = this;

    self.plain = false;
    self.quiet = false;

    self.generatePrefix = function(color) {
        return chalk[color](moment().format("HH:mm:ss")) + " " + chalk.gray(figures.arrowRight) + " ";
    };

    return {
        /**
         * Create a blank line
         *
         * @return {Void}
         */
        break: function() {
            if (!self.quiet) { console.log(); }
        },

        /**
         * If logging is enabled, log the value
         *
         * @param {Mixed} value Value to log
         *
         * @return {Void}
         */
        log: function(value) {
            if (!self.quiet) { console.log(self.generatePrefix("blue") + value); }
        },

        /**
         * If logging is enabled, log the success value
         *
         * @param {Mixed} value Value to log
         *
         * @return {Void}
         */
        success: function(value) {
            if (!self.quiet) { console.log(self.generatePrefix("green") + value); }
        },

        /**
         * If logging is enabled, log a warning
         *
         * @param {Mixed} value Value to log
         *
         * @return {Void}
         */
        warn: function(value) {
            if (!self.quiet) { console.log(self.generatePrefix("yellow") + value); }
        },

        /**
         * If logging is enabled, log an error
         *
         * @param {Mixed} value Value to log
         *
         * @return {Void}
         */
        error: function(value) {
            if (!self.quiet) { console.log(self.generatePrefix("red") + value); }
        },

        /**
         * Set plain
         *
         * @param {Boolean} plain If colors are enabled
         *
         * @return {Void}
         */
        setPlain: function(plain) {
            chalk.enabled = !plain;
        },

        /**
         * Set quiet
         *
         * @param {Boolean} quiet If logging is enabled
         *
         * @return {Void}
         */
        setQuiet: function(quiet) {
            self.quiet = !!quiet;
        }
    };
})();
