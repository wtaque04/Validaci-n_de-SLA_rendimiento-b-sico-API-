const express = require('express');
const app = express();

app.use(express.json());

// Función reutilizable para validar campos vacíos o con solo espacios
function campoVacio(valor) {
    return !valor || valor.trim() === '';
}


app.post('/api/asisya/solicitud-asistencia', (req, res) => {
  const { usuarioId, tipoAsistencia, direccion, fecha } = req.body;

  if (!usuarioId || usuarioId.trim() === '') {
    return res.status(400).json({ error: 'Falta usuarioId' });
  }
  // Validar formato de usuarioId (AAA123)
  const usuarioIdRegex = /^[A-Z]{3}[0-9]{3}$/;
  if (!usuarioIdRegex.test(usuarioId)) {
    return res.status(400).json({ error: 'usuarioId debe tener el formato AAA123' });
  }

  if (!tipoAsistencia || tipoAsistencia.trim() === '') {
    return res.status(400).json({ error: 'Falta tipoAsistencia' });
  }
  if (!direccion || direccion.trim() === '') {
    return res.status(400).json({ error: 'Falta direccion' });
  }
  if (!fecha || fecha.trim() === '') {
    return res.status(400).json({ error: 'Falta fecha' });
  }

  const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!fechaRegex.test(fecha)) {
    return res.status(400).json({ error: 'Formato de fecha inválido. Use AAAA-MM-DD' });
  }

  return res.status(200).json({
    mensaje: 'Solicitud recibida correctamente',
    data: req.body
  });
});

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});