# Fleetx Cab — Project Overview

> A simple explanation of this ride-hailing app (like Uber/Ola). Written so a beginner can understand it.

---

## 1. Complete Folder Structure

```
Fleetx-Cab-main/
├── .gitignore                    # Lists files/folders Git should ignore
├── PROJECT_OVERVIEW.md           # This file (created for you)
├── Backend/                      # ← The server (backend API) lives here
│   ├── .env                      # Secret environment variables (DO NOT open/read)
│   ├── package.json              # Backend dependencies + scripts
│   ├── package-lock.json         # Lock file for npm
│   ├── README.md                 # Backend API documentation
│   ├── app.js                    # Main app setup (middleware, routes)
│   ├── db.js                     # Database connection logic
│   ├── server.js                 # Starts the HTTP server + socket.io
│   ├── socket.js                 # Real-time communication logic
│   ├── controllers/              # Request handlers (logic for each route)
│   │   ├── captain.controller.js # Logic for captain (driver) endpoints
│   │   ├── map.controller.js     # Logic for map/coordinate endpoints
│   │   ├── ride.controller.js    # Logic for ride endpoints
│   │   └── user.controller.js    # Logic for user (customer) endpoints
│   ├── middlewares/              # Intercept requests (e.g., auth checks)
│   │   └── auth.middleware.js    # JWT authentication checks
│   ├── models/                   # Database schemas
│   │   ├── blacklistToken.model.js  # Stores logged-out tokens
│   │   ├── captain.model.js      # Captain (driver) data schema
│   │   ├── ride.model.js         # Ride request data schema
│   │   └── user.model.js         # User data schema
│   ├── routes/                   # URL endpoints grouped by resource
│   │   ├── captain.routes.js     # /captains/* endpoints
│   │   ├── maps.routes.js        # /maps/* endpoints
│   │   ├── ride.routes.js        # /rides/* endpoints
│   │   └── user.routes.js        # /users/* endpoints
│   ├── services/                 # Business logic (called by controllers)
│   │   ├── captain.service.js    # Captain business logic
│   │   ├── maps.service.js       # Calls Google Maps API
│   │   ├── ride.service.js       # Ride logic (fares, OTP, status)
│   │   └── user.service.js       # User business logic
│   └── node_modules/             # Installed packages (auto-generated)
│
├── frontend/                     # ← The web app users see (React) lives here
│   ├── .env                      # Frontend env variables (DO NOT open/read)
│   ├── .gitignore                # Files Git should ignore (frontend)
│   ├── README.md                 # Frontend docs
│   ├── package.json              # Frontend dependencies + scripts
│   ├── package-lock.json         # Lock file for npm
│   ├── vite.config.js            # Build tool config
│   ├── tailwind.config.js        # Tailwind CSS config
│   ├── postcss.config.js         # PostCSS plugin config
│   ├── eslint.config.js          # Linter config
│   ├── index.html                # Main HTML page
│   ├── public/                   # Static assets (images)
│   │   ├── logo.png
│   │   └── vite.svg
│   └── src/                      # Source code
│       ├── main.jsx              # Entry point (renders the app)
│       ├── App.jsx               # Routes/pages definition
│       ├── App.css               # Global CSS
│       ├── index.css             # Tailwind import + base styles
│       ├── assets/               # Images used in the app
│       │   ├── auto.jpeg         # Auto-rickshaw image
│       │   ├── bike.png          # Bike image
│       │   ├── cap.png
│       │   ├── captainlogo.png   # Captain logo
│       │   ├── car.jpg           # Car image
│       │   ├── fleetx3.png
│       │   ├── fleetxlogo.png    # App logo
│       │   └── react.svg
│       ├── components/           # Reusable UI pieces
│       │   ├── CaptainDetails.jsx        # Shows captain info panel
│       │   ├── ConfirmRide.jsx           # Shows fare + confirms ride (user)
│       │   ├── ConfirmRidePopUp.jsx      # OTP input to start ride (captain)
│       │   ├── FinishRide.jsx            # "Finish ride" button (captain)
│       │   ├── LiveTracking.jsx          # Live map of user's location
│       │   ├── LocationSearchPanel.jsx   # Dropdown of address suggestions
│       │   ├── LookingForDriver.jsx      # "Looking for driver" screen
│       │   ├── RidePopUp.jsx             # New ride request popup (captain)
│       │   ├── VehiclePanel.jsx          # Choose car/bike/auto panel
│       │   └── WaitingForDriver.jsx      # Shows captain details (user)
│       ├── context/              # React Context for sharing data
│       │   ├── CapatainContext.jsx       # Stores captain session data
│       │   ├── SocketContext.jsx         # Sets up socket.io-client connection
│       │   └── UserContext.jsx           # Stores user session data
│       └── pages/                # Full-page screens
│           ├── CaptainHome.jsx           # Captain's home screen
│           ├── CaptainLogout.jsx         # Logs captain out
│           ├── CaptainProtectWrapper.jsx # Protects captain-only routes
│           ├── CaptainRiding.jsx         # Captain's "on-trip" screen
│           ├── CaptainSignup.jsx         # Captain registration form
│           ├── Captainlogin.jsx          # Captain login form
│           ├── Home.jsx                  # User's ride-search home screen
│           ├── Riding.jsx                # User's "on-trip" screen
│           ├── Start.jsx                 # Landing/welcome screen
│           ├── UserLogin.jsx             # User login form
│           ├── UserLogout.jsx            # Logs user out
│           ├── UserProtectWrapper.jsx    # Protects user-only routes
│           └── UserSignup.jsx            # User registration form
│       └── node_modules/                 # Installed packages (auto-generated)
```

