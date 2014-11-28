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

    var Exception = function(previous, message) {
        this.message = message;
        this.previous = previous;
    };

    Exception.prototype = new Error();
    Exception.prototype.constructor = Exception;

    return Exception;
})();
