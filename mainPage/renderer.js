const songElement = (song) => {
    return `
        <div class="col m-2 p-2">
            <div class="w-auto h-auto" onclick="playSong('${song}')">
                <a href="#" class="btn btn-lg btn-primary">${song}<img src="../icons/play.svg" alt="play" class="play-icon"></a>
            </div>
        </div>
    `
}

const renderSongs = async () => {
    const songs = await electronAPI.getFiles()

    // retirer les extensions
    songs.forEach((song, index) => {
        songs[index] = song.split('.')[0]
    })

    const songsContainer = document.getElementById('songsContainer')
    songsContainer.innerHTML = songs.map(songElement).join('')

    if (songs.length == 0) {
        songsContainer.innerHTML = `
            <div class="col m-2 p-2">
                <div class="w-auto h-auto">
                    <a href="#" class="btn btn-lg btn-primary">No song found</a>
                </div>
            </div>
        `
    }
}

renderSongs()