---

## 2. What Every Important File Does

| File | Purpose |
|------|---------|
| `Backend/app.js` | The "control center." Loads middleware (JSON parser, cookies, CORS), connects to the database, and mounts all route groups (`/users`, `/captains`, `/maps`, `/rides`). |
| `Backend/server.js` | Creates the HTTP server using `app.js`, starts listening on a port, and calls `initializeSocket()` to enable real-time features. |
| `Backend/db.js` | `connectToDb()` connects to MongoDB using Mongoose. Called once at app start. |
| `Backend/socket.js` | Sets up Socket.IO. On a user/captain connecting, it saves their `socketId` in the database. It also receives live location updates from captains. Exports `sendMessageToSocketId` so other parts of the code can send messages to a specific connected client. |
| `Backend/middlewares/auth.middleware.js` | `authUser` and `authCaptain`: read the JWT token from a cookie or the Authorization header, check it is not blacklisted, verify it, then attach the user/captain object to `req`. Blocks access if invalid. |
| `Backend/models/user.model.js` | Mongoose schema for **users** (customers). Stores name, email, hashed password, socketId. Includes methods: `generateAuthToken`, `comparePassword`, `hashPassword`. |
| `Backend/models/captain.model.js` | Mongoose schema for **captains** (drivers). Stores name, email, hashed password, phone, vehicle details, status, socketId, and current location. Same auth methods. |
| `Backend/models/ride.model.js` | Mongoose schema for **rides**. Stores user, captain, pickup, destination, fare, status (`pending`/`accepted`/`ongoing`/`completed`/`cancelled`), OTP, distance, duration. |
| `Backend/models/blacklistToken.model.js` | Stores JWT tokens after logout so a "stolen" token can't be reused. Tokens auto-delete after 24 hours. |
| `Backend/controllers/user.controller.js` | Handles `/users/register`, `/users/login`, `/users/profile`, `/users/logout`. Validates input, hashes password, checks credentials, issues JWT tokens, stores/clears them in cookies. |
| `Backend/controllers/captain.controller.js` | Same pattern for captains: register, login, profile, logout. |
| `Backend/controllers/map.controller.js` | Handles coordinate lookup, distance/time, and autocomplete suggestion requests from the frontend (calls Google Maps API via `maps.service`). |
| `Backend/controllers/ride.controller.js` | Handles the full ride lifecycle: `createRide` (new ride request → notifies nearby captains via socket), `getFare`, `confirmRide` (captain accepts via socket), `startRide` (OTP verified via socket), `endRide` (via socket). |
| `Backend/services/user.service.js` | `createUser` — simple logic to create a user record. |
| `Backend/services/captain.service.js` | `createCaptain` — creates a captain record with vehicle info. |
| `Backend/services/maps.service.js` | Calls the **Google Maps API**: `getAddressCoordinate` (geocoding), `getDistanceTime`, `getAutoCompleteSuggestions`, and `getCaptainsInTheRadius` (finds nearby available captains using MongoDB geo-queries). |
| `Backend/services/ride.service.js` | Core ride logic: `getFare` (calculates fare by vehicle type), `createRide` (creates ride + generates 6-digit OTP), `confirmRide`, `startRide`, `endRide` (all with state + OTP checks). |
| `Backend/routes/user.routes.js` | URL → controller mappings for users (with input validation rules from `express-validator`). |
| `Backend/routes/captain.routes.js` | URL → controller mappings for captains (with validation). |
| `Backend/routes/maps.routes.js` | URL → controller mappings for maps (requires auth). |
| `Backend/routes/ride.routes.js` | URL → controller mappings for rides (auth required, either user or captain depending on route). |
| `frontend/src/main.jsx` | React entry point. Wraps `<App />` in Context providers (CaptainContext, UserContext, SocketProvider) and BrowserRouter for routing. |
| `frontend/src/App.jsx` | Defines all routes (URLs) and which page component shows for each — e.g. `/` → Start page, `/home` → user home (protected), `/captain-home` → captain home (protected). |
| `frontend/src/context/UserContext.jsx` | Creates a React Context that any component can read from to get the current user's data. |
| `frontend/src/context/CapatainContext.jsx` | Same — holds captain data for sharing across components. |
| `frontend/src/context/SocketContext.jsx` | Connects to the backend Socket.IO server and provides the `socket` object to any component via Context. |

