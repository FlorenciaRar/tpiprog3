import { createObjectCsvWriter } from "csv-writer";
import puppeteer, { Browser } from "puppeteer";
import handlebars from "handlebars";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class InformeService {
  informeReclamoPdf = async (datosReporte) => {
    try {
      const filePath = path.join(__dirname, "../utils/plantilla-informe.html");
      const htmlTemplate = fs.readFileSync(filePath, "utf8");

      const template = handlebars.compile(htmlTemplate);
      const htmlFinal = template(datosReporte);

      //inicializamos puppeteer, me permite crear un navegador web sin interfaz grafica
      const browser = await puppeteer.launch();
      //creamos una nueva pagina en ese navegador
      const page = await browser.newPage();

      // cargo la plantilla
      await page.setContent(htmlFinal, { waitUntil: "load" });

      //generamos el pdf con el metodo .pdf de la pagina creada
      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "10px", bottom: "10px" },
      });

      //liberamos el navegador
      await browser.close();

      //retornamos los datos binarios de ese pdf
      return pdfBuffer;
    } catch (error) {
      console.error("Error generando PDF:", error);
      throw error;
    }
  };

  informeReclamoCsv = async (datosReporte) => {
    let ruta = path.resolve(__dirname, "..");
    ruta = path.join(ruta, "/utils/reclamos.csv");

    // configuracion de un escritor csv
    const csvWriter = createObjectCsvWriter({
      path: ruta, //ruta donde guardamos el csv
      header: [
        { id: "reclamo", title: "RECLAMO" },
        { id: "tipo", title: "TIPO" },
        { id: "estado", title: "ESTADO" },
        { id: "fechaCreado", title: "FECHA CREADO" },
        { id: "cliente", title: "CLIENTE" },
      ],
      encoding: "utf-8",
    });

    // genera el csv
    await csvWriter.writeRecords(datosReporte);
  
    return ruta;
  };
}
