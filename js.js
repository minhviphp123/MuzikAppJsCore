const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

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

const app = {

    currentIndex: 0,

    isRepeat: false,
    isRamdom: false,
    playing: false,

    songs: [
        {
            "name": "Sing me to sleep",
            "author": "Alan Walker",
            "url": "https://cdn.discordapp.com/attachments/775740994595323954/775741533789224960/Alan_Walker_-_Sing_Me_To_SleepMP3_160K.mp3",
            "id": 0,
            "links": {
                "images": [
                    {
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
                "images": [
                    {
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
                "images": [
                    {
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
                "images": [
                    {
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
                "images": [
                    {
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
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5eb015af0621865cd5cd5046c2c"
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96"
                    }
                ]
            }
        },
    ],
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === app.currentIndex ? 'active' : ''}" onClick="app.clickSong(${index})">
                    <h3>${index}</h3>
                    <div class="thumb" style="background-image: url('${song.links.images[0].url}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.author}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        });

        playist.innerHTML = htmls.join('\n');

    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    }
    ,
    handleEvents: function () {
        const cdWidth = cd.offsetWidth;

        const cdAnimate = cd.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,//10s
            iteration: Infinity
        })

        cdAnimate.pause();

        //toggle event

        playBtn.onclick = function () {
            if (app.playing === false) {
                app.playing = true;
                playBtn.className = 'fas fa-pause icon-pause';
                cdAnimate.play();
                audio.play();
            } else {
                app.playing = false;
                playBtn.className = 'fas fa-play icon-play';
                cdAnimate.pause();
                audio.pause();
            }
            audio.volume = 0.2;
        }

        //ontimeupdate event
        audio.ontimeupdate = function () {
            if (audio.duration) {
                let progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }

        }

        //seek event(tua)
        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }

        //next song
        nextBtn.onclick = function () {
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

            console.log(app.currentIndex);
        }

        //pre Song
        prevBtn.onclick = function () {
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
        }
        //repeat
        repeatBtn.onclick = function () {

            app.isRepeat = !app.isRepeat;
            if (app.isRamdom === true) {
                app.isRamdom = false;
            }
            repeatBtn.classList.toggle('active', app.isRepeat);
            randomBtn.classList.remove('active');
            cdAnimate.play();
            if (app.isRepeat === true) {
                audio.loop = app.isRepeat;
            } else {
                audio.loop = app.isRepeat;
            }
        }

        //random 
        randomBtn.onclick = function () {
            app.isRamdom = !app.isRamdom;
            if (app.isRepeat === true) {
                app.isRepeat = false;
            }
            randomBtn.classList.toggle('active', app.isRamdom);
            repeatBtn.classList.remove('active');
        }

        //end song event
        audio.onended = function () {
            nextBtn.click();
        }

        //change volume
        // progress.onchange = function (e) {
        //     const seekTime = audio.duration / 100 * e.target.value;
        //     audio.currentTime = seekTime;
        // }

        volume.onchange = function (e) {
            audio.volume = e.target.value;
        }

    }
    ,
    loadCurrentSong: function () {
        header.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.links.images[0].url}')`;
        audio.src = this.currentSong.url;
    }
    ,
    playRandomSong: function () {
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
    clickSong: function (index) {
        if (index !== this.currentIndex) {
            app.currentIndex = index;
            app.loadCurrentSong();

            if (app.playing === false) {
                playBtn.click();
            }
            audio.play();
            app.render();
        }
    },
    start: function () {
        this.defineProperties();
        this.handleEvents();
        this.loadCurrentSong();//render a song when starting app
        this.render();
    }

}

//main............................................................
app.start();