---

## 3. Technologies, Libraries & Frameworks

| Technology | Why it is used |
|------------|----------------|
| **Node.js** (Backend runtime) | Lets you run JavaScript on the server. |
| **Express.js** | A lightweight web framework for Node.js — makes routing and middleware easy. |
| **MongoDB** | A "document" database — stores data as flexible JSON-like objects. |
| **Mongoose** | An Object Data Modeling (ODM) library for Node.js — makes talking to MongoDB easier with schemas. |
| **Socket.IO** | Enables real-time, two-way communication (e.g., notifying a captain about a new ride request instantly). |
| **bcrypt** | Securely "hashes" (scrambles) passwords before storing them. |
| **jsonwebtoken (JWT)** | Creates secure "tickets" (tokens) that prove who you are without re-logging-in each time. |
| **cookie-parser** | Reads cookies that the server sets (the JWT token is stored as a cookie). |
| **cors** | Allows the frontend (different domain) to talk to the backend safely. |
| **dotenv** | Loads secret values (like DB connection, API keys) from a `.env` file. |
| **express-validator** | Checks that incoming request data is valid (e.g., email must look like an email). |
| **axios** (Backend + Frontend) | Makes HTTP (API) requests from the backend to Google Maps, and from the frontend to the backend. |
| **React** (Frontend) | A JavaScript library for building user interfaces (buttons, forms, maps, etc.). |
| **Vite** | A fast build tool that compiles and serves the React app. |
| **React Router DOM** | Handles page navigation in React without reloading (e.g., `/login` → `/home`). |
| **Tailwind CSS** | A utility-first CSS framework — makes styling fast with class names like `flex`, `bg-white`, etc. |
| **Leaflet** | A map library. Shows an interactive map on the screen. |
| **react-leaflet** | React wrapper for Leaflet — lets you use maps inside React components. |
| **react-leaflet-marker** | Shows a pin/marker on the map for the current location. |
| **@react-google-maps/api** | Connects to Google Maps from React (used for autocomplete address suggestions). |
| **socket.io-client** | The frontend version of Socket.IO — connects the React app to the backend's real-time server. |
| **GSAP (@gsm/react)** | An animation library — makes panels slide up/down smoothly. |
| **Remixicon** | An icon library — provides icons like home, map pin, money, etc. (loaded via CSS). |
| **ESLint + Prettier** | Code quality tools — catch errors and keep styling consistent. |

