//declare
const playist = document.querySelector('.playlist');
const header = document.querySelector('header h2');
const cdThumb = document.querySelector('.cd');
const audio = document.querySelector('#audio');
const cd = document.querySelector('.cd');
const playBtn = document.querySelector('.icon-play');
const pauseBtn = document.querySelector('.icon-pause');
const togglePlayBtn = document.querySelector('.btn-toggle-play');
const progress = document.querySelector('.progress');
const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');
const repeatBtn = document.querySelector('.fa-redo');
const randomBtn = document.querySelector('.fa-random');
const song = document.querySelector('.song');
const volume = document.querySelector('.volume');
const azBtn = document.querySelector('.az');
const zaBtn = document.querySelector('.za');
const searchSong = document.querySelector('.searchSong');
const go = document.querySelector('.go');

//define app
const app = {

    currentIndex: 0,
    isRepeat: false,
    isRamdom: false,
    playing: false,

    songs: [{
            "name": "Sing me to sleep",
            "author": "Alan Walker",
            "url": "https://cdn.discordapp.com/attachments/775740994595323954/775741533789224960/Alan_Walker_-_Sing_Me_To_SleepMP3_160K.mp3",
            "id": 0,
            "links": {
                "images": [{
                        "url": "https://i.scdn.co/image/ab6761610000e5ebc02d416c309a68b04dc94576"
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273a108e07c661f9fc54de9c43a"
                    }
                ]
            }
        },
        {
            "name": "Fade-NCS Release",
            "author": "Alan Walker",
            "url": "https://cdn.discordapp.com/attachments/775740994595323954/775741536591806484/Alan_Walker_-_Fade_NCS_ReleaseMP3_160K.mp3",
            "id": 1,
            "links": {
                "images": [{
                        "url": "https://i.scdn.co/image/ab6761610000e5ebc02d416c309a68b04dc94576"
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273a108e07c661f9fc54de9c43a"
                    }
                ]
            }
        },
        {
            "name": "She-NCS Release",
            "author": "Andromedik",
            "url": "https://cdn.discordapp.com/attachments/775740994595323954/775741544149549096/Andromedik_-_SHE_NCS_ReleaseMP3_160K.mp3",
            "id": 2,
            "links": {
                "images": [{
                        "url": "https://i.scdn.co/image/ab6761610000e5eb37db62ee361f796bef5b49a6"
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b2737b8d8ca1a8e14506c8f35233"
                    }
                ]
            }
        },
        {
            "name": "About you-NCS Release",
            "author": "Ascence",
            "url": "https://cdn.discordapp.com/attachments/775740994595323954/775741547203002389/Ascence_-_About_You_NCS_ReleaseMP3_160K.mp3",
            "id": 3,
            "links": {
                "images": [{
                        "url": "https://i.scdn.co/image/ab6761610000e5eb6e50f29c671af8aff68b321d"
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b27335ca35166aba974dd2dd29a2"
                    }
                ]
            }
        },
        {
            "name": "On & On (feat. Daniel Levi) [NCS Release]",
            "author": "Cartoon",
            "url": "https://cdn.discordapp.com/attachments/775740994595323954/775741549177995264/Cartoon_-_On___On_feat._Daniel_Levi_NCS_ReleaseMP3_160K.mp3",
            "id": 4,
            "links": {
                "images": [{
                        "url": "https://i.scdn.co/image/ab6761610000e5eb65d82d90b55b4dd3cbb2efd2"
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273d2aaf635815c265aa1ecdecc"
                    }
                ]
            }
        },
        {
            "name": "Castle [NCS Release]",
            "author": "Clarx & Harddope",
            "url": "https://cdn.discordapp.com/attachments/775740994595323954/775741580619284540/Clarx___Harddope_-_Castle_NCS_ReleaseMP3_160K.mp3",
            "id": 5,
            "links": {
                "images": [{
                        "url": "https://i.scdn.co/image/ab6761610000e5eb015af0621865cd5cd5046c2c"
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96"
                    }
                ]
            }
        },
    ],

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === app.currentIndex ? 'activeSong' : ''} " >
    
                    <div class="thumb" style="background-image: url('${song.links.images[0].url}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.author}</p>
                    </div>

                </div>
            `
        });

        playist.innerHTML = htmls.join('\n');

    },

    render2: function(newSongs) {

        // console.log(newSongs);

        // newSongs.map(song => {
        //     const songIndex = app.songs.map(song => song.name).indexOf(song.name);
        //     return { song, songIndex };
        // })

        // console.log(newSongs);

        const htmls = newSongs.map((song) => {
            return `
                <div class="song 
                ${app.songs.indexOf(song) === app.currentIndex ? 'active' : ''
                }" >
                    <div class="thumb" style="background-image: url('${song.links.images[0].url}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.author}</p>
                    </div>

                </div>
            `
        });

        playist.innerHTML = htmls.join('\n');
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvents: function() {

        //toggle event
        playBtn.onclick = function() {
            if (app.playing === false) {
                app.playing = true;
                playBtn.className = 'fas fa-pause icon-pause';
                app.rotateImg();
                audio.play();
            } else {
                app.playing = false;
                playBtn.className = 'fas fa-play icon-play';
                app.pauseImg();
                audio.pause();
            }
            audio.volume = 0.2;
        }

        //ontimeupdate event
        audio.ontimeupdate = function() {
            if (audio.duration) {
                let progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }

        }

        //seek event(tua)
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }

        //next song
        nextBtn.onclick = function() {
            if (app.isRamdom === true) {
                app.playRandomSong();
                app.render();

            } else {
                app.currentIndex++;
                if (app.currentIndex >= app.songs.length) {
                    app.currentIndex = 0;
                }
                app.loadCurrentSong();

                if (app.playing === false) {
                    playBtn.click();
                }
                audio.play();
                app.render();
            }

            app.goToCurrentSong();

        }

        //pre Song
        prevBtn.onclick = function() {
            if (app.isRamdom === true) {
                app.playRandomSong();
                app.render();
            } else {
                app.currentIndex--;
                if (app.currentIndex < 0) {
                    app.currentIndex = app.songs.length - 1;
                }
                app.loadCurrentSong();
                if (app.playing === false) {
                    playBtn.click();
                }
                audio.play();
                app.render();
            }
            app.goToCurrentSong();
        }

        //repeat event
        repeatBtn.onclick = function() {

            app.isRepeat = !app.isRepeat;
            if (app.isRamdom === true) {
                app.isRamdom = false;
            }
            repeatBtn.classList.toggle('active', app.isRepeat);
            randomBtn.classList.remove('active');
            if (app.isRepeat === true) {
                audio.loop = app.isRepeat;
            } else {
                audio.loop = false;
            }
        }

        //random event
        randomBtn.onclick = function() {
            app.isRamdom = !app.isRamdom;
            if (app.isRepeat === true) {
                app.isRepeat = false;
            }
            app.checkRR();

            randomBtn.classList.toggle('active', app.isRamdom);
            repeatBtn.classList.remove('active');
            // app.goToCurrentSong();
        }

        //end song event
        audio.onended = function() {
            nextBtn.click();
        }

        //change volume event
        volume.onchange = function(e) {
            audio.volume = e.target.value;
        }

        //search song event 
        searchSong.oninput = function(e) {
            console.log(e.target.value);
            console.log(e.target.value);
            let newSongs = app.songs.filter(song => song.name.toLowerCase().includes(e.target.value));
            app.render2(newSongs);
        }

        //az event
        azBtn.onclick = function() {
            app.songs.sort(function(a, b) {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
            })

            app.render();
        }

        //za event
        zaBtn.onclick = function() {
            app.songs.sort(function(a, b) {
                if (a.name < b.name) { return 1; }
                if (a.name > b.name) { return -1; }
                return 0;
            })

            app.render();
        }


        //click song event
        playist.onclick = function(e) {
            app.playing = true;
            const pickedSong = e.target.closest('.song');
            if (pickedSong) {
                const songName = pickedSong.querySelector('.title').innerText;
                const id = app.songs.map(song => song.name).indexOf(songName);
                app.currentIndex = id;
                app.loadCurrentSong();
                audio.play();
                app.render();
                app.goToCurrentSong();
                app.rotateImg();
                playBtn.className = 'fas fa-pause icon-pause';

            }

        }

    },
    loadCurrentSong: function() {
        header.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.links.images[0].url}')`;
        audio.src = this.currentSong.url;
    },
    playRandomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * app.songs.length);
        } while (newIndex === app.currentIndex);

        app.currentIndex = newIndex;
        this.loadCurrentSong();
        if (app.playing === false) {
            playBtn.click();
        }
        audio.play();
    }

    ,
    rotateImg: function() {
        // cd.style.animation = "rotate 10s infinite linear";
        cd.style.animationName = 'rotate';
        cd.style.animationDuration = '10s';
        cd.style.animationIterationCount = 'infinite';
        cd.style.animationTimingFunction = 'linear';
    },
    pauseImg: function() {
        cd.style.animation = 'back 0.3s linear';
    }

    ,
    checkRR: function() {
        if (app.isRamdom === true) {
            audio.loop = false;
        }

    },
    goToCurrentSong: function() {
        document.querySelector('.activeSong').scrollIntoView();
    },
    start: function() {
        this.defineProperties();
        this.handleEvents();
        this.loadCurrentSong(); //render a song when starting app
        this.render();
    }

}

//main............................................................
app.start();



///nhac hay code gioi--------