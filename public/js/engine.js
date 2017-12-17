var Engine = function Engine(id){
  
  var db, 
      ID = id;
  
  (function(){
    if(typeof Storage !== "undefined"){
      db = window.sessionStorage;
      console.log("Initalized");
    } else {
      alert("Invalid Browser");
    }
  })();
  
  var s = {
    get: function(){
      console.log("S.Get");
    },
    set: function(){
      console.log("S.Set");
    }
  }
  
  console.log(ID);
  
  return {
    get: function(){
      console.log(s.get());
    },
    set: function(){
      
    }
    
  }
}