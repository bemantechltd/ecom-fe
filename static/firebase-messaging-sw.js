
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js'
)
firebase.initializeApp({"apiKey":"AIzaSyDDBkDqace5zNTbSAPaNJd6OOnLYDr0pP4","authDomain":"medquicker.firebaseapp.com","projectId":"medquicker","storageBucket":"medquicker.appspot.com","messagingSenderId":"959416255908","appId":"1:959416255908:web:4184c4552c58b2fb76ad31","measurementId":"G-M3KWYRFXRW"})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

// Setup event listeners for actions provided in the config:
self.addEventListener('notificationclick', function(e) {
  const actions = [{"action":"randomName","url":"randomUrl"}]
  const action = actions.find(x => x.action === e.action)
  const notification = e.notification

  if (!action) return

  if (action.url) {
    clients.openWindow(action.url)
    notification.close()
  }
})
