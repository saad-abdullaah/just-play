const songs = [
  {
    title: "blue",
    artist: "yung.kai",
    cover: "assests/images.png",
    src: "assest song/yung_kai_-_yung_kai_-_blue_Official_Music_Video_(mp3.pm).mp3"
  },
 {
    title: "The NeighbourHood",
    artist: "Messis",
    cover: "assests/images1.png",
    src: "assest song/The_Neighbourhood_-_Sweater_Weather_(mp3.pm).mp3"
  },
  {
    title: "blue",
    artist: "yung.kai",
    cover: "assest song/images.png",
    src: "assest song/yung_kai_-_yung_kai_-_blue_Official_Music_Video_(mp3.pm).mp3"
  },
  {
    title: "Far From Any Roads",
    artist: "The Handsome Family",
    cover: "assest song/images4.png",
    src: "assest song/far_from_any_road.mp3"
  },
];

let songIndex = 0;
let queue = [];
let playlists = JSON.parse(localStorage.getItem("myPlaylists")) || [];
let progress = document.getElementById("progress");
let song = document.getElementById("songs");
let ctrlID = document.getElementById("ctrlID");
let songImg = document.getElementById("songImg");
let songTitle = document.getElementById("songTitle");
let songArtist = document.getElementById("songArtist");
let playlistEl = document.getElementById("playlist");
let queuePanel = document.getElementById("queuePanel");
let queueListEl = document.getElementById("queueList");
let playlistsPanel = document.getElementById("playlistsPanel");
let playlistsListEl = document.getElementById("playlistsList");
let currentTimeEl = document.getElementById("currentTime");
let durationTimeEl = document.getElementById("durationTime");
function loadSong(songOrIndex){
  let s;
  if (typeof songOrIndex === "number"){
    s = songs[songOrIndex];
    songIndex = songOrIndex;
  } else {
    s = songOrIndex;
    const idx = songs.findIndex(x => x.src === s.src);
    if (idx !== -1) songIndex = idx;
  }
  song.src = s.src;
  songImg.src = s.cover;
  songTitle.textContent = s.title;
  songArtist.textContent = s.artist;
  progress.value = 0;
  currentTimeEl.textContent = "0:00";
  durationTimeEl.textContent = "0:00";
  highlightActive();
}
function highlightActive(){
  document.querySelectorAll(".playlist li").forEach((li, i) => {
    li.classList.toggle("active", i === songIndex);
  });
}
function playSong(){
  song.play();
}

function pauseSong(){
  song.pause();
}
function playPause(){
  if(song.paused){
    playSong();
  } else {
    pauseSong();
  }
}
song.addEventListener("play", () => {
  ctrlID.classList.remove("fa-play");
  ctrlID.classList.add("fa-pause");
});
song.addEventListener("pause", () => {
  ctrlID.classList.remove("fa-pause");
  ctrlID.classList.add("fa-play");
});

function nextSong(){
  const nextIndex = (songIndex + 1) % songs.length; 
  loadSong(nextIndex);
  playSong();
}
function prevSong(){
  const prevIndex = (songIndex - 1 + songs.length) % songs.length; 
  loadSong(prevIndex);
  playSong();
}
function renderPlaylist(){
  playlistEl.innerHTML = "";
  songs.forEach((s, i) => {
    const li = document.createElement("li");

    const label = document.createElement("span");
    label.textContent = `${s.title} — ${s.artist}`;
    label.onclick = () => {
      loadSong(i);
      playSong();
    };

    const actions = document.createElement("div");
    actions.className = "song-actions";

    const addBtn = document.createElement("button");
    addBtn.textContent = "+";
    addBtn.className = "addBtn";
    addBtn.title = "Add to queue";
    addBtn.onclick = (e) => {
      e.stopPropagation();
      addToQueue(i);
    };

    const dropWrap = document.createElement("div");
    dropWrap.className = "dropdown-wrap";

    const dropBtn = document.createElement("button");
    dropBtn.className = "dropdownBtn";
    dropBtn.title = "Add to playlist";
    dropBtn.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
    dropBtn.onclick = (e) => togglePlaylistMenu(e, i);

    const dropMenu = document.createElement("div");
    dropMenu.className = "playlist-dropdown hidden";
    dropMenu.id = `dropdown-${i}`;

    dropWrap.appendChild(dropBtn);
    dropWrap.appendChild(dropMenu);

    actions.appendChild(addBtn);
    actions.appendChild(dropWrap);

    li.appendChild(label);
    li.appendChild(actions);
    playlistEl.appendChild(li);
  });
}
function togglePlaylistMenu(e, songIdx){
  e.stopPropagation();
  const dropdown = document.getElementById(`dropdown-${songIdx}`);
  const wasHidden = dropdown.classList.contains("hidden");

  document.querySelectorAll(".playlist-dropdown").forEach(d => d.classList.add("hidden"));

  if(wasHidden){
    renderDropdownMenu(dropdown, songIdx);
    dropdown.classList.remove("hidden");
  }
}

document.addEventListener("click", (e) => {
  if(!e.target.closest(".dropdown-wrap")){
    document.querySelectorAll(".playlist-dropdown").forEach(d => d.classList.add("hidden"));
  }
});

