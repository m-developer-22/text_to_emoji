const text = document.querySelector("#txtmsg")
const password = document.querySelector('#password')
const result = document.querySelector("#result")
var clutter = "";
var parinam = "";

// ----------------------Starting animation--------------------
function starterAnimation(){
    gsap.to("#animator",{
        height:0,
        duration:2,
        delay:5,
        onComplete: function(){
            document.querySelector("#animator").style.display="none";
            document.querySelector("#main").style.display="flex";
        }
    })
    gsap.from(".context>h1",{
        opacity:0,
        duration:5,
        onComplete: function(){
            document.querySelector(".context>h1").style.display="none";
        }
    })
}
starterAnimation();


// ----------------------main code starts here-----------------


// ---this function will change mode from encryption to decryption
function changeMode(){

    document.querySelector("#decryptbutton").addEventListener("click",function(){
        document.querySelector("#encryption-part").style.display="none";
        document.querySelector("#decryption-part").style.display="block";
        document.querySelector("#decryptbutton").style.backgroundColor="rgba(255, 255, 255, 0.051)";
        document.querySelector("#encryptbutton").style.backgroundColor="transparent";
        document.querySelector("#main>h1 span img").style.transform="rotate(-90deg)";
        document.querySelector("#result").style.display="none";
    })

    document.querySelector("#encryptbutton").addEventListener("click",function(){
        document.querySelector("#encryption-part").style.display="block";
        document.querySelector("#decryption-part").style.display="none";
        document.querySelector("#encryptbutton").style.backgroundColor="rgba(255, 255, 255, 0.051)";
        document.querySelector("#decryptbutton").style.backgroundColor="transparent";
        document.querySelector("#main>h1 span img").style.transform="rotate(90deg)";
    })

    document.querySelector("#encrypt-btn").addEventListener("click",function(){
        document.querySelector("#result").style.display="block";
    })

    document.querySelector("#decrypt-btn").addEventListener("click",function(){
        document.querySelector("#result").style.display="block";
    })
}
changeMode();


// ---this function will encrypt the text
function encryption(){
    document.querySelector("#encrypt-btn").addEventListener("click",function(){
        // --getting input text & password--
        var textvalue=document.getElementById("txtmsg").value;
        var pass=document.getElementById("password").value;

        const str=textvalue.split("");
        // console.log(str);
        str.forEach(element => {
            clutter+= `&#128${(element.charCodeAt())} `;
        });
        console.log(clutter);

        document.querySelector("#result").innerHTML=clutter;


        var dataarr =[];
        if(JSON.parse(localStorage.getItem('data')))
        {
            dataarr=JSON.parse(localStorage.getItem('data'));
            dataarr.push({"pass":pass,"input":textvalue,"clutter":clutter});
        }
        else
        {
            dataarr=[{"pass":pass,"input":textvalue,"clutter":clutter}];
        }

        localStorage.setItem('data',JSON.stringify(dataarr));
    })
}
encryption();


// ---this function will decrypt the text
function decryption() {
    document.querySelector("#decrypt-btn").addEventListener("click", function () {
        var clutter2 = '';
        var input2 = document.querySelector("#emojimsg").value
        var finalPass = document.querySelector("#finalpassword").value
        var user = JSON.parse(localStorage.getItem('data'))
        var str2 = input2.split(" ")
        str2.forEach(element => {
                clutter2 += `&#${(element.codePointAt(0))} `
        });
        console.log(clutter2)
        var found;
        for(let i of user)
        {
            if(i.clutter == clutter2){
                found = i;
                console.log(i)
            }
        }
        if(found.clutter === clutter2)
        {
            document.querySelector("#result").style.display = `block`
            document.querySelector("#result").style.color = `#eee`

            document.querySelector("#result").innerHTML = found.input
        }
        else
        {
            document.querySelector("#result").style.display = `block`
            document.querySelector("#result").style.color = `red`
            document.querySelector("#result").innerHTML = "Wrong password!"
        }
    })

}
decryption();