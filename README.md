<div align="center">

# 🎵 Just-Play
### A Modern JavaScript Music Player

A lightweight yet feature-rich music player built entirely with **HTML, CSS, and Vanilla JavaScript**.

Designed to demonstrate DOM manipulation, JavaScript application architecture, LocalStorage, dynamic rendering, and interactive UI development without relying on external frameworks.

---

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-Markup-orange?style=for-the-badge&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-Styling-blue?style=for-the-badge&logo=css3)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

# 📖 About The Project

**Just-Play** is a fully interactive music player built from scratch using **Vanilla JavaScript**.

Unlike a basic audio player, this project demonstrates how JavaScript can be used to build a complete music application by dynamically rendering songs, handling playback, managing queues, creating playlists, updating the UI in real time, and persisting user data using LocalStorage.

The primary goal of this project was to strengthen core JavaScript concepts including:

- DOM Manipulation
- Event Handling
- Dynamic Rendering
- Arrays & Objects
- Local Storage
- Audio API
- State Management
- Component-like UI Structure

---

# ✨ Features

## 🎧 Music Playback

- Play songs
- Pause songs
- Previous track
- Next track
- Dynamic song switching
- Album artwork updates
- Artist information
- Song title updates

---

## ⏱ Progress Control

- Interactive progress slider
- Real-time playback tracking
- Current playback time
- Total song duration
- Seek to any point in a song

---

## 📃 Dynamic Playlist

Songs are generated dynamically from a JavaScript array instead of hardcoded HTML.

Each song displays:

- Title
- Artist
- Queue button
- Playlist options

---

## 📂 Custom Playlists

Users can:

- Create unlimited playlists
- Add songs into playlists
- Remove songs
- Delete playlists
- Expand/Collapse playlists
- Play songs directly from playlists

---

## 💾 Persistent Storage

Playlists are automatically saved using:

```
LocalStorage
```

This means user-created playlists remain available even after refreshing the browser.

---

## 🎵 Queue System

The player includes a custom queue system.

Features:

- Add songs to queue
- Prevent duplicate queue entries
- Remove queued songs
- Dedicated Queue Panel

---

## 🎨 Modern User Interface

- Responsive card layout
- Album artwork
- Animated controls
- Custom scrollbar
- Dropdown playlist menu
- Interactive buttons
- Clean typography
- Minimal design

---

# 🛠 Built With

- HTML5
- CSS3
- Vanilla JavaScript (ES6)
- HTML Audio API
- LocalStorage API
- Font Awesome Icons

---

# 📁 Project Structure

```
Just-Play/
│
├── player.html
├── player.css
├── player.js
│
├── assets/
│   ├── songs/
│   ├── images/
│
└── README.md
```

---

# ⚙ How It Works

## 1. Song Database

Songs are stored inside an array of JavaScript objects.

Each object contains:

- Title
- Artist
- Cover Image
- Audio Source

---

## 2. Dynamic Rendering

JavaScript loops through the song collection and generates the playlist automatically.

This makes adding new songs extremely easy.

---

## 3. Audio Controller

The HTML Audio element is controlled completely through JavaScript.

The application handles:

- Play
- Pause
- Previous
- Next
- Song Loading
- Time Updates
- Metadata Loading

---

## 4. Queue Management

Songs can be temporarily added into a queue.

The application checks for duplicate entries before inserting a song.

---

## 5. Playlist Management

Users can:

- Create playlists
- Save playlists
- Add songs
- Remove songs
- Delete playlists

All playlist information is stored inside LocalStorage.

---

# 🧠 JavaScript Concepts Used

- Arrays
- Objects
- Functions
- Arrow Functions
- DOM Manipulation
- Event Listeners
- Audio API
- LocalStorage
- Conditional Rendering
- Dynamic Elements
- Template Literals
- Array Methods
- Object Spread Operator
- State Management
- UI Updates

---

# 🚀 Future Improvements

Some planned features include:

- Shuffle Mode
- Repeat Mode
- Volume Slider
- Keyboard Shortcuts
- Drag & Drop Queue
- Search Songs
- Upload Local Music
- Dark Mode
- Favorites
- Recently Played
- Lyrics Support
- Mobile Optimizations
- Audio Visualizer
- IndexedDB Storage
- API Integration (Spotify/Jamendo/Deezer)

---

# 📸 Screenshots

> Add screenshots here

```
/screenshots/home.png
/screenshots/playlist.png
/screenshots/queue.png
```

---

# 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/yourusername/just-play.git
```

Open the project

```bash
cd just-play
```

Run

Simply open

```
player.html
```

inside your browser.

No installation required.

No dependencies required.

---

# 💡 Learning Outcomes

This project helped me gain practical experience with:

- Building applications using Vanilla JavaScript
- Managing application state
- Working with browser storage
- Rendering dynamic UI components
- Handling audio playback
- Writing modular JavaScript
- Creating reusable UI logic

---

# 🤝 Contributing

Contributions are welcome!

If you have ideas for improvements:

1. Fork the repository
2. Create a feature branch

```
git checkout -b feature/NewFeature
```

3. Commit your changes

```
git commit -m "Added New Feature"
```

4. Push

```
git push origin feature/NewFeature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

## Muhammad Saad Abdullah

Computer Science Student

Frontend Developer

JavaScript Enthusiast

Passionate about building interactive web applications and continuously improving through hands-on projects.

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

It motivates me to continue building and sharing open-source projects.

---

<div align="center">

### Made with ❤️ using HTML, CSS & Vanilla JavaScript

</div>