---

## 4. Database Models & Their Fields

### User (customer) — `user.model.js`
| Field | Type | Rules |
|-------|------|-------|
| `fullname.firstname` | String | Required, minimum 3 characters |
| `fullname.lastname` | String | Optional, min 3 characters |
| `email` | String | Required, unique |
| `password` | String | Required, hidden (select:false) — stored as bcrypt hash |
| `socketId` | String | Optional — the current Socket.IO ID for real-time messaging |

### Captain (driver) — `captain.model.js`
| Field | Type | Rules |
|-------|------|-------|
| `fullname.firstname` | String | Required, min 3 characters |
| `fullname.lastname` | String | Optional, min 3 characters |
| `email` | String | Required, unique |
| `password` | String | Required, hidden — stored as bcrypt hash |
| `socketId` | String | Optional — Socket.IO ID |
| `status` | String | 'active' or 'inactive' (default: inactive) |
| `vehicle.color` | String | Required, min 3 characters |
| `vehicle.plate` | String | Required, min 3 characters |
| `vehicle.capacity` | Number | Required, minimum 1 |
| `vehicle.vehicleType` | String | Required — must be 'car', 'motorcycle', or 'auto' |
| `location.ltd` | Number | Optional — latitude |
| `location.lng` | Number | Optional — longitude |

### Ride — `ride.model.js`
| Field | Type | Rules |
|-------|------|-------|
| `user` | ObjectId → ref 'user' | Required — who booked the ride |
| `captain` | ObjectId → ref 'captain' | Optional — who accepted it |
| `pickup` | String | Required — pickup address |
| `destination` | String | Required — drop-off address |
| `fare` | Number | Required — cost of the ride |
| `status` | String | 'pending', 'accepted', 'ongoing', 'completed', 'cancelled' (default: pending) |
| `duration` | Number | Optional — in seconds |
| `distance` | Number | Optional — in meters |
| `paymentID` | String | Optional |
| `orderId` | String | Optional |
| `signature` | String | Optional |
| `otp` | String | Required — 6-digit code, hidden (select:false) |

### Blacklisted Token — `blacklistToken.model.js`
| Field | Type | Rules |
|-------|------|-------|
| `token` | String | Required, unique |
| `createdAt` | Date | Default now, auto-deletes after 24 hours |

---

## 5. All API Routes (Endpoints)

Base URL assumed: the backend runs on a port (see `Backend/.env` for `PORT`). Frontend talks to it via `VITE_BASE_URL`.

### User Routes (`/users`)
| Method | Path | Auth required? | Purpose |
|--------|------|----------------|---------|
| POST | `/users/register` | No | Register a new user account |
| POST | `/users/login` | No | Log in with email + password, get JWT |
| GET | `/users/profile` | Yes (user) | Get the current user's profile |
| GET | `/users/logout` | Yes (user) | Log out, blacklist token, clear cookie |

### Captain Routes (`/captains`)
| Method | Path | Auth required? | Purpose |
|--------|------|----------------|---------|
| POST | `/captains/register` | No | Register a new captain (driver) account |
| POST | `/captains/login` | No | Log in, get JWT |
| GET | `/captains/profile` | Yes (captain) | Get the current captain's profile |
| GET | `/captains/logout` | Yes (captain) | Log out |

