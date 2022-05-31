const {body} = document;

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const cellSize = 200;
const borderSize = 2;
canvas.width = cellSize * 5 + borderSize * 6;
canvas.height = cellSize * 5 + borderSize * 7 + 20;

const taskList = [
    "res/Agender.png",
    "res/Ally.png",
    "res/Asexual.png",
    "res/Bisexual.png",
    "res/Discord Janna.png",
    "res/Discord Lulu.png",
    "res/Discord Morgana.png",
    "res/Discord Nami.png",
    "res/Discord Neeko.png",
    "res/Discord Orianna.png",
    "res/Discord Renata.png",
    "res/Discord Senna.png",
    "res/Discord Seraphine.png",
    "res/Discord Sona.png",
    "res/Discord Soraka.png",
    "res/Discord Yuumi.png",
    "res/Educate.png",
    "res/Flair.png",
    "res/Genderfluid.png",
    "res/Lesbian.png",
    "res/Movie Night.png",
    "res/Non - Binary.png",
    "res/Pansexual.png",
    "res/Play queer champ.png",
    "res/Playlist.png",
    "res/Pride Merch.png",
    "res/Pride.png",
    "res/Queer ship.png",
    "res/Skin-Battle Academia.png",
    "res/Skin-Battle Queens.png",
    "res/Skin-Cosmic.png",
    "res/Skin-Coven.png",
    "res/Skin-Dark Star.png",
    "res/Skin-Hospital.png",
    "res/Skin-Immortal Journey.png",
    "res/Skin-KDA.png",
    "res/Skin-Lunar Revel.png",
    "res/Skin-Pool Party.png",
    "res/Skin-SG.png",
    "res/Skin-Space Groove.png",
    "res/Skin-Spirit Blossom.png",
    "res/Skin-Sugar Rush.png",
    "res/Skin-Sweetheart.png",
    "res/Skin-True Damage.png",
    "res/SR Emote.png",
    "res/SR Icon.png",
    "res/Social Media.png",
    "res/TFT Boom.png",
    "res/Trans.png",
];

async function drawBingo(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#d8dad9";
    ctx.fillRect(borderSize, canvas.height - (20 + borderSize), canvas.width - 2 * borderSize, 20);

    
    let user = document.getElementById("input").value;
    let output = document.getElementById("output");
    output.appendChild(canvas);
    let rng = new Math.seedrandom(user);
    
    let loading = [];
    let tasks = [...taskList];
    for(let i = tasks.length - 1; i > 0; i--){
        const j = Math.floor(rng() * i);
        const temp = tasks[i];
        tasks[i] = tasks[j];
        tasks[j] = temp
    }
    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            if(i == 2 && j == 2) {
                loading.push(renderCell("res/Freespace.png", i * (cellSize + borderSize) + borderSize, j * (cellSize + borderSize) + borderSize))
            } else {
                loading.push(renderCell(tasks.shift(), i * (cellSize + borderSize) + borderSize, j * (cellSize + borderSize) + borderSize))
            }
        }
    }
    loading.push(renderFooter(user, borderSize * 2, canvas.height - (20 + borderSize)));
    let targetImg = new Image();
    await Promise.all(loading).then((data) => {
        console.log(data);
        targetImg.src = canvas.toDataURL()
    });

    function renderFooter(content, x, y) {
        var data = '<svg xmlns="http://www.w3.org/2000/svg" width="'+canvas.width+'" height="'+20+'">'
                     + '<foreignObject width="100%" height="100%">'
                     + '<div xmlns="http://www.w3.org/1999/xhtml" style="width:'+canvas.width+'px;height:'+20+'px;font-size:15px">'
                     + 'Pride Bingo sheet generated for u/'
                     + content
                     + '</div>'
                     + '</foreignObject>'
                     + '</svg>';
        return render(data, x, y)
    }

    function renderCell(path, x, y) {
        return new Promise((resolve) => {
            let img = new Image();
            img.onload = () => {
                ctx.drawImage(img, x, y);
                resolve();
            };
            img.src = path;
        });
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
            };
            img.src = url;
        })
    }
    
    
}


