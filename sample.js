/*
	Ez csak egy példa
*/
function asd () {
  return 42;
}


class Rectangle {
  constructor(height, width) {
    //comment
    if(height < 0){
        this.height = 0;
    }
    else{
        this.height = height;
    }
    
    this.width = width;
  }
  
  sajtos(){
      var asd = function(){
          
          return "qwe";
      };
      
      return asd();
      
  }
}