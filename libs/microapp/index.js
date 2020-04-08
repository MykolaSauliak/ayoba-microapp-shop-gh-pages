global.Ayoba = getAyoba()

/**
 * Determine the mobile operating system and returns the 
 * proper javascript interface
 */
function getAyoba() {
    var userAgent = global?.navigator?.userAgent || global?.navigator?.vendor || window?.opera ||  global?.opera || navigator?.userAgent || navigator?.vendor;
    
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return null;
    }

    if (/android/i.test(userAgent)) {
        // return Android;
        return Android || global.Android || window?.Android;
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return null; // todo 
    }

    return "unknown";
}

export {
    getAyoba
}