const {body} = document

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 1250
canvas.height = 1270
images = [
"res/blue.png",
"res/green.png",
"res/lightblue.png",
"res/orange.png",
"res/red.png",
"res/yellow.png",
]

function drawBingo(){
	ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    let user = document.getElementById("input").value
    console.log(user)
    var rng = new Math.seedrandom(user)
    
    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            let imagePath = images[Math.floor(rng.quick() * 5)]
            let image = new Image
            image.src = imagePath
            image.addEventListener('load', () => {
                ctx.drawImage(image, i * 250, j * 250)
                redraw()
            })
        }
    }

    
    let genStamp = new Image
    genStamp.addEventListener('load', () => {
        console.log("hi")
        ctx.drawImage(genStamp, 0, 1250)
        redraw()
    })
    genStamp.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1250" height="20"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size:20px;white-space:nowrap">Generated for u/' + user + '</div></foreignObject></svg>')



	const targetImg = document.getElementById("output")

    function redraw(){
        targetImg.src = canvas.toDataURL()
    }
}


