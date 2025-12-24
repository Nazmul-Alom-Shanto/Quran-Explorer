const baseURL = "https://api.alquran.cloud/v1/ayah/";
const tafseerURL = "https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/";
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

const surahNames = [
    "Al-Fatiha",
    "Al-Baqarah",
    "Al-Imran",
    "An-Nisa",
    "Al-Ma'idah",
    "Al-An'am",
    "Al-A'raf",
    "Al-Anfal",
    "At-Tawbah",
    "Yunus",
    "Hud",
    "Yusuf",
    "Ar-Ra'd",
    "Ibrahim",
    "Al-Hijr",
    "An-Nahl",
    "Al-Isra",
    "Al-Kahf",
    "Maryam",
    "Ta-Ha",
    "Al-Anbiya",
    "Al-Hajj",
    "Al-Mu'minun",
    "An-Nur",
    "Al-Furqan",
    "Ash-Shu'ara",
    "An-Naml",
    "Al-Qasas",
    "Al-Ankabut",
    "Ar-Rum",
    "Luqman",
    "As-Sajda",
    "Al-Ahzab",
    "Saba",
    "Fatir",
    "Ya-Sin",
    "As-Saffat",
    "Sad",
    "Az-Zumar",
    "Ghafir",
    "Fussilat",
    "Ash-Shura",
    "Az-Zukhruf",
    "Ad-Dukhan",
    "Al-Jathiyah",
    "Al-Ahqaf",
    "Muhammad",
    "Al-Fath",
    "Al-Hujurat",
    "Qaf",
    "Adh-Dhariyat",
    "At-Tur",
    "An-Najm",
    "Al-Qamar",
    "Ar-Rahman",
    "Al-Waqi'ah",
    "Al-Hadid",
    "Al-Mujadila",
    "Al-Hashr",
    "Al-Mumtahanah",
    "As-Saff",
    "Al-Jumu'ah",
    "Al-Munafiqun",
    "At-Taghabun",
    "At-Talaq",
    "At-Tahrim",
    "Al-Mulk",
    "Al-Qalam",
    "Al-Haqqah",
    "Al-Ma'arij",
    "Nuh",
    "Al-Jinn",
    "Al-Muzzammil",
    "Al-Muddathir",
    "Al-Qiyamah",
    "Al-Insan",
    "Al-Mursalat",
    "An-Naba",
    "An-Nazi'at",
    "Abasa",
    "At-Takwir",
    "Al-Infitar",
    "Al-Mutaffifin",
    "Al-Inshiqaq",
    "Al-Buruj",
    "At-Tariq",
    "Al-A'la",
    "Al-Ghashiyah",
    "Al-Fajr",
    "Al-Balad",
    "Ash-Shams",
    "Al-Layl",
    "Ad-Duhaa",
    "Ash-Sharh",
    "At-Tin",
    "Al-Alaq",
    "Al-Qadr",
    "Al-Bayyinah",
    "Az-Zalzalah",
    "Al-Adiyat",
    "Al-Qari'ah",
    "At-Takathur",
    "Al-Asr",
    "Al-Humazah",
    "Al-Fil",
    "Quraysh",
    "Al-Ma'un",
    "Al-Kawthar",
    "Al-Kafirun",
    "An-Nasr",
    "Al-Masad",
    "Al-Ikhlas",
    "Al-Falaq",
    "An-Nas"
  ];
  
const tafsirBnSlug = 'bn-tafseer-ibn-e-kaseer';
const tafsirEnSlug = 'en-al-jalalayn'; 

let surahNumber = 2;
let ayahNumber = 255;
let audioURL = null;
let audio = null;
let wasPlaying = false;
let isClicked = false;
let currSearchMode = "UsingAyahAndSurahNo";


const AyahArabic = document.getElementById("ayah-arabic");
const AyahNo = document.getElementById("ayah-no");
const AyahBangla = document.getElementById("ayah-bangla");
const AyahEnglish = document.getElementById("ayah-english");
const SearchBar = document.getElementById("search-bar");
const SelectSurah = document.getElementById("surah-input-select");
const SearchActionIcon = document.getElementById("search-action-icon");
const SearchInput = document.getElementById("search-input");

const tafsirBn = document.getElementById("tafsir-bn");
const tafsirEn = document.getElementById("tafsir-en");

