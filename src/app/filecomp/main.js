async function getFile() {
    // Open file picker and destructure the result the first handle
    const [fileHandle] = await window.showOpenFilePicker();
    const fileData = await fileHandle.getFile();
    let text = await fileData.text();
    console.log(text);
  }