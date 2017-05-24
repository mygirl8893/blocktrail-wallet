angular.module('blocktrail.wallet')
    .factory('trackingService', function(tuneTrackingService, $analytics) {

        var EVENTS = {
            OPEN: "open",
            REGISTRATION: "registration",
            LOGIN: "login",
            ACTIVATED: "activated",
            TELLAFRIEND: "tellafriend",
            BUYBTC: {
                REGION_OK: "region_ok",
                REGION_NOTOK: "region_notok",
                GLIDERA_SETUP_INIT: "glidera_setup_init",
                GLIDERA_SETUP_UPDATE: "glidera_setup_update",
                GLIDERA_SETUP_DONE: "glidera_setup_done",
                GLIDERA_OPEN: "glidera_open",
                GLIDERA_BUY: "glidera_buy",
                GLIDERA_BUY_CONFIRM: "glidera_buy_confirm",
                GLIDERA_BUY_ERR: "glidera_buy_error",
                GLIDERA_BUY_DONE: "glidera_buy_done"
            },
            APPRATE_STAR: "apprate_star",
            APPRATE: "apprate"
        };

        var ANALYTICS_META = {};
        Object.keys(EVENTS.BUYBTC).forEach(function(eventKey) {
            var eventVal = EVENTS.BUYBTC[eventKey];
            ANALYTICS_META[eventVal] = { category: "BuyBTC" };
        });

        var getBrowserFingerprint = function() {
            // Return a promise for a fingerprint and its components
            return new Promise(function (resolve, reject) {
                new Fingerprint2().get(function (result, components) {
                    if(!result) reject();
                    resolve({
                        "hash": result,
                        "components": components
                    });
                });
            });
        };

        var trackEvent = function(event, meta) {
            tuneTrackingService.measureEvent(event);
            $analytics.eventTrack(event, ANALYTICS_META[event] || { category: 'Events' });
        };

        return {
            EVENTS: EVENTS,
            trackEvent: trackEvent,
            getBrowserFingerprint: getBrowserFingerprint
        }
    })
;
