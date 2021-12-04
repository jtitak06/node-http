const http = require("http");

http.createServer(function (request, response) {
    const { url, method } = request;
    const chunks = [];

    request.on("error", (error) => {
        response.statusCode = 400;
        response.setHeader("Content-type", "application.json");
        response.write(JSON.stringify(error));
        response.end();
    }).on("data", (chunk) => {
        chunks.push(chunk);
    }).on("end", () => {
        const body = Buffer.concat(chunks).toString();
        const responseBody = {
            url,
            method,
            body,
        };

        response.on("error", (error) => {
            response.statusCode = 500;
            response.setHeader("Content-type", "application.json");
            response.write(JSON.stringify(error));
            response.end();
        });

        switch(url) {
            case "/":
                response.setHeader("Content-type", "text/html");
                response.write("Raise the anthem.");
            break;
            case "/about":
            const details = {
                name: "Jeff",
                city: "Nairobi"
            }
    
                response.setHeader("Content-type", "application/json");
                response.write(JSON.stringify(details));
            break;
            case "/echo":
                response.setHeader("Content-type", "application/json");
                response.write(JSON.stringify(responseBody));
            break;
            default:
                response.setHeader("Content-type", "text/html");
                response.write("404 not found");
        }
        return response.end();
    })

})
.listen(3000, () => console.log("Server listening on port 3000..."));