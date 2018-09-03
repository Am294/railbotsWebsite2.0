function barBackgroundMouse(boxes){

    for(var i=0;i<boxes.length;i++){
        
        boxes[i].addEventListener("mouseover",function(){

           this.style.backgroundColor="rgb(0, 153, 255)";
        });

        boxes[i].addEventListener("mouseout",function(){

            this.style.backgroundColor="#f07f15f6";
    });

}
}

function whiteMemberTableClicks(boxes){

    for(var i=0;i<boxes.length;i++){
        
        boxes[i].addEventListener("mouseover",function(){

           this.style.backgroundColor="#f07f15f6";
        });

        boxes[i].addEventListener("mouseout",function(){

            this.style.backgroundColor="white";
    });

}
}

function blueMemberTableClicks(boxes){

    for(var i=0;i<boxes.length;i++){
        
        boxes[i].addEventListener("mouseover",function(){

           this.style.backgroundColor="#f07f15f6";
        });

        boxes[i].addEventListener("mouseout",function(){

            this.style.backgroundColor="rgb(0,153,255)";
    });

}
}





var boxes=document.getElementsByClassName("box");
var memberTableWhite=document.getElementsByClassName("boxClickWhite");
var memberTableBlue=document.getElementsByClassName("boxClickBlue");



barBackgroundMouse(boxes);
whiteMemberTableClicks(memberTableWhite);
blueMemberTableClicks(memberTableBlue);




