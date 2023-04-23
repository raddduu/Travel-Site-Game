window.onload=function(){
    if(localStorage.getItem("nracces")){
        document.getElementById("nracces").innerHTML="Jucat de " + localStorage.getItem("nracces") + " ori!";
    }
    document.getElementById("formular").onclick=function(event){
        event.target.style.backgroundColor =
        "rgb(" + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + ","+ Math.floor(Math.random()*256) + ")";
        event.currentTarget.style.color = 
        "rgb(" + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + ","+ Math.floor(Math.random()*256) + ")";
        event.stopPropagation();
    }
    document.getElementById("pasta_form").onclick=function(event){
        var descrieri_paste = ["Paste delicioase!","Cele mai bune paste!","Gastronomie de top!","Campania in bucate!"];
        var desc_paste = document.getElementById("desc_paste");
        desc_paste.innerHTML = descrieri_paste[Math.floor(Math.random()*descrieri_paste.length)];
        event.stopPropagation();
    }
    document.getElementById("username").onclick=document.getElementById("usor").onclick=
    document.getElementById("mediu").onclick=document.getElementById("greu").onclick=function(event){
        event.stopPropagation();
    }
    document.getElementById("mediu").checked = true;
    var btn = document.getElementById("submit");
    btn.onclick=function(event){
        event.stopPropagation();
        var regexelim = /\W/;
        var uinput = document.getElementById("username").value;
        if (regexelim.test(uinput)){
            alert("Username-ul contine caractere invalide!");
        }
        else{
            if(localStorage.getItem("nracces")){
                localStorage.setItem("nracces",parseInt(localStorage.getItem("nracces")) + 1);
            }
            else localStorage.setItem("nracces",1);
            var modif;
            var selected = document.querySelector('input[name="dificultate"]:checked').id;
            switch (selected){
                case 'usor':
                    modif = 0.05;
                    break;
                case 'mediu':
                    modif = 0;
                    break;
                case 'greu':
                    modif = -0.05
                    break;
            }
            var form = document.getElementById("formular");
            var cssform = window.getComputedStyle(form);
            var form_col = cssform.getPropertyValue("background-color");
            document.getElementById("ceas").style.backgroundColor = form_col;
            document.body.removeChild(form);
            
            let scor = 0;
            var bol = document.getElementById("bol");
            var abur = document.getElementById("abur");
            bol.loc = abur.loc = 50;
            let combo = 0;
            var lm = null,rm = null;
            let time = 120000;
            var timer = document.getElementById("ceas").firstChild;

            var cd = setInterval(function(){
                if (time == 0) clearInterval(cd);
                let minute = Math.floor(time/(60000))%60;
                let secunde = Math.floor((time - minute*60000)/1000);
                if (secunde<10) secunde = "0" + secunde;
                timer.innerHTML = minute + ":" + secunde;
                time -= 1000;
            },1000)
        

            window.onkeydown=function(event){
        
                    if (event.keyCode == 37 && !lm){
                        lm = setInterval(function(){
                        bol.loc -= (0.15 + modif);
                        bol.style.left =abur.style.left = (Math.max(6,bol.loc) - 1) + "vw";
                    },1);
                    }

                    else if (event.keyCode == 39 && !rm){
                        rm = setInterval(function(){
                        bol.loc += (0.15 + modif);
                        bol.style.left = abur.style.left = (Math.min(84,bol.loc) + 1) + "vw";
                    },1);
                    }
            }

            window.onkeyup=function(event){
                if (event.keyCode == 37){
                    clearInterval(lm);
                    lm = null;
                }
                else if (event.keyCode == 39){
                    clearInterval(rm);
                    rm = null;
                }
        
            }

            var calc = setInterval(function(){
                let paste = document.getElementsByClassName("pasta");
                for (let pasta of paste){
                    if (intersect(bol,pasta)){
                    document.body.removeChild(pasta);
                    scor += 100;
                    combo += 1;
                    if (combo>=3){
                        scor += 20*combo;
                        let cs = document.createElement("div");
                        cs.classList.add("combo_star");
                        cs.style.left = bol.loc + "vw";
                        let cmb = document.createElement("h1");
                        cmb.innerHTML = "X" + combo;
                        cs.appendChild(cmb);
                        document.body.appendChild(cs);
                        setTimeout(function(){
                        document.body.removeChild(cs);
                    },1500);
                    }
                 }
                }
            },1);

            var c = setInterval(function(){
                let p = document.createElement("div");
                p.classList.add("pasta");
                p.loc = randInt(5,91);
                p.style.left = p.loc + "vw";
                p.onclick=function(){
                alert(p.getBoundingClientRect().bottom + " " + bol_y)
                }
                document.body.appendChild(p);
                setTimeout(function(){
                    document.body.removeChild(p);
                    if (combo>=3){
                        let bc = document.createElement("div");
                        bc.classList.add("combo_break");
                        bc.style.left = p.loc + "vw";
                        let poza = document.createElement("img");
                        poza.src = "./combo_break.png";
                        bc.appendChild(poza);
                        document.body.appendChild(bc);
                        setTimeout(function(){
                            document.body.removeChild(bc);
                        },1500);
                        combo = 0;
                    }
            
                },1505);
            },1000);
        
            setTimeout(function(){
                clearInterval(c);
                clearInterval(calc)
            },120000);

            setTimeout(function(){
                var anunt = document.createElement("div");
                anunt.id="anunt";
                var txt = document.createElement("h1");
                txt.innerHTML = "Felicitari " + uinput + ", scorul tau este " + scor + "!";
                anunt.append(txt);
                document.body.appendChild(anunt);
            },121000)

            function randInt(a,b){
                return Math.floor(a+Math.random()*(b-a));
            }

            function intersect(pa,bo){
                let p = pa.getBoundingClientRect();
                let b = bo.getBoundingClientRect();
                if (p.right < b.left || p.left > b.right)   return false;
                return true;
            }
        }
    }
}