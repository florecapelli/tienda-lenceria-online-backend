import express from "express";
import cors from "cors";
import rutasLog from "./src/routes/auth.routes.js";
import rutasProductos from "./src/routes/products.routes.js";

const app = express();

const corsConfig = {
    origin: [
        "http://localhost:3000",
        "https://tienda-lencer-a-online.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Length"],
    credentials: true,
    maxAge: 600,
    optionsSuccessStatus: 204
};

app.use(cors(corsConfig));
app.use(express.json());

// Rutas
app.use("/api", rutasLog);
app.use("/api", rutasProductos);

// 404
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;  // OBLIGATORIO para vercel
