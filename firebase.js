
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCtUeQCm_cWVcxIZvgWdrTSTyLuV36Ge2k",
    authDomain: "couponify-61c42.firebaseapp.com",
    projectId: "couponify-61c42",
    storageBucket: "couponify-61c42.appspot.com",
    messagingSenderId: "817234648600",
    appId: "1:817234648600:web:342e943271b013f0e12d6d"
  };

  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 console.log(firebase);

 chrome.runtime.onMessage.addListener((msg,sender,response) => {
         if(msg.command =="fetch"){
         var domain=msg.data.domain;
         var enc_domain = btoa(domain);
         firebase.database().ref('/domain/'+enc_domain).once('value').then(function(snapshot){
          response({type:"result", status:"success",data: snapshot.val(), request: msg});
});

         }

         if(msg.command == "post"){
           var domain =msg.data.domain;
           var enc_domain= btoa(domain);
           var code =msg.data.code;
           var desc =msg.data.desc;
    
         

         try{

          var newPost =firebase.database().ref('/domain/' +enc_domain).push().set({
            code: code,
            description: desc
          });
          var postId =newPost.key;
          response({type: "result", status:"success",data:postId, request: msg});
         }catch(e){
            console.log('error:',e);
            response({type: "result", status:"error",data:postId, request: msg});
         }

        }

return true;


})