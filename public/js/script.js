const formDetails=document.getElementById('create-new');
const formSubmit=document.getElementById('create-new-but');

formSubmit.addEventListener('click', (e)=>{
   e.preventDefault() ;
   const formData=new FormData(formDetails);
   fetch('http://www.foo.com',{
       method:'POST',
       body:formData,

       encType:'multipart/form-data'
   }).then(response=>{
       return response.text();
   }).then(text=>{
       return text
   }) .catch(err=>console.error(err));

});
