const Previous=document.querySelectorAll(".PreviousSong"),Play=document.querySelectorAll(".PlaySong"),Pause=document.querySelectorAll(".PauseSong"),Next=document.querySelectorAll(".NextSong"),Loading=document.querySelectorAll(".Loading"),Progress=document.querySelectorAll(".Progress"),ClosePlayer=document.querySelectorAll(".ClosePlayer"),Player=document.querySelector(".Player"),Content=document.querySelector(".Content"),ShareNapster=document.querySelector(".ShareNapster"),Loader=document.querySelector(".loader"),SongLoader=document.querySelectorAll(".songLoader"),LoadPlaylist=document.querySelector(".LoadPlaylist"),AllSongs=document.querySelector(".AllSongs"),url=new URLSearchParams(window.location.search),SongsFragment=document.createDocumentFragment(),Share=document.querySelector(".Share"),Transfer=document.querySelector(".Transfer");let FocusSong,touchStartX,PlaylistUrl,MusicAudio,CurrentCover=document.querySelectorAll(".CurrentCover"),CurrentSongTitle=document.querySelector(".CurrentSongTitle"),CurrentSongTitle2=document.querySelector(".CurrentSongTitle2"),CurrentArtist=document.querySelectorAll(".CurrentArtist"),FetchSongs=[],SongPlaying=parseInt(localStorage.getItem("song"))||parseInt(url.get("song"))||0;function GetPlaylist(){PlaylistUrl=url.get("playlist")?`https://music-info-api.vercel.app/?url=${url.get("playlist")}`:"https://music-info-api.vercel.app/?url=https://youtube.com/playlist?list=PLeVdHaf0Nk496_cnHO1uG2QdywPhpWwOS&feature=shared",FetchPlaylist()}function FetchPlaylist(){fetch(PlaylistUrl).then((async e=>{if(!e.ok)throw new Error(await e.text());return e.json()})).then((e=>{FetchSongs=e})).then((()=>{DisplayPlaylist()})).catch((e=>{console.log(e.message)}))}function DisplayPlaylist(){for(let e=0;e<FetchSongs.length;e++){const t=FetchSongs[e],n=document.createElement("div");n.classList.add("flex","cursor-pointer","song","mb-1","border","justify-between","items-center","border-none","hover:bg-zinc-900","p-3");const o=document.createElement("div");o.classList.add("flex","gap-2","items-center");const r=document.createElement("span");r.classList.add("loader","flex","overflow-hidden","h-12","w-12","rounded-md","justify-center","items-center"),r.innerHTML=`<img loading="lazy" class="h-[100%] w-[100%] object-cover" src="${t.cover}">`;const a=document.createElement("div");a.classList.add("text-white");const s=document.createElement("h3");s.classList.add("truncate","max-md:text-[.91rem]","mb-0.5","max-md:w-[73vw]","GradientText"),s.id=`text${t.id}`,s.textContent=t.title;const i=document.createElement("h3");i.classList.add("text-[.7rem]","text-zinc-400"),i.textContent=t.artist,a.appendChild(s),a.appendChild(i),o.appendChild(r),o.appendChild(a),n.id=t.id,n.addEventListener("click",(()=>{HideShowLoader(!0),SongPlaying=t.id,PlaySong(SongPlaying),ChangeCurrentSong(t.id)})),n.appendChild(o),SongsFragment.appendChild(n),AllSongs.appendChild(SongsFragment)}CurrentCover.src=`${FetchSongs[1].cover}`,CurrentArtist.textContent=FetchSongs[0].artist,CurrentSongTitle.textContent=FetchSongs[0].title,CurrentSongTitle2.textContent=FetchSongs[0].title,RemoveDefaultLoaders(),AddEventListeners(),HideShowLoader(!1,!0),FocusSong=document.querySelectorAll(".song")}function RemoveDefaultLoaders(){Loading.forEach((e=>{e.remove()}))}function AddEventListeners(){Play.forEach((e=>{e.addEventListener("click",(()=>{PlayPause()}))})),Pause.forEach((e=>{e.addEventListener("click",(()=>{PlayPause()}))})),Next.forEach((e=>{e.addEventListener("click",(()=>{NextSong()}))})),Previous.forEach((e=>{e.addEventListener("click",(()=>{PreviousSong()}))})),CurrentCover.forEach((e=>{e.addEventListener("touchstart",(e=>touchStartX=e.changedTouches[0].clientX),{passive:!0}),e.addEventListener("touchend",(e=>e.changedTouches[0].clientX-touchStartX>0?PreviousSong():NextSong()),{passive:!0})})),ClosePlayer.forEach((e=>{e.addEventListener("click",(()=>{setTimeout((()=>{Player.classList.remove("slide-in-top","max-md:block")}),500),Player.classList.add("slide-down-top")}))})),Content.addEventListener("click",(()=>{Player.classList.remove("slide-down-top"),Player.classList.add("max-md:block","slide-in-top")}))}function ChangeCurrentSong(e){CurrentSongTitle.classList.remove("marquee"),CurrentSongTitle.textContent=FetchSongs[e].title,CurrentSongTitle2.textContent=FetchSongs[e].title,CurrentCover.forEach((t=>{t.src=`https://your-napster.vercel.app/${FetchSongs[e].cover}`})),CurrentArtist.forEach((t=>{t.textContent=FetchSongs[e].artist}))}function AddMarquee(){CurrentSongTitle.textContent.length>23&&window.innerWidth<=600&&CurrentSongTitle.classList.add("marquee")}function PlaySong(e){localStorage.setItem("song",e);const t=FetchSongs[SongPlaying].audio.replace("https://www.youtube.com/watch?v=","");ChangeCurrentSong(SongPlaying),FocusCurrentSong(SongPlaying),MusicAudio&&MusicAudio.stop(),MusicAudio=new Howl({src:[`https://stream-yiue.onrender.com?url=${FetchSongs[e].audio}`],html5:!0,onplay:function(){Play.forEach((e=>{e.classList.add("hidden")})),Pause.forEach((e=>{e.classList.remove("hidden")})),HideShowLoader(!1),requestAnimationFrame(self.step.bind(self)),SeekBar()},onseek:function(){requestAnimationFrame(self.step.bind(self))},onpause:function(){HideShowLoader(!1),Play.forEach((e=>{e.classList.remove("hidden")})),Pause.forEach((e=>{e.classList.add("hidden")}))},onend:function(){NextSong()},onload:function(){HideShowLoader(!1),AddMarquee(),Progress.forEach((e=>{e.max=MusicAudio.duration()}))},onloaderror:function(e){e&&(HideShowLoader(!0),console.log("Going server 2"),newHowl(t))}}),SetMediaSession(),MusicAudio.play()}function step(){var e=MusicAudio.seek()||0;Progress.forEach((t=>{t.value=e})),MusicAudio.playing()&&requestAnimationFrame(self.step.bind(self))}function NextSong(){SongPlaying==FetchSongs.length-1?SongPlaying=0:SongPlaying++,HideShowLoader(!0),PlaySong(SongPlaying)}function PreviousSong(){SongPlaying>0&&(HideShowLoader(!0),SongPlaying--,PlaySong(SongPlaying))}function PlayPause(){HideShowLoader(!0),MusicAudio.playing()?MusicAudio.pause():MusicAudio.play()}function HideShowLoader(e,t){e?(SongLoader.forEach((e=>{e.classList.remove("hidden")})),Play.forEach((e=>{e.classList.add("hidden")})),Pause.forEach((e=>{e.classList.add("hidden")}))):(SongLoader.forEach((e=>{e.classList.add("hidden")})),t&&(PlaySong(SongPlaying),Play.forEach((e=>{e.classList.remove("hidden")}))))}function FocusCurrentSong(e){if(FocusSong)for(let e=0;e<FocusSong.length;e++){const t=FocusSong[e];t.classList.contains("bg-zinc-900")&&t.classList.remove("bg-zinc-900")}const t=document.querySelectorAll(".GradientText");for(let e=0;e<t.length;e++){t[e].classList.remove("text-[#8678f9]")}const n=document.getElementById(e);n.focus();document.getElementById(`text${e}`).classList.add("text-[#8678f9]"),n.scrollIntoView({behavior:"smooth"}),AllSongs.children.item(e).classList.add("bg-zinc-900")}function SetMediaSession(){navigator.mediaSession.metadata=new MediaMetadata({title:FetchSongs[SongPlaying].title,artist:FetchSongs[SongPlaying].artist,artwork:[{src:`https://your-napster.vercel.app/${FetchSongs[SongPlaying].cover}`}]})}function SeekBar(){Progress.forEach((e=>{e.addEventListener("input",(e=>{MusicAudio.seek(e.target.value)}))}))}function newHowl(e){fetch(`https://server333-rx3g.onrender.com/player?s=${e}&a=Paradox`).then((t=>{t.ok&&(ChangeCurrentSong(SongPlaying),FocusCurrentSong(SongPlaying),MusicAudio&&MusicAudio.stop(),MusicAudio=new Howl({src:[`https://server333-rx3g.onrender.com/static/temp/${e}.mp3`],html5:!0,onplay:function(){Play.forEach((e=>{e.classList.add("hidden")})),Pause.forEach((e=>{e.classList.remove("hidden")})),HideShowLoader(!1),requestAnimationFrame(self.step.bind(self)),SeekBar()},onseek:function(){requestAnimationFrame(self.step.bind(self))},onpause:function(){HideShowLoader(!1),Play.forEach((e=>{e.classList.remove("hidden")})),Pause.forEach((e=>{e.classList.add("hidden")}))},onend:function(){NextSong()},onload:function(){HideShowLoader(!1),AddMarquee(),Progress.forEach((e=>{e.max=MusicAudio.duration()}))},onloaderror:function(e){e&&(HideShowLoader(!1),console.log("Going server 2"),newHowl(SongPlaying))}}),SetMediaSession(),MusicAudio.play())}))}LoadPlaylist.addEventListener("click",(()=>{const e=prompt("Enter Youtube Playlist URL");""!==e.trim()&&(localStorage.setItem("song",0),window.location.href=window.location.origin+`?playlist=${e}`)})),Share.addEventListener("click",(async()=>{const e=window.location.href.replace("?share&song=");navigator.share?await navigator.share({title:"Napster",text:`${FetchSongs[SongPlaying].title} by ${FetchSongs[SongPlaying].artist}`,url:e+`?share&song=${SongPlaying}`}):alert("Unable To Share")})),Transfer.addEventListener("click",(()=>{window.open("https://www.tunemymusic.com/transfer")})),ShareNapster.addEventListener("click",(async()=>{navigator.share?await navigator.share({title:"Napster",text:"Listen Your Playlist Ad Free ",url:window.location.origin}):alert("Unable To Share")})),navigator.mediaSession.setActionHandler("play",(()=>{MusicAudio.play()})),navigator.mediaSession.setActionHandler("pause",(()=>{MusicAudio.pause()})),navigator.mediaSession.setActionHandler("previoustrack",(()=>{PreviousSong()})),navigator.mediaSession.setActionHandler("nexttrack",(()=>{NextSong()})),navigator.mediaSession.setActionHandler("seekto",(function(e){MusicAudio.seek(e.seekTime)})),GetPlaylist();