### Maps Routes (`/maps`)
| Method | Path | Auth required? | Purpose |
|--------|------|----------------|---------|
| GET | `/maps/get-coordinates` | Yes (user) | Convert an address to lat/lng |
| GET | `/maps/get-distance-time` | Yes (user) | Get travel distance & time between two addresses |
| GET | `/maps/get-suggestions` | Yes (user) | Get autocomplete address suggestions for typing |

### Ride Routes (`/rides`)
| Method | Path | Auth required? | Purpose |
|--------|------|----------------|---------|
| POST | `/rides/create` | Yes (user) | Create a new ride request (sends 'new-ride' event to nearby captains) |
| GET | `/rides/get-fare` | Yes (user) | Get estimated fare for different vehicle types |
| POST | `/rides/confirm` | Yes (captain) | Captain accepts a ride request (sends 'ride-confirmed') |
| GET | `/rides/start-ride` | Yes (captain) | Start the ride after verifying OTP (sends 'ride-started') |
| POST | `/rides/end-ride` | Yes (captain) | Mark the ride as complete (sends 'ride-ended') |

---

## 6. How Socket.IO Is Used & The Real-Time Flow

Socket.IO is the "messenger" of this app — it makes sure captains and users see ride updates instantly, without either person having to refresh the page.

### How it works:
1. **Setup** — In `socket.js`, the server creates a Socket.IO instance attached to the HTTP server. It allows connections from any origin (`origin: '*'`).

2. **Joining** — When the frontend loads (user or captain home page), it emits a `join` event with `{ userId, userType }`. The server saves that `socket.id` in the database (in the `socketId` field of the user/captain record).

3. **Live Location** — Captains periodically send an `update-location-captain` event with their GPS coordinates. The server saves these coordinates in the Captain document.

4. **Sending Events to a Specific Person** — The helper function `sendMessageToSocketId(socketId, messageObject)` sends a message to one specific connected socket. It is used by ride controllers to push updates.

### Real-time event flow:

```
┌──────┐                          ┌────────┐
│ User │  clicks "Confirm Ride"   │ Backend │
└──────┘ — POST /rides/create —>  └────────┘
                                          │
                                          │ saves ride to DB
                                          │ gets nearby captains
                                          │
                                          ▼
                                  ┌────────────────┐
                                  │ Socket.IO emits │
                                  │ "new-ride" to   │
                                  │ each captain's  │
                                  │ socket          │
                                  └────────────────┘
                                          │
                                          ▼
                                ┌─────────────┐
                                │  Captain    │
                                │  (gets push  │
                                │  notification│
                                └─────────────┘
```

**After a captain accepts:**
- Backend sends `"ride-confirmed"` to the user's socket → user sees the captain's details.
- After OTP is verified and ride starts → Backend sends `"ride-started"` → user is navigated to the Riding screen.
- When ride ends → Backend sends `"ride-ended"` → user is navigated back to the home screen.

---

## 7. How Authentication Works

The app uses three layers to keep things secure:

### a) `bcrypt` — Password Hashing
- When a user or captain registers, their plain-text password is passed through `bcrypt.hash(password, 10)`.
- The result (a "hash") is what gets stored in MongoDB — never the real password.
- On login, `bcrypt.compare(enteredPassword, storedHash)` checks if the password matches.
- A "salt round" of 10 means each password is salted and hashed 2^10 times — making brute-force attacks very slow.

### b) JWT (JSON Web Tokens) — Identity Verification
- On successful login/register, the server calls `user.generateAuthToken()` which does:
  ```js
  jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
  ```
  - `{ _id: userId }` is the **payload** (data inside the token).
  - `JWT_SECRET` is a secret string from `.env` used to "sign" (encrypt) the token.
  - `expiresIn: '24h'` means the token becomes invalid after 24 hours.
- The token is returned to the frontend and also set as an **HTTP-only cookie** via `res.cookie('token', token)`.

