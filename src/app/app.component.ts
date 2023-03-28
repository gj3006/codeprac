import { Component,ViewChild,AfterContentInit, ElementRef} from '@angular/core';
import axios from 'axios';
import { DiffEditorModel } from 'ngx-monaco-editor';
import {io} from 'socket.io-client';

const  socket = io('http://localhost:3000') 
socket.on("connect",()=>{
 console.log(`you connected with socket id : ${socket.id}`);});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})


export class AppComponent implements AfterContentInit {
  
  showOutside: any;
  @ViewChild('textarea',) textarea: ElementRef;
  @ViewChild("resdiv") resdiv: ElementRef;
  constructor() {
    this.showOutside = null;
  }
  

  ngAfterContentInit(): void {
    
  }
  title = 'project';
  
  
  
  

  editorOptions = {theme: 'vs-dark', language: 'javascript', automaticLayout: true };
  onInit(editor: { getPosition: () => any; }) {
    let line = editor.getPosition();
    console.log(line);
  }
  printCode(e){
    
    console.log(e);
 this.code=e;
}

reset(){
  this.code = this.defcode;
   this.result="";

}
ontheme(){
  var element = document.body;
  element.classList.toggle("dark-mode");
}
 
  code: string= 'function x() {\n \n}';
  defcode : string = 'function x() {\n \n}';

  options = {
    theme: 'vs',
    wordWrap: 'on',
      wrappingIndent: 'indent',
      language: 'typescript',
      // minimap: { enabled: false },
      automaticLayout: true,
    };
  
 
  originalModel: DiffEditorModel = {
    code: 'heLLo world!',
    language: 'text/plain'
  };

  modifiedModel: DiffEditorModel = {
    code: 'hello orlando!',
    language: 'text/plain'


  };
  
    lang = '';
    onSelected(value:string): void {
      this.lang = value;
      console.log(this.lang);
      socket.emit("chosenlanguage",this.lang); 
    }

  fileHandle;
 text;
 fileData;
 stream;
  async getFile(){
  
    // open file picker
    [this.fileHandle] = await (<any>window).showOpenFilePicker();
 
    // get file contents
     this.fileData = await this.fileHandle.getFile();
    this.text = await this.fileData.text();
  console.log(this.text);
  this.code = this.text;
  }

  async save(){
 this.stream = await this.fileHandle.createWritable();
 await this.stream.write(this.code);
 await this.stream.close();


  }
  // writtenCode = this.save();
  
async saveas(){
  this.fileHandle = await (<any>window).showSaveFilePicker();
  this.save();
}
newcode;
result;

   async compile(){
  //   try{
   this.newcode = this.code;
  // console.log(this, "   inside ");
  // const response = await axios({
  //   method: 'post',
  //   url: 'http://localhost:3000/user',
  //   data: {
  //     sendcode : newcode
  //   }
  // });
  //    console.log("response ", response.data);
  //       console.log(" Gate  ", this)
  //     this.showOutside = response.data;
  //     console.log(" Gate 2", this, this.showOutside)

  //     }catch(err){
  //       console.log("  assignment error" , err)
  //     }

  socket.emit('code-written',this.newcode);
  // socket.on("code-output", (codeoutput)=>{
  //   console.log(codeoutput);
  //   this.result=codeoutput;
  this.result = await this.resultdis();
  }
   resultdis(){
    return new Promise((resolve,reject)=>{
      socket.on("code-output", (codeoutput)=>{
         console.log(codeoutput);
        // this.result=codeoutput;
         resolve(codeoutput);
    })
   })
}


}
