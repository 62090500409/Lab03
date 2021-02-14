const rsCheck = new Array(8).fill(0);
const XOtable = new Array(9);
var turn = 0;

function onClick(){
    var pos = Number(this.id) - 1;
    this.src="X.png";
    move(1, pos);
    this.removeEventListener('click', onClick);
    if(!endgame()) bot();
}

function bot(){
    var o_pos;
    var min_sum = Number.MAX_SAFE_INTEGER;

    if(turn<2){
        do{
            o_pos = Math.floor(Math.random()*5)*2;
        }while(!XOtable[o_pos].classList.contains("Blank"));
        move(-1,o_pos);
    }else{
        for(i=0;i<9;i++){
            if(!XOtable[i].classList.contains("Blank")) continue;
            move(-1, i);
            if(rsCheck.includes(-3)){
                o_pos=i;
                redomove(-1, i);
                break;
            }else{
                let tmp=sumArray(rsCheck);
                if(!rsCheck.includes(2)) tmp-=1.5;
                if(tmp<min_sum){
                    min_sum=tmp;
                    o_pos=i;
                }
                console.log(tmp + "?" + min_sum + ":i=" + i);
            }
            redomove(-1, i);
        }
        move(-1, o_pos);
    }
    console.log(min_sum + ":>" + o_pos);
    XOtable[o_pos].src="O.png";
    XOtable[o_pos].removeEventListener('click', onClick);
    endgame();
}

function sumArray(arr){
    var sum =0;
    for(let x of arr) {
        sum += x;
    }
    return sum;
}

function move(opt, pos){
    var mark;

    if(opt>=0) mark=1;
    else if(opt<0) mark=-1;

    rsCheck[pos%3]+=mark;
    rsCheck[parseInt(pos/3)+3]+=mark;
    if(pos%4==0) rsCheck[6]+=mark;
    if(pos==2||pos==4||pos==6) rsCheck[7]+=mark;
    turn++;
    XOtable[pos].classList.remove("Blank");
    console.log(rsCheck);
}

function redomove(opt, pos){
    var mark;

    if(opt>=0) mark=-1;
    else if(opt<0) mark=1;

    rsCheck[pos%3]+=mark;
    rsCheck[parseInt(pos/3)+3]+=mark;
    if(pos%4==0) rsCheck[6]+=mark;
    if(pos==2||pos==4||pos==6) rsCheck[7]+=mark;
    turn--;
    XOtable[pos].classList.add("Blank");
}

function checkResult(){
    if(rsCheck.includes(3)) {
        document.getElementById('result').innerHTML="You WIN!";
        return 1;
    }
    else if(rsCheck.includes(-3)) {
        document.getElementById('result').innerHTML="Computer WIN!";
        return -1;
    }
    else if(turn >= 9){
        document.getElementById('result').innerHTML="DRAW!";
    }
    return 0;
}

function endgame(){
    if(checkResult() != 0 || turn >= 9) {
        for(i=0;i<9;i++)
            XOtable[i].removeEventListener('click', onClick);
        
        return true;
    }
    return false     
}

for(i=1;i<=9;i++){
    XOtable[i-1] = document.getElementById(i);
    XOtable[i-1].addEventListener('click', onClick);
}