### c) `auth.middleware.js` — Protecting Routes
Every time a frontend request hits a "protected" route:
1. The middleware reads the token from either the cookie (`req.cookies.token`) OR the `Authorization: Bearer <token>` header.
2. It checks if the token is in the **blacklist** (logged-out tokens) — if yes, access is denied.
3. If not blacklisted, it uses `jwt.verify(token, JWT_SECRET)` to confirm the token is real and not expired.
4. If valid, it loads the user/captain from the database and attaches it to `req.user` or `req.captain`.
5. If anything fails → returns `401 Unauthorized`.

### Frontend usage
- After login, the frontend stores the JWT in `localStorage`.
- On each subsequent API call, it sends `Authorization: Bearer <token>` in the header.
- Protected routes (profile, rides, maps) will fail with 401 if there's no valid token.

---

## 8. Main Functions in Each File (Short Explanations)

### Backend

**app.js**
- `require(...)` — loads modules and middlewares and routes.

**server.js**
- Creates HTTP server, calls `initializeSocket`, starts listening.

**socket.js**
- `initializeSocket(server)` — configures Socket.IO and sets up event listeners for `join`, `update-location-captain`, and `disconnect`.
- `sendMessageToSocketId(socketId, messageObject)` — emits an event to one connected client.

**db.js**
- `connectToDb()` — connects to MongoDB via Mongoose.

**middlewares/auth.middleware.js**
- `authUser` — verifies JWT for regular users; protects user routes.
- `authCaptain` — verifies JWT for captains; protects captain routes.

**controllers/user.controller.js**
- `registerUser` — validates input, checks for duplicate email, hashes password, creates user, returns JWT.
- `loginUser` — validates input, finds user by email, compares password, sets cookie, returns JWT + user.
- `getUserProfile` — returns the authenticated user's data (set by middleware).
- `logoutUser` — clears cookie, blacklists token, returns success.

**controllers/captain.controller.js**
- `registerCaptain` — validates, hashes password, creates captain, returns JWT.
- `loginCaptain` — validates, finds captain, compares password, sets cookie, returns JWT + captain.
- `getCaptainProfile` — returns authenticated captain's data.
- `logoutCaptain` — clears cookie, blacklists token.

**controllers/map.controller.js**
- `getCoordinates` — takes an address query param, calls `mapService.getAddressCoordinate`, returns `{ ltd, lng }`.
- `getDistanceTime` — takes origin + destination, calls `getDistanceTime`, returns distance & duration.
- `getAutoCompleteSuggestions` — takes a search input, returns address suggestions.

**controllers/ride.controller.js**
- `createRide` — validates, calculates fare, creates ride in DB, finds nearby captains, sends each a `"new-ride"` socket event.
- `getFare` — calculates and returns fare estimates for all three vehicle types.
- `confirmRide` — updates ride status to 'accepted', assigns captain, sends `"ride-confirmed"` to user via socket.
- `startRide` — verifies OTP, updates status to 'ongoing', sends `"ride-started"` to user via socket.
- `endRide` — updates status to 'completed', sends `"ride-ended"` to user via socket.

**services/maps.service.js**
- `getAddressCoordinate(address)` — calls Google Geocoding API, returns `{ltd, lng}`.
- `getDistanceTime(origin, destination)` — calls Google Distance Matrix API, returns distance/duration.
- `getAutoCompleteSuggestions(input)` — calls Google Places Autocomplete API, returns list of strings.
- `getCaptainsInTheRadius(ltd, lng, radius)` — uses MongoDB geo query to find captains near a point.

**services/ride.service.js**
- `getFare(pickup, destination)` — fetches distance/time from maps service, calculates per-vehicle base fare.
- `createRide({user, pickup, destination, vehicleType})` — generates OTP, computes fare, creates ride document.
- `confirmRide({rideId, captain})` — sets status to 'accepted', assigns captain, returns populated ride.
- `startRide({rideId, otp, captain})` — checks OTP matches, sets status to 'ongoing'.
- `endRide({rideId, captain})` — confirms captain ownership, sets status to 'completed'.

### Frontend

**main.jsx** — mounts the React app with Context + Router providers.

**App.jsx** — defines `<Routes>`.