function renderDropdownMenu(container, songIdx){
  container.innerHTML = "";

  if(playlists.length === 0){
    const empty = document.createElement("p");
    empty.className = "dropdown-empty";
    empty.textContent = "No playlists yet";
    container.appendChild(empty);
  } else {
    playlists.forEach(pl => {
      const item = document.createElement("div");
      item.className = "dropdown-item";
      const alreadyIn = pl.songs.some(x => x.src === songs[songIdx].src);
      item.textContent = alreadyIn ? `✓ ${pl.name}` : pl.name;
      item.onclick = () => {
        addSongToPlaylist(pl.id, songIdx);
        container.classList.add("hidden");
      };
      container.appendChild(item);
    });
    const divider = document.createElement("div");
    divider.className = "dropdown-divider";
    container.appendChild(divider);
  }

  const newItem = document.createElement("div");
  newItem.className = "dropdown-item new-playlist";
  newItem.innerHTML = `<i class="fa-solid fa-plus"></i> New Playlist`;
  newItem.onclick = () => {
    const name = prompt("Playlist name:");
    if(name && name.trim()){
      const pl = createPlaylist(name.trim());
      addSongToPlaylist(pl.id, songIdx);
    }
    container.classList.add("hidden");
  };
  container.appendChild(newItem);
}

function createPlaylist(name){
  const pl = { id: Date.now() + Math.random(), name, songs: [] };
  playlists.push(pl);
  savePlaylists();
  renderPlaylistsPanel();
  return pl;
}

function addSongToPlaylist(playlistId, songIdx){
  const pl = playlists.find(p => p.id === playlistId);
  if(!pl) return;
  const s = songs[songIdx];
  const alreadyIn = pl.songs.some(x => x.src === s.src);
  if(alreadyIn) return;
  pl.songs.push({ ...s });
  savePlaylists();
  renderPlaylistsPanel();
}

function removeSongFromPlaylist(playlistId, songSrc){
  const pl = playlists.find(p => p.id === playlistId);
  if(!pl) return;
  pl.songs = pl.songs.filter(s => s.src !== songSrc);
  savePlaylists();
  renderPlaylistsPanel();
}

function deletePlaylist(playlistId){
  playlists = playlists.filter(p => p.id !== playlistId);
  savePlaylists();
  renderPlaylistsPanel();
}

function savePlaylists(){
  localStorage.setItem("myPlaylists", JSON.stringify(playlists));
}

function togglePlaylistsPanel(){
  playlistsPanel.classList.toggle("hidden");
  if(!playlistsPanel.classList.contains("hidden")) renderPlaylistsPanel();
}

function renderPlaylistsPanel(){
  playlistsListEl.innerHTML = "";

  if(playlists.length === 0){
    const li = document.createElement("li");
    li.className = "empty-msg";
    li.textContent = "No playlists yet — So ga and create one";
    playlistsListEl.appendChild(li);
    return;
  }

  playlists.forEach(pl => {
    const li = document.createElement("li");
    li.className = "playlist-group";

    const header = document.createElement("div");
    header.className = "playlist-header";

    const name = document.createElement("span");
    name.textContent = `${pl.name} (${pl.songs.length})`;
    name.onclick = () => li.classList.toggle("expanded");

    const delBtn = document.createElement("button");
    delBtn.className = "removeBtn";
    delBtn.textContent = "✕";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      if(confirm(`Delete playlist "${pl.name}"?`)) deletePlaylist(pl.id);
    };

    header.appendChild(name);
    header.appendChild(delBtn);
    li.appendChild(header);

    const songList = document.createElement("ul");
    songList.className = "playlist-songs";
    pl.songs.forEach(s => {
      const songLi = document.createElement("li");

      const songLabel = document.createElement("span");
      songLabel.textContent = `${s.title} — ${s.artist}`;
      songLabel.onclick = () => {
        loadSong(s);
        playSong();
      };

      const rmBtn = document.createElement("button");
      rmBtn.className = "removeBtn";
      rmBtn.textContent = "✕";
      rmBtn.onclick = (e) => {
        e.stopPropagation();
        removeSongFromPlaylist(pl.id, s.src);
      };

      songLi.appendChild(songLabel);
      songLi.appendChild(rmBtn);
      songList.appendChild(songLi);
    });
    li.appendChild(songList);

    playlistsListEl.appendChild(li);
  });
}

function toggleQueuePanel(){
  queuePanel.classList.toggle("hidden");
}
function addToQueue(index){
  const newSong = songs[index];
  const alreadyQueued = queue.some(s => s.src === newSong.src);
  if(alreadyQueued){
    return; 
  }
  queue.push({ ...newSong });
  renderQueue();
}
function removeFromQueue(index){
  queue.splice(index, 1);
  renderQueue();
}
function renderQueue(){
  queueListEl.innerHTML = "";
  queue.forEach((s, i) => {
    const li = document.createElement("li");

    const label = document.createElement("span");
    label.textContent = `${s.title} — ${s.artist}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.className = "removeBtn";
    removeBtn.onclick = () => removeFromQueue(i);

    li.appendChild(label);
    li.appendChild(removeBtn);
    queueListEl.appendChild(li);
  });
}
function formatTime(seconds){
  if(isNaN(seconds) || seconds === Infinity) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, "0")}`;
}
song.onloadedmetadata = function(){
  progress.max = song.duration;
  durationTimeEl.textContent = formatTime(song.duration);
};
song.addEventListener("ended", nextSong);

song.addEventListener("timeupdate", () => {
  progress.value = song.currentTime;
  currentTimeEl.textContent = formatTime(song.currentTime);
});
progress.onchange = function(){
  song.currentTime = progress.value;
  playSong();
};
renderPlaylist();
loadSong(0);
