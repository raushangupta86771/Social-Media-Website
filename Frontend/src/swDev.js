export default function swDev() {

    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    function determineAppServerKey() {
        var vapidKey = "your vapid key"
        return urlBase64ToUint8Array(vapidKey)
    }

    // console.log("our web push code - ",vapidKeys)

    let swUrl = `${process.env.PUBLIC_URL}/sw.js`
    navigator.serviceWorker.register(swUrl)
        .then((registration) => {
            console.warn('Service Worker registered:', registration);
            return registration.pushManager.getSubscription()
                .then(function (subs) {
                    console.log("encoded key - ",determineAppServerKey())
                    return registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: determineAppServerKey()
                    })
                })
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
}