**SocketContext.jsx**
- `socket` — a `io()` connection instance. Emits `join` on connect, listens for `connect`/`disconnect` logs.

**UserContext.jsx / CapatainContext.jsx** — provide global state for user and captain objects.

**Start.jsx** — landing screen with a "Continue" button linking to `/login`.

**UserLogin.jsx / UserSignup.jsx** — forms that POST to `/users/login` or `/users/register`, store JWT in localStorage, then navigate to `/home`.

**UserProtectWrapper.jsx** — checks for token in localStorage, calls `/users/profile`, redirects to `/login` if no valid token.

**Home.jsx** — The main ride-booking screen:
- `findTrip()` — GETs fare estimate from `/rides/get-fare`, opens the vehicle panel.
- `createRide()` — POSTs to `/rides/create`, which triggers the captain notification.
- Has socket listeners: `ride-confirmed` → switches panel, `ride-started` → goes to `/riding`.
- Uses `gsap` for panel slide/up-down animations.

**Riding.jsx** — Shows the ride in progress (captain photo, fare, map). Listens for `ride-ended` → navigates back to `/home`.

**CaptainLogin.jsx / CaptainSignup.jsx** — same as user versions, but POST to `/captains/...` and navigate to `/captain-home`.

**CaptainProtectWrapper.jsx** — protects captain routes; redirects to `/captain-login` if no valid token.

**CaptainHome.jsx** — Captain's home screen:
- Emits `join` with captain type on socket connection.
- Sends live location updates every 10 seconds via socket.
- Listens for the `"new-ride"` socket event — pops up a ride request.
- `confirmRide()` — POSTs to `/rides/confirm`.

**CaptainRiding.jsx** — Captain's on-trip screen with a "Finish Ride" button.

**ConfirmRide.jsx** — Shows the pickup, destination, fare, and vehicle image. "Confirm" button calls `createRide()`.

**LookingForDriver.jsx** — Shows while waiting; displays fare and vehicle.

**WaitingForDriver.jsx** — Shows after a captain accepts — displays captain's name, plate, and **the OTP** the captain will use to start the ride.

**RidePopUp.jsx** — Captain sees this when a new ride request arrives. "Accept" calls `confirmRide()`, "Ignore" closes it.

**ConfirmRidePopUp.jsx** — Captain inputs the 6-digit OTP to start the ride. "Confirm" GETs `/rides/start-ride` with the OTP.

**FinishRide.jsx** — Captain presses "Finish Ride" → POST `/rides/end-ride` → navigate back to `/captain-home`.

**VehiclePanel.jsx** — Lists vehicle options (car/moto/auto). Each shows a fare and "Select" button.

**LocationSearchPanel.jsx** — Shows address suggestions fetched from `/maps/get-suggestions`; clicking one sets the pickup/destination.

**CaptainDetails.jsx** — Shows captain's name, earnings, hours online, total rides.

**LiveTracking.jsx** — A full-screen interactive map (Leaflet + OpenStreetMap) showing the user's current GPS location with a marker.

---

## 9. Overall App Flow (User Action → Frontend → Backend → Database)

