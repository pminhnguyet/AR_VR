import { useState } from 'react';
import QRCode from 'react-qr-code';
import '../styles/QRPopup.scss';

function QRPopup({ model }) {
  const [showPopup, setShowPopup] = useState(false);
  const qrValue = `https://tool-ar-xuannghi19s-projects.vercel.app/?name=${encodeURIComponent(model.title)}&glb=${encodeURIComponent(model.model3D)}&usdz=${encodeURIComponent(model.usdz)}`;

  return (
    <div className="qr-wrapper">
      <button className="btn-open" onClick={() => setShowPopup(true)}>
        Trải nghiệm AR
      </button>

      {showPopup && (
        <div onClick={() => setShowPopup(false)} className="popup-overlay">
          <div className="popup-content">
            <QRCode value={qrValue} size={500} />
          </div>
        </div>
      )}
    </div>
  );
}

export default QRPopup;
