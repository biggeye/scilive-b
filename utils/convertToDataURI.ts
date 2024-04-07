export const convertToDataURI = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result ? reader.result.toString() : '');
    reader.onerror = (error) => reject(error);
    
  });