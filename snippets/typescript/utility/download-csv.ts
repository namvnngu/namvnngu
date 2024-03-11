/**
 * Description: Download CSV file
 * Date: 24/03/2022
 */

const downloadCsv = (csvFile: string, filename: string) => {
  const link = document.createElement("a");
  const mimeType = "text/csv;charset=utf-8;";
  const blob = new Blob([csvFile], { type: mimeType });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else if (URL && link.download !== undefined) {
    // Feature detection for browsers that support HTML5 download attribute
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename + ".csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    location.href =
      "data:application/octet-stream," + encodeURIComponent(csvFile); // only this mime type is supported
  }
};
