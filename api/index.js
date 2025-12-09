// api/index.js
import express from "express";
import cors from "cors";

// Rutas
import rutasLog from "../src/routes/auth.routes.js";
import rutasProductos from "../src/routes/products.routes.js";

const app = express();

// Configuración CORS
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

// Ruta raíz para probar en navegador
app.get("/", (req, res) => {
  res.send("Backend de Tienda Lencería Online funcionando!");
});

// Rutas de autenticación y productos
app.use("/api", rutasLog);
app.use("/api", rutasProductos);

// Middleware 404
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Export para Vercel
export default function handler(req, res) {
  return app(req, res);
}
