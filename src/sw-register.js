export default function LocalServiceWorkerRegister() {
  const swPath = `http://localhost:3000/sw-build.js`;
  if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'production') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register(swPath).then((registration) => {
        console.log('Service worker registered');
      });
    });
  }
}
