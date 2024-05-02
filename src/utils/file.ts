export function download(data: Blob, name: string) {
  const url = URL.createObjectURL(data);
  const element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', name);

  element.style.display = 'none';
  element.click();
}
