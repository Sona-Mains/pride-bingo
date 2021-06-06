const {body} = document

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
const cellSize = 150
canvas.width = cellSize * 5
canvas.height = cellSize * 5 + 20

const taskList = [
    "Build the Gay Flag",
    "Build the Lesbian Flag",
    "Build the Bisexual Flag",
    "Build the Transgender Flag",
    "Build the Non-Binary Flag",
    "Build the Pansexual Flag",
    "Build the Agender Flag",
    "Build the Asexual or Demisexual Flag",
    "Build the Genderfluid Flag",
    "Contribute to Sonamains pride playlist",
    "Check out Riot's Pride Merch",
    "Play a pride-related champion",
    "Celebrate pride month with a social media post/story",
    "Play a game as or with a Coven skin",
    "Play a game as or with a Star Guardian skin",
    "Play a game as or with a Spirit Blossom skin",
    "Play a game as or with a Battle Queens skin",
    "Play a game as or with an Immortal Journey skin",
    "Play a game as or with a Space Groove skin",
    "Play a game as or with a KDA or True Damage skin",
    "Play a game as or with a Heartseeker or Sweetheart skin",
    "Play a game as or with a Battle Academia skin",
    "Play a game as or with a Cosmic or Dark Cosmic skin",
    "Play a game as or with a Sugar Rush skin",
    "Play a game as or with a Pool Party skin",
    "Play a game as or with a Rift Hospital or Order of the Lotus skin",
    "Use the SonaPride flair on r/sonamains",
    "Use :SonaPride: in chat on the SonaMains discord server",
    "Attend SonaMains pride movie night",
    "Discuss or post about a queer League of Legends ship"
]

document.addEventListener("DOMContentLoaded", function(event) {
    setAnimation();
});


function setAnimation(){
    let degrees = 0;
    setInterval(function() {   //  call a 3s setTimeout when the loop is called
        degrees++;
        background = `conic-gradient(from ${degrees}deg at 50% 120%, #FF0018, #FFA52C, #FFFF41, #008018, #0000F9, #86007D, #FF0018, #FFA52C, #FFFF41, #008018, #0000F9, #86007D, #FF0018)`;
        document.getElementsByTagName("body")[0].style.background=background;
        if(degrees+1 === 360){
            degrees = 0;
        }
    }, 50)
}

async function drawBingo(){
    ctx.fillStyle = "powderblue"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    
    let user = document.getElementById("input").value
    let output = document.getElementById("output")
    output.appendChild(canvas)
    let rng = new Math.seedrandom(user)
    
    let loading = []
    let tasks = [...taskList]
    for(let i = tasks.length - 1; i > 0; i--){
        const j = Math.floor(rng() * i)
        const temp = tasks[i]
        tasks[i] = tasks[j]
        tasks[j] = temp
    }
    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            if(i == 2 && j == 2) {
                loading.push(renderCell("Free Space", i * cellSize, j * cellSize))
            } else {
                loading.push(renderCell(tasks.shift(), i * cellSize, j * cellSize))
            }
        }
    }
    loading.push(renderFooter(user, 0, canvas.height - 20))
    let targetImg = new Image()
    await Promise.all(loading).then((data) => {
        console.log(data)
        targetImg.src = canvas.toDataURL()
    })

    function renderFooter(content, x, y) {
        var data = '<svg xmlns="http://www.w3.org/2000/svg" width="'+canvas.width+'" height="'+20+'">'
                     + '<foreignObject width="100%" height="100%">'
                     + '<div xmlns="http://www.w3.org/1999/xhtml" style="width:'+canvas.width+'px;height:'+20+'px;font-size:15px">'
                     + 'Sonamains Pride Bingo sheet generated for u/'
                     + content
                     + '</div>'
                     + '</foreignObject>'
                     + '</svg>'
        return render(data, x, y)
    }

    function renderCell(content, x, y) {
        var data = '<svg xmlns="http://www.w3.org/2000/svg" width="'+cellSize+'" height="'+cellSize+'">'
                     + '<foreignObject width="100%" height="100%">'
                     + '<div xmlns="http://www.w3.org/1999/xhtml" style="display:table;width:'+cellSize+'px;height:'+cellSize+'px;font-size:10vw;font-family:' + "'Luckiest Guy', cursive" +'">'
                     + '<p style="display:table-cell;text-align:center;vertical-align:middle;padding:5px;border:2px solid gold">'
                     + content
                     + '</p>'
                     + '</div>'
                     + '</foreignObject>'
                     + '</svg>'
        return render(data, x, y)
    }

    function render(data, x, y) {
        return new Promise((resolve) => {
            var DOMURL = window.URL || window.webkitURL || window;

            var img = new Image();
            var svg = new Blob([data], {
              type: 'image/svg+xml;charset=utf-8'
            });
            var url = DOMURL.createObjectURL(svg);

            img.onload = function() {
              ctx.drawImage(img, x, y);
              DOMURL.revokeObjectURL(url);
              resolve()
            }
            img.src = url;
        })
    }
    
    
}


