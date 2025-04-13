## Simple Music Server

### Prerequisites
Make sure you have these installed on your system:

- **Node.js** (v16 or higher)
- **npm** (Node package manager)
- Your project folder contains:
  - `server.js`
  - `initial.js`
  - `songs.json`
  - `/public` folder with:
    - `index.html`
    - `script.js`
    - `styles.css`
    - `music-lib/` (your `.mp3` files)
    - `cover-art-cache/` (optional, for cached images)

---

## Local Deployment Steps

### 1. Navigate to your project folder

```bash
cd path/to/your/music-server
```

---

### 2. Install dependencies

Install all required packages:

```bash
npm install express music-metadata
```

If you're using anything else (like `fs-extra`, `node-fetch`, etc.), install those too:

```bash
npm install fs-extra node-fetch
```

---

### 3. Run the initial metadata script

This will scan your `music-lib/` folder and generate or update `songs.json`.

```bash
node initial.js
```

You can skip this if `initial.js` already runs inside `server.js` at startup.

---

### 4. Start the server

```bash
node server.js
```

You should see something like:

```
Server running at http://localhost:3000
```

---

### 5. Open your browser

Go to:

```
http://localhost:3000
```

You should see your music player interface.

---
