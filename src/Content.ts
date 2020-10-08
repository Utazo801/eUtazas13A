import fs from "fs";
import http from "http";
import Megoldás from "./Megoldás";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // Kezd a kódolást innen -->
        res.write("1. feladat: Adatok beolvasása, tárolása");
        const megold: Megoldás = new Megoldás("utasadat.txt");
        res.write("\n2. feladat");
        res.write(`\nA buszra ${megold.felszallokSzama} utas akart felszállni. `);
        res.write("\n3. feladat");
        res.write(`\nA buszra ${megold.ervenytelenFelszallas} utas nem szálhatott fel.`);
        // <---- Fejezd be a kódolást

        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
