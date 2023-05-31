const {body} = document;

const pepper = "pride2023"
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const cellSize = 200;
const borderSize = 2;
canvas.width = cellSize * 5 + borderSize * 6;
canvas.height = cellSize * 5 + borderSize * 7 + 20;

const taskList = [
    "res/Event-Movie.png",
    "res/Loot-TFTBoom.png",
    "res/Ext-Ship.png",
    "res/Skin-Mythmaker.png",
    "res/Ext-Educate.png",
    "res/Flag-Asexual.png",
    "res/Flag-NonBinary.png",
    "res/Skin-TrueDamage.png",
    "res/Skin-Dawnbringer.png",
    "res/Skin-Arcane.png",
    "res/Skin-Eclipse.png",
    "res/Skin-Sweetheart.png",
    "res/Skin-Elderwood.png",
    "res/Flag-Genderfluid.png",
    "res/Skin-CafeCuties.png",
    "res/Loot-Emote.png",
    "res/Ext-DiscordEmote.png",
    "res/Skin-BattleBunny.png",
    "res/Skin-Bee.png",
    "res/Skin-ImmortalJourney.png",
    "res/Flag-Lesbian.png",
    "res/Skin-SpaceGroove.png",
    "res/Skin-Debonair.png",
    "res/Skin-PoolParty.png",
    "res/Flag-Bisexual.png",
    "res/Freespace.png",
    "res/Flag-Agender.png",
    "res/Skin-BattleAcademia.png",
    "res/Skin-Coven.png",
    "res/Skin-DarkStar.png",
    "res/Ext-Playlist.png",
    "res/Skin-KDA.png",
    "res/Skin-BrokenCovenant.png",
    "res/Skin-SpiritBlossom.png",
    "res/Skin-OceanSong.png",
    "res/Ext-DiscordMilio.png",
    "res/Flag-Pansexual.png",
    "res/Skin-Nightbringer.png",
    "res/Skin-Bewitching.png",
    "res/Skin-RiftHospital.png",
    "res/Ext-SocialMedia.png",
    "res/Flag-Trans.png",
    "res/Play-QueerChamp.png",
    "res/Flag-Pride.png",
    "res/Skin-LunarRevel.png",
    "res/Skin-StarGuardian.png",
    "res/Skin-Cosmic.png",
    "res/Skin-Rose.png",
    "res/Skin-FaerieCourt.png",
    "res/Ext-Flair.png",
    "res/Skin-BattleQueen.png",
    "res/Skin-Winterblessed.png",
    "res/Skin-SugarRush.png",
    "res/Flag-Ally.png",
];

async function drawBingo(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#d8dad9";
    ctx.fillRect(borderSize, canvas.height - (20 + borderSize), canvas.width - 2 * borderSize, 20);

    
    let user = document.getElementById("input").value;
    let output = document.getElementById("output");
    output.appendChild(canvas);
    let rng = new Math.seedrandom(pepper + user);
    
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