### Scenario A: A user books a ride
```
1. USER ACTION:
   - User enters pickup + destination in Home.jsx
   - Clicks "Find Trip"

2. FRONTEND:
   - Home.jsx calls GET /rides/get-fare with pickup + destination
   - Receives fare estimates → opens VehiclePanel

3. FRONTEND:
   - User picks a vehicle (e.g. "car")
   - Clicks "Confirm" in ConfirmRide
   - Calls createRide() → POST /rides/create

4. BACKEND (ride.controller → ride.service):
   - Validates input
   - Calculates fare (calls Google Maps for distance/time)
   - Generates 6-digit OTP
   - Creates a Ride document in MongoDB (status: 'pending')
   - Finds nearby captains (within radius) using MongoDB geo-query
   - For each nearby captain → sends socket event "new-ride" with ride data

5. SOCKET.IO:
   - Each available captain's frontend receives "new-ride" event
   - RidePopUp appears on captain's screen

6. CAPTAIN ACTION (in separate flow):
   - Captain clicks "Accept"
   - Calls POST /rides/confirm
   - Backend sets ride status → 'accepted', assigns captain
   - Backend sends "ride-confirmed" socket event to USER's socket

7. FRONTEND (user):
   - Receives "ride-confirmed" → shows WaitingForDriver panel with captain details + OTP

8. CAPTAIN ACTION:
   - Captain enters OTP on their screen (ConfirmRidePopUp)
   - Calls GET /rides/start-ride with OTP
   - Backend verifies OTP, sets status → 'ongoing'
   - Backend sends "ride-started" socket event to USER's socket

9. FRONTEND (user):
   - Navigates to /riding screen (shows map + trip details)

10. CAPTAIN ACTION:
    - Captain presses "Finish Ride"
    - Calls POST /rides/end-ride
    - Backend sets status → 'completed'
    - Backend sends "ride-ended" event to user

11. FRONTEND (user):
    - Receives "ride-ended" → navigates back to /home
```

### Scenario B: A captain receives a ride request (brief)
```
- Captain opens CaptainHome.jsx
- Socket emits "join" → server saves captain's socketId
- Captain sends location every 10s via "update-location-captain"
- When a ride is created nearby → receives "new-ride" socket event
- Accepts → enters OTP → starts → finishes ride
- Each step sends a socket event back to the user
```

### Scenario C: Authentication (login / register)
```
1. User enters email + password in UserLogin.jsx
2. Calls POST /users/login
3. Backend:
   - Finds user by email, compares hashed password
   - Creates JWT token
   - Sets HTTP-only cookie + returns token in response
4. Frontend stores token in localStorage
5. Frontend navigates to /home (protected by UserProtectWrapper)
6. On next request → UserProtectWrapper sends Authorization header → backend middleware verifies JWT
```

---

## 10. How to Run the Project

### Prerequisites
- **Node.js** (v18 or newer recommended) installed on your computer
- An **MongoDB** database (local install or Atlas) — you need a connection string
- A **Google Maps API key** (for geocoding, distance matrix, and autocomplete)

### Step 1 — Clone / open the project folder
Navigate to the `Backend` folder and the `frontend` folder in two separate terminals.

### Step 2 — Install dependencies
```bash
# Terminal 1 — Backend
cd Backend
npm install

# Terminal 2 — Frontend
cd frontend
npm install
```

### Step 3 — Create the `.env` files
> ⚠️ Never commit these to Git. The `.gitignore` already excludes `.env`.

**In `Backend/.env`** (create this file — do NOT share its contents publicly):
```env
PORT=
DB_CONNECT=
JWT_SECRET=
GOOGLE_MAPS_API=
```

**In `frontend/.env`** (the frontend already has one — update the variable):
```env
VITE_BASE_URL=
```
> `VITE_BASE_URL` should be the backend's URL (e.g., `http://localhost:3000`).

### Step 4 — Run both servers
```bash
# Terminal 1 — Backend (API + Socket.IO)
cd Backend
node server.js
# (or: npm run dev if a dev script is added; the default is node server.js)

# Terminal 2 — Frontend (Vite dev server)
cd frontend
npm run dev
```

- The **backend** will start on `http://localhost:3000` (or whatever `PORT` you set).
- The **frontend** will start on `http://localhost:5173` (Vite's default) and proxy API calls to the backend via `VITE_BASE_URL`.

### Step 5 — Use the app
1. Open `http://localhost:5173` in your browser.
2. Sign up as a **user** (or a **captain**) — you'll get a JWT token stored locally.
3. As a **user**: go to `/home`, enter pickup + destination, find a trip, and confirm.
4. As a **captain**: open `/captain-home` in another tab, accept the ride, enter the OTP, start and finish.

> Tip: Use two different browsers (or incognito + normal) to simulate a user and a driver at the same time.
