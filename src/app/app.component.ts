import { Component,ViewChild,AfterContentInit, ElementRef} from '@angular/core';
import { CompactType, DisplayGrid, GridsterComponent, GridsterConfig, GridsterItem, GridsterItemComponent, GridsterItemComponentInterface, GridType} from 'angular-gridster2';
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
  gridsterOptions: GridsterConfig
   dashboard: Array<GridsterItem>;
    static eventStart( item: GridsterItem, itemComponent: GridsterItemComponentInterface, event: MouseEvent ): void { console.info('eventStart', item, itemComponent, event); } static eventStop( item: GridsterItem, itemComponent: GridsterItemComponentInterface, event: MouseEvent ): void { console.info('eventStop', item, itemComponent, event); } static overlapEvent( source: GridsterItem, target: GridsterItem, grid: GridsterComponent ): void { console.log('overlap', source, target, grid); }

  @ViewChild('textarea',) textarea: ElementRef;
  @ViewChild("resdiv") resdiv: ElementRef;
  constructor() {
    this.showOutside = null;
  }
  
  ngOnInit(): void { this.gridsterOptions = { gridType: GridType.Fit, displayGrid: DisplayGrid.OnDragAndResize, pushItems: true, swap: true, maxCols: 2, maxRows: 2, allowMultiLayer: true, draggable: { delayStart: 0, enabled: true, ignoreContentClass: 'gridster-item-content', ignoreContent: false, dragHandleClass: 'drag-handler', stop: AppComponent.eventStop, start: AppComponent.eventStart, dropOverItems: false, dropOverItemsCallback: AppComponent.overlapEvent }, resizable: { enabled: true } }; this.dashboard = [ { cols: 2, rows: 1, y: 0, x: 0 }, { cols: 2, rows: 2, y: 0, x: 2, hasContent: true }, { cols: 1, rows: 1, y: 0, x: 4 }, { cols: 1, rows: 1, y: 2, x: 5 }, { cols: 1, rows: 1, y: 1, x: 0 }, { cols: 1, rows: 1, y: 1, x: 0 }, { cols: 2, rows: 2, y: 3, x: 5, minItemRows: 2, minItemCols: 2, label: 'Min rows & cols = 2' }, { cols: 2, rows: 2, y: 2, x: 0, maxItemRows: 2, maxItemCols: 2, label: 'Max rows & cols = 2' }, { cols: 2, rows: 1, y: 2, x: 2, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled' }, { cols: 1, rows: 1, y: 2, x: 4, dragEnabled: false, resizeEnabled: false, label: 'Drag&Resize Disabled' }, { cols: 1, rows: 1, y: 2, x: 6 } ]; }

  ngAfterContentInit(): void {
    
  }
  title = 'project';
  
  items: GridsterItem[] = [ { x: 0, y: 0, rows: 1, cols: 1, content: 'this.result',compile:false},  ];
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
  this.items[1].content = "";
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
  let dummyCode = {
    x:0 ,y:0,  rows: 1, cols: 1, content:this.text, compile:true
  }
  console.log( " break1",dummyCode);
  this.items.push(dummyCode) ;
  console.log( " break2" ,this.items);
  
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

   async compile(text:  any){
  
   this.newcode = text;
  

  socket.emit('code-written',this.newcode);
  
  this.result = await this.resultdis();
  }

   resultdis(){
    return new Promise((resolve,reject)=>{
      socket.on("code-output", (codeoutput)=>{
         console.log(codeoutput);
         resolve(codeoutput);
    })
   })
}
removeItem(item) {
  this.dashboard.splice(this.dashboard.indexOf(item), 1);
}


}
