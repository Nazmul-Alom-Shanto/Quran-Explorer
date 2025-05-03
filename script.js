const baseURL = "http://api.alquran.cloud/v1/ayah/";
const ayahs_in_surahs = [
    7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111,
    43, 52, 99, 128, 111, 110, 98, 135, 112, 78, 118, 64,
    77, 227, 93, 88, 69, 60, 34, 30, 73, 54, 45, 83,
    182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29,
    18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13,
    14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28, 28,
    20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25,
    22, 17, 19, 26, 30, 20, 15, 21, 11, 8, 8, 19,
    5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3,
    6, 3, 5, 4, 5, 6
];



let surahNumber = 2;
let ayahNumber = 255;
let audioURL = null;
let audio = null;
let wasPlaying = false;
let isClicked = false;


const AyahArabic = document.getElementById("ayah-arabic");
const AyahNo = document.getElementById("ayah-no");
const AyahBangla = document.getElementById("ayah-bangla");
const AyahEnglish = document.getElementById("ayah-english");
const SearchBar = document.getElementById("search-bar");


const PlayPauseBTN = document.getElementById("btn-play-pause");
const LeftBTN = document.getElementById("btn-left");
const RightBTN = document.getElementById("btn-right");
const SearchBTN = document.getElementById("btn-search");




function togglePlayPause(){
    if(PlayPauseBTN.innerHTML === 'play_arrow'){
        PlayPauseBTN.innerHTML = 'pause';
} else {
    PlayPauseBTN.innerHTML = 'play_arrow';
}
}

async function UpdateAyah(isSpecial = false) {
    try {
        if(audio) {
            if(!audio.paused){
                audio.pause();
                wasPlaying = true;
            } else {
                wasPlaying = false;
                
            }
            audio = null;
        }
        if(isSpecial){
            wasPlaying = true;
        }
        const responceArabic = await fetch(baseURL + surahNumber + ":" + ayahNumber + "/ar.alafasy");
        const dataArabic = await responceArabic.json();
        AyahArabic.innerText = dataArabic.data.text;
        AyahNo.innerText = `Quran (${dataArabic.data.surah.number}:${dataArabic.data.numberInSurah})`;
        audioURL = dataArabic.data.audio;

        const responceBangla = await fetch(baseURL + surahNumber + ":" + ayahNumber + "/bn.bengali");
        const dataBangla = await responceBangla.json();
        AyahBangla.innerText = dataBangla.data.text;

        const responceEnglish = await fetch(baseURL + surahNumber + ":" + ayahNumber + "/en.asad");
        const dataEnglish = await responceEnglish.json();
        AyahEnglish.innerText = dataEnglish.data.text;


        if(wasPlaying){
            if(audioURL){
                audio = new Audio(audioURL);
                audio.play();
                audio.addEventListener('ended', () => {
                //    togglePlayPause();
                    GoForward(true);
                })
            }
        }

    } catch (error){
        console.warn("Error Updating Ayah",error);
    }
}



LeftBTN.addEventListener("click",() => {
    if(isClicked) return;
    isClicked = true;
    if(surahNumber > 1 && surahNumber <= 114){
        if(ayahNumber > 1 && ayahNumber <= ayahs_in_surahs[surahNumber - 1]){
            ayahNumber -= 1;
            UpdateAyah(surahNumber,ayahNumber);
        } else if( ayahNumber == 1){
            surahNumber -= 1;
            ayahNumber = ayahs_in_surahs[surahNumber - 1];
            UpdateAyah(surahNumber,ayahNumber);
        } else {
            alert("Invalid ayah number");
        }
    } else if(surahNumber == 1){
        if(ayahNumber > 1 && ayahNumber <= 7){
            ayahNumber -= 1;
            UpdateAyah(surahNumber,ayahNumber);
        } else if (ayahNumber == 1){
            alert("it is the 1st ayah of the Holy Quran.");
            return;
        } else {
            alert("Invalid ayah number");
        }
    } else {
        alert("Invalid Surah number");

    }
    setTimeout(()=> {
        isClicked = false;
    }, 1500)
});


function GoForward(isSpecial = false) {
    if(isClicked) return;
    isClicked = true;
    if(surahNumber >= 1 && surahNumber < 114){
        if(ayahNumber >= 1 && ayahNumber < ayahs_in_surahs[surahNumber - 1]){
            ayahNumber += 1;
            UpdateAyah(isSpecial);
        } else if( ayahNumber == ayahs_in_surahs[surahNumber - 1]){
            surahNumber += 1;
            ayahNumber = 1;
            UpdateAyah(isSpecial);
        } else {
            alert("Invalid ayah number");
        }
    } else if(surahNumber == 114){
        if(ayahNumber >= 1 && ayahNumber < 6){
            ayahNumber += 1;
            UpdateAyah(isSpecial);
        } else if (ayahNumber == 6){
            alert("it is the last ayah of the Holy Quran.");
            return;
        } else {
            alert("Invalid ayah number");
        }
    } else {
        alert("Invalid Surah number");

    }
    setTimeout(()=>{
        isClicked = false;
    },1500)
}

RightBTN.addEventListener("click",() => {
    GoForward();
})

SearchBTN.addEventListener("click",()=> {
    const [surah,ayah] = SearchBar.value.split(":");
    if(surah > 114 || surah < 1){
        alert("Invalid Surah number");
        return;
    }
    if(ayah > ayahs_in_surahs[surah - 1] || ayah < 1){
        alert("Invalid ayah number");
        return;
    }
    surahNumber = Number(surah);
    ayahNumber = Number(ayah);
    UpdateAyah();
})



PlayPauseBTN.addEventListener("click",() => {
    togglePlayPause();
    if(audio){
        if(audio.paused){
            audio.play();
            
        } else {
            audio.pause();
        }
    } else if(audioURL) {
            audio = new Audio(audioURL);
            audio.play();
            audio.addEventListener('ended', () => {
               // togglePlayPause();
                wasPlaying = true;
                GoForward(true);
                
            })
    } else {
            alert("audioURL can't be fetched properly");
    }
})



UpdateAyah();

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            LeftBTN.click();
            break;
        case "ArrowRight":
            RightBTN.click();
            break;
        case "Enter": // Correct capitalization
            if (SearchBar.value === "") {
                return;
            }
            SearchBTN.click();
            break;
        case " ": // Correct key for spacebar
        case "Spacebar": // Legacy support
            e.preventDefault(); // Optional: prevents page from scrolling
            PlayPauseBTN.click();
            break;
    }
});



/*

function loadAudio(url){
    if(audio) {
        audio.pause();
        audio.currentTime = 0;
    }
    if(url){
        audio = new Audio(url);
    }
}

async function playAudio() {
    if (audio) {
        try {
            await audio.play();  // wait until audio starts playing
        } catch (err) {
            console.warn("Autoplay blocked or playback failed:", err);
        }
    }
}*/ 