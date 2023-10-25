const songElement = (song) => {
    return `
        <div class="col m-2 p-2">
            <button class="song btn btn-secondary w-auto h-auto" onclick="playSong('${song}')">
                <span class="ml-1 vh-10 vw-10">${song}</span>
                <img src="./icons/play.svg" alt="play" class="ml-1" width="20" height="20">
            </button>
        </div>
    `
}