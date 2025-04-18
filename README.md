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
npm install express music-metadata node-fetch fs-extra
```

---

### 3. Start the server

```bash
node server.js
```

You should see something like:

```
Server running at http://localhost:3000
Music library scanned and songs.json updated.
Music server running at http://localhost:3000
```

---

### 5. Open your browser

Go to:

```
http://localhost:3000
```

You should see your music player interface.

---
