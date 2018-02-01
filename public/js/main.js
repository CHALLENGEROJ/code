//*************************
         //OJ CODE
//*************************
// Script to open and close sidebar
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}


function onLoad(){
//  alert("omar");
$.ajax({
     type: "POST",
     url: "/home.html",
     contentType: "application/json",
  //receive data from server
       success:(data)=>{
       console.log(data);
       if(data!="")
       {
           console.log(JSON.parse(data));
       }
       updatePage(JSON.parse(data));

     }

   });

  // addEventListeners();
    return false;

}

function addEventListeners(){

  const goBtn=document.getElementById("save_button");
  goBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    //get all item after translation
    let item1=document.getElementById("item1").value;
    let item2=document.getElementById("item2").value;
    let item3=document.getElementById("item3").value;
    let item4=document.getElementById("item4").value;
    let item5=document.getElementById("item5").value;
    let item6=document.getElementById("item6").value;
    let item7=document.getElementById("item7").value;
    let item8=document.getElementById("item8").value;
    let item9=document.getElementById("item9").value;

  //GET LENGUAGE
  var leng0;
  if(document.getElementById('fr').checked) {
    leng0="fr";

}else if(document.getElementById('en').checked) {
  leng0="en";
}else if(document.getElementById('gr').checked) {
  leng0="gr";
}else if(document.getElementById('it').checked) {
  leng0="it";
}
//alert("44");
    $.ajax({
         type: "POST",
         url: "/itemUpdate",
         contentType: "application/json",
         //NOTE SEND DATA TO SERVER
         data: JSON.stringify({leng0: leng0,item1: item1,item2: item2,item3: item3,
           item4: item4,item5: item5,item6: item6,item7: item7,
         item8: item8,item9: item9}),

       });

     })
     //setTimeout(yourFunction, 5000);
   }

   function AlwaysRun(){

       //get all item after translation
       let item1=document.getElementById("item1").value;
       let item2=document.getElementById("item2").value;
       let item3=document.getElementById("item3").value;
       let item4=document.getElementById("item4").value;
       let item5=document.getElementById("item5").value;
       let item6=document.getElementById("item6").value;
       let item7=document.getElementById("item7").value;
       let item8=document.getElementById("item8").value;
       let item9=document.getElementById("item9").value;

     //GET LENGUAGE
     var leng0;
     if(document.getElementById('fr').checked) {
       leng0="fr";

   }else if(document.getElementById('en').checked) {
     leng0="en";
   }else if(document.getElementById('gr').checked) {
     leng0="gr";
   }else if(document.getElementById('it').checked) {
     leng0="it";
   }
   if( leng0!=null)
   {
   //alert("44");
       $.ajax({
            type: "POST",
            url: "/itemUpdate",
            contentType: "application/json",
            //NOTE SEND DATA TO SERVER
            data: JSON.stringify({leng0: leng0,item1: item1,item2: item2,item3: item3,
              item4: item4,item5: item5,item6: item6,item7: item7,
            item8: item8,item9: item9}),

          });
        }
        setTimeout(AlwaysRun,10000);

      }

function updatePage(data){

    document.getElementById("uNameSpan").innerHTML = data.userName;
    document.getElementById("fNameSpan").innerHTML = " " + data.fName;
    document.getElementById("lNameSpan").innerHTML = " " + data.lName;

    return false;

}




function ItemAdd()
{
  $.ajax({
       type: "POST",
       url: "/home.html",
       contentType: "application/json",
    //receive data from server
         success:(data)=>{
         console.log(data);
         if(data!="")
         {
             console.log(JSON.parse(data));
         }
         ItemAdd2(JSON.parse(data));

       }

     });
      return false;
}



function ItemAdd2(data)
{
  var i=4;

  document.getElementById("1").innerHTML="";

  do {


  document.getElementById("1").innerHTML = data.data1[i]+document.getElementById("1").innerHTML;
  i++;
} while (i<10);


      return false;

}
