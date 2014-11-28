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

    var logger = require("./logger");

    var self = this;

    return {
        handle: function(e) {
            if (e instanceof Error) {
                logger.error(e.message);
            }
        }
    };
})();
