window.addEventListener('load',event =>{

    // declaramos unas variables
    const searchInput = document.getElementById("search")
    const  btnSearch = document.getElementById("btnSearch")
    //helper para los min:ss
    function toMinSS(value){
        const minutes = Math.floor(value/60000)
        const seconds = ( (value % 60000) / 1000 ).toFixed(0);
        //return `${minutes}:${(seconds < 10 ? "0":'')}`
        return minutes  + ":" + (seconds < 10 ? "0":'') + seconds
    }
    //tocar una cacion
    function playSong(song){
        const songDetail = document.getElementById("detail")
        songDetail.innerHTML = '';
        console.log("que es song?",song)
        const rowDetail = document.createElement('div')

        rowDetail.innerHTML= `
            <img src="${song.album? song.album.images[2].url: ""}" />
            <span class="title">${song.name}</span>
            <span>Duration: ${toMinSS(song.duration_ms)}</span>
            <span>Popularity: ${song.popularity}</span>
            <span>Album: ${song.album ? song.album[0] :'N/A'  }</span>
            <span>${song.artists? song.artists[0].name : "Artists"}</span>
            <audio src="${song.preview_url}" controls>
                Your browser does not support the <code>audio</code> element.
            </audio>
        `;

        rowDetail.className="header"
        songDetail.appendChild(rowDetail)

    }
    //hacer la busqueda
    function onSearch(event){
        event.preventDefault()
       console.log("Soy el boton",searchInput.value)

       //Peticion
       axios.get(`https://api.spotify.com/v1/search?q=${searchInput.value}&type=track&market=MX`,{
           headers:{
               Authorization:'Bearer BQA4iSRsPl_PJ6UUeoaD6ciPgP_dlFXC8bMXeLYAP_QRlg3DP5jEzN1ALwd4Z8RAoXYP15j1JUxmB9C-Xx0ocxs9L2eSEGT21b9NxEokpalXE1ARp6ka05owYKsDgsgSk4twvTsainPlpOKW_NK6zP61Ovj3GQ9Mw3ZJ'
           }
       })
       .then(response => {
        console.log("que es esto???",response)

        searchInput.value= ''

        const results = document.getElementById("container")
        results.innerHTML = ''
        /**
         * response={
         *  data:{
         *    tracks:{
         *          items:[{},{},{}... ]
         *      }
         *  }
         * ...
         * }
         */
        response.data.tracks.items.forEach(track => {
            // destructurar
            const {name,duration_ms,artists } = track
            const row = document.createElement("a")
            row.innerHTML = ` 
                <span class="title">${name}</span>
                <span>${toMinSS(duration_ms)}</span>
                <span>${artists? artists[0].name:"The Artist"}</span>
            `

            //  condicion ?  rultadoVerdadero : Falsa
            //if(){}else{}
            row.className = "song"
            row.onclick= () =>playSong(track) 
            results.appendChild(row)
        });

       })
       .catch(error=>console.log("el error",error))
    }

    btnSearch.onclick = onSearch;
})