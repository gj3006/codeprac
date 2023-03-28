
import { createServer } from "http";
import { Server } from "socket.io";
import { exec } from 'child_process';
// import cors from 'cors';
 import * as fs from 'fs';


const httpServer = createServer();
const io = new Server(httpServer, {
  // ...
  cors : {
origin: ["http://localhost:4200"],
  },
})


 var chosenChoice="okay";
io.on("connection", (socket) => {
  // ...
  console.log(socket.id);
  socket.on("chosenlanguage",(choice)=>{
    chosenChoice = choice;
    console.log(chosenChoice);
  });

  socket.on("code-written",(code)=>{
   console.log( code);
    console.log(chosenChoice);
 
  

  if (chosenChoice === 'Java') {
    fs.writeFile('assets/files/test1.java',code, function (err) {
      if (err) throw err;
      console.log('File Created and Saved!');
    }); 
    exec("java  assets/files/test1.java",(error,stdout,stdeer)=>
    { if(error){
      console.log(`error:${error.message}`);
       return; }
        if(stdeer){
           console.log(`stdeer:${stdeer}`);
           return; }
           console.log( stdout)  
           io.emit("code-output",stdout);
          });
         
     } else if ( chosenChoice === 'Python') {
      fs.writeFile('assets/files/test1.py',code, function (err) {
        if (err) throw err;
        console.log('File Created and Saved!');
      }); 
       exec("python  assets/files/test1.py ",(error,stdout,stdeer)=>
       { if(error){
         console.log(`error:${error.message}`);
          return; }
           if(stdeer){
              console.log(`stdeer:${stdeer}`);
              return; }
              console.log( stdout) 
              io.emit("code-output",stdout);   });
  
     } else {
      fs.writeFile('assets/files/test1.c',code, function (err) {
        if (err) throw err;
        console.log('File Created and Saved!');
      }); 
       exec("g++  assets/files/test1.c && a.exe",(error,stdout,stdeer)=>
       { if(error){
         console.log(`error:${error.message}`);
          return; }
           if(stdeer){
              console.log(`stdeer:${stdeer}`);
              return; }
           console.log(stdout);  
           io.emit("code-output",stdout);
          });
            
   }
 
   
  
  });
}); 
          
  
      // code block
  
// //   exec("java  assets/files/test1.java && a.exe",(error,stdout,stdeer)=>
// // { if(error){
// //    console.log(`error:${error.message}`);
// //     return; }''
// //      if(stdeer){
// //         console.log(`stdeer:${stdeer}`);
// //         return; } 
      
    
    
   
  


//   // io.emit("code-output",outputfinal);

httpServer.listen(3000);

// import express from 'express';
// import bodyParser from "body-parser";
// import { exec } from 'child_process';
// import cors from 'cors';
// import * as fs from 'fs';
// import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';


// let outputfinal;
// const app = express();
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(cors());

// //  fs.appendFile('newtemp.c',   req.body.code, function (err) {
// //    if (err) throw err;
// //    console.log('File Created and Saved!');
// //  });
// const port = 3000;

 


// app.post('/user', (req, res) => {
// const code=req.body.sendcode;
  
//   fs.writeFile('assets/files/test1.c',code, function (err) {
//     if (err) throw err;
//     console.log('File Created and Saved!');
//   });



//   exec("g++  assets/files/test1.c && a.exe",(error,stdout,stdeer)=>
// { if(error){
//    console.log(`error:${error.message}`);
//     return; }''
//      if(stdeer){
//         console.log(`stdeer:${stdeer}`);
//         return; } 
      
//       outputfinal= stdout   
      
//      });      
//   console.log(outputfinal);
//   res.send(outputfinal);
// });
// app.get('/', (req, res) => {
//   res.send("get req");
 
//  });

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })
        
