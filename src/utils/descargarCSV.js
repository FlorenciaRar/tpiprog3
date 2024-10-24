import { Parser } from 'json2csv';
import ReclamosService from '../services/reclamosService.js';

export const descargarCSV = async (req, res) => {
    try {
        const service = new ReclamosService();
        const reclamos = await service.buscarTodos(0,0);

        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(reclamos);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=informeReclamos.csv');

        res.send(csv);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
