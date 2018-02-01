//*************************
         //OJ CODE
//*************************

function addEventListeners(){
  const goBtn=document.getElementById("login");
  goBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    //get all item after translation
    let Username=document.getElementById("uName").value;
    let password=document.getElementById("pwd").value;
    $.ajax({
         type: "POST",
         url: "/",
         contentType: "application/json",
         data: JSON.stringify( {Uname: Username,pwd: password}),

           success:(data)=>{
           console.log(data);
           if(data!="")
           {
               console.log(JSON.parse(data));
           }
           updatePage(JSON.parse(data));
         }

       });
     })
   }


   function updatePage(data){
       if(data.key=="1")
   	window.location = '/home.html';
   }
