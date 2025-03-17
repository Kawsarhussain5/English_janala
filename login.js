// login condition check 

document.getElementById("login-btn").addEventListener("click",function(){
    const enterName =document.getElementById("enter-name").value;
    const enterPass =document.getElementById("inter-pass").value;
    const newEnterPass = parseInt(enterPass)
    // console.log(enterName,enterPass)
    
    if(enterName.length!==0){
        // console.log("all ok mama")
        if(enterPass.length!==0 && newEnterPass===123456){
            // console.log("all ok mama2")
            my_modal_1.showModal()
            showSections('bennar_section')
            
            
        }
        else{
            alert('Enter Your password') 
        }
    }
    else{
        alert('Enter Your Name')
    }
   
});

// after login show section funtion
function showSections(bennar_section) {
   
    const sections = document.querySelectorAll('section.hidden');
    
  
    sections.forEach((section) => {
      section.classList.remove('hidden');
    });
    
  
    if (bennar_section) {
      const sectionToHide = document.getElementById('bennar_section');
      if (bennar_section) {
        sectionToHide.classList.add('hidden');
      }
    }
  }
  
   