const PlayPauseBTN = document.getElementById("btn-play-pause");
const LeftBTN = document.getElementById("btn-left");
const RightBTN = document.getElementById("btn-right");
const UsingSurahName = document.getElementById("UsingSurahName");
const UsingAyahAndSurahNo = document.getElementById("UsingAyahAndSurahNo");

const SearchAction = document.getElementById("search-action");


function ResetSearch() {
    SearchBar.innerHTML = "";
    const SearchInput = document.createElement("div");
    SearchInput.id = "search-input";
    SearchInput.className = "input";
    
    const select = document.createElement("select");
    select.id = "surah-input-select";
    const option = document.createElement("option");
    option.value = "-1";
    option.innerHTML = " &nbsp; &nbsp; Search";
    option.className = "first-option";
    select.appendChild(option);
    surahNames.forEach((name, index) => {
        const option = document.createElement("option");
        option.value = index + 1; // Surah number    
        option.textContent = `  ${index + 1}. ${name}`;
        select.appendChild(option);
    })
    SearchInput.appendChild(select);



    const SearchAction = document.createElement("div");
    SearchAction.className = "action";
    SearchAction.id = "search-action";
    
    const icon = document.createElement("i");
    icon.className = "material-icons";
    icon.id = "search-action-icon";
    icon.innerText = "search";
    SearchAction.appendChild(icon);
    SearchAction.id = "search-action";
    SearchBar.appendChild(SearchInput);
    SearchBar.appendChild(SearchAction);



    const SelectSurah = document.getElementById("surah-input-select");
    const SearchActionIcon = document.getElementById("search-action-icon");

    SelectSurah.addEventListener("focus",()=>{
        SearchActionIcon.innerText = "arrow_forward"
        SearchAction.id = "to-ayah-no";
        const ToAyahNo = document.getElementById("to-ayah-no");
        ToAyahNo.addEventListener("click",() => {
            console.log("ToAyahNo Clicked");
            SearchActionIcon.innerText = "search"
            SearchInput.innerHTML = "";
            const input = document.createElement("input");
            input.type = "number";
            input.placeholder = "Ayah Number";
            input.min = 1;
            input.max = ayahs_in_surahs[surahNumber-1];
            SearchInput.appendChild(input);
            SearchAction.id = "search";
            const SearchBTN = document.getElementById("search");
            SearchBTN.addEventListener("click",()=>{
                if(Number(input.value) > ayahs_in_surahs[surahNumber-1] || Number(input.value) < 1){
                    alert("Invalid ayah number");
                    return;
                }
                ayahNumber = Number(input.value);
                console.log("SearchBTN Clicked");
                console.log(`${surahNumber}:${ayahNumber}`);
                try {
                    UpdateAyah(wasPlaying);
                } catch (error) {
                    alert("can't Update Ayah",error);
                }
                ResetSearch();
            })
        },{once:true});
        
    })
    
    
    SelectSurah.addEventListener("change",()=>{
        console.log("SelectSurah changed, the value is ",SelectSurah.value);
        
        if(Number(SelectSurah.value) > 0){
            surahNumber = Number(SelectSurah.value);
        }
    })
    
    

}
/*
surahNames.forEach((name, index) => {
    const option = document.createElement("option");
    option.value = index + 1; // Surah number
    option.textContent = `  ${index + 1}. ${name}`;
    SelectSurah.appendChild(option);
  });
*/
ResetSearch();



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

        const responceBanglaTafsir = await fetch(`${tafseerURL}${tafsirBnSlug}/${surahNumber}/${ayahNumber}.json`);
        const dataTafsir = await responceBanglaTafsir.json();
        tafsirBn.innerText = dataTafsir.text;

        const responceEnglishTafsir = await fetch(`${tafseerURL}${tafsirEnSlug}/${surahNumber}/${ayahNumber}.json`);
        const dataEnglishTafsir = await responceEnglishTafsir.json();
        tafsirEn.innerText = dataEnglishTafsir.text;


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
        const ab = {"TypeError" : "Failed to fetch"};
        if(error === ab){
            console.log("in the if");
            AyahArabic.innerHTML = "No Internet";
            AyahBangla.innerHTML ="";
            AyahEnglish.innerHTML ="";
        }
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

/*
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


*/

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


/*UsingSurahName.addEventListener("click",()=> {

})
*/
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
