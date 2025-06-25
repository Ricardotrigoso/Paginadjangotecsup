import React from "react";

function InfoPage() {
  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-4">Síndrome del Ojo Seco</h2>
      <div className="row">
        <div className="col-md-6">
          <p>
            El <strong>síndrome del ojo seco</strong> es una condición que ocurre cuando los ojos no producen
            suficientes lágrimas o cuando se evaporan demasiado rápido. Es muy común en personas que pasan
            largas horas frente a pantallas sin parpadear con frecuencia.
          </p>
          <ul>
            <li>Ojos rojos, irritados o con sensación de arenilla</li>
            <li>Visión borrosa temporal</li>
            <li>Sensación de ardor o picor</li>
          </ul>
          <p><strong>Recomendaciones:</strong></p>
          <ul>
            <li>Parpadear con frecuencia</li>
            <li>Tomar descansos cada 20 minutos (Regla 20-20-20)</li>
            <li>Usar humidificadores y proteger los ojos del viento</li>
          </ul>
        </div>
        <div className="col-md-6">
          <img
            src="/ojo.jpg"
            alt="Salud ocular"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </div>
  );
}

export default InfoPage;