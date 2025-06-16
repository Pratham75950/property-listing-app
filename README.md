# My PropertyListing App

This is a sample property listing mobile app built using **Expo**, **TypeScript**, and **React Native**. It showcases basic app features including a property list, booking system, profile screen, and API integration via JSON-server.

---

## 📱 Features

- Property list with a search bar
- Property detail screen with map and feature list
- Book a property (local JSON server)
- View bookings
- Bottom tab navigation: Home, Bookings, Profile
- State management with **Zustand** and **Jotai**
- Styling with **twrnc (NativeWind)**

---

## 🚀 How to Run the App

### 1. Clone the repo

```bash
git clone https://github.com/your-username/my-rental-app.git
cd my-rental-app

 1. Clone the repo
npm install

2. Install dependencies
npm install

3. Start JSON Server

npx json-server --watch db.json --port 3001


Make sure your Android emulator or device is on the same network and replace API URL with your local IP, currently in constant/index.ts to run in emulator uncomment the code.
http://10.0.2.2:3001


4. Start the Expo app
npm start
Press a to launch the app in Android emulator or npm run android .

🤖 Running on Android Emulator
Make sure Android Studio Emulator is open and running.

Use npm start (or npx expo start) and press a in the CLI.

If you face issues with API not fetching on emulator, try:

Use your local machine's IP address in API base URL (http://192.168.1.X:3001)

Avoid using localhost or 127.0.0.1 — those refer to the emulator itself, not your machine.

The app assumes a local development setup with a running JSON-server.
