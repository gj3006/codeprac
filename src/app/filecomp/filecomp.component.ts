import { Component ,Output} from '@angular/core';
import  {EventEmitter,Input } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { saveAs } from 'file-saver';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-filecomp',
  templateUrl: './filecomp.component.html',
  styleUrls: ['./filecomp.component.css']
})
export class FilecompComponent {
  constructor(private http : HttpClient) {}
//  fileHandle;
//  text;
//  fileData;
//  stream;
//   async getFile(){
  
//       // open file picker
//       [this.fileHandle] = await (<any>window).showOpenFilePicker();
   
//       // get file contents
//        this.fileData = await this.fileHandle.getFile();
//       this.text = await this.fileData.text();
//     console.log(this.text);
//     textarea.innerText = this.text;
//     }
  
//     async save(){
//    this.stream = await this.fileHandle.createWritable();
//    await this.stream.write(textarea.innerText);
//    await this.stream.close();

//     }
//      async saveas(){
//    this.fileHandle = await (<any>window).showOpenFilePicker();
//    this.save();
//      }
  

//   file:any;
//   fileChanged(e) {
//       this.file = e.target.files[0];
//   }
//   @Output() x = new EventEmitter<string>();
  
//   uploadDocument(file) {
//     let fileReader = new FileReader();
//     fileReader.onload = (e) => {
//       console.log(fileReader.result);
//       this.x.emit(fileReader.result as string );
//       console.log(this.x)
//     }
//     fileReader.readAsText(this.file);
//   }
// @Input() re:string;  

// codefile:any;
// download() {
//       console.log(this.x)
//       let fileSaverService = new FileSaverService; 
//      this.codefile = this.x; 
//       var blob = new Blob([this.codefile],
//        {type: "text/plain;charset=utf-8"}); 
//           fileSaverService.save (this.file, "NewFile")
//         ;  
}

  



  


