import { firebaseAnalytics } from "../firebase";

export function firebsaeAnalyticsLogEvent(text) {
    firebaseAnalytics.logEvent(text)
}