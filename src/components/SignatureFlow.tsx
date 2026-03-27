import { useState, useRef, useCallback, useEffect } from 'react';
import type { Signer } from '../lib/types';

export default function SignatureFlow() {
  const [signers, setSigners] = useState<Signer[]>([
    { id: 's1', name: 'John Reynolds', email: 'john@acme.com', status: 'signed', signedAt: '2025-06-15T15:45:00Z' },
    { id: 's2', name: 'Lisa Wong', email: 'lisa@acme.com', status: 'pending' },
  ]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [showPad, setShowPad] = useState(false);
  const [sent, setSent] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);

  const addSigner = useCallback(() => {
    if (!newName.trim() || !newEmail.trim()) return;
    const signer: Signer = {
      id: `s-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim(),
      status: 'pending',
    };
    setSigners(prev => [...prev, signer]);
    setNewName('');
    setNewEmail('');
  }, [newName, newEmail]);

  const removeSigner = useCallback((id: string) => {
    setSigners(prev => prev.filter(s => s.id !== id));
  }, []);

  const sendForSignature = useCallback(() => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }, []);

  // Canvas drawing
  useEffect(() => {
    if (!showPad) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if ('touches' in e) {
        return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
      }
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const start = (e: MouseEvent | TouchEvent) => {
      isDrawingRef.current = true;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    };
    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawingRef.current) return;
      e.preventDefault();
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    };
    const stop = () => { isDrawingRef.current = false; };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stop);
    canvas.addEventListener('mouseleave', stop);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stop);

    return () => {
      canvas.removeEventListener('mousedown', start);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stop);
      canvas.removeEventListener('mouseleave', stop);
      canvas.removeEventListener('touchstart', start);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stop);
    };
  }, [showPad]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const statusIcon = (status: Signer['status']) => {
    switch (status) {
      case 'signed': return '\u2713';
      case 'declined': return '\u2717';
      default: return '\u25CB';
    }
  };

  return (
    <div className="signature-flow">
      <div className="signature-flow__header">
        <h2>E-Signature Flow</h2>
        <p className="signature-flow__subtitle">Manage signers and collect signatures for your contract</p>
      </div>

      <div className="signature-flow__section">
        <h3>Signers</h3>
        <div className="signature-flow__signers" data-testid="signer-list">
          {signers.map(signer => (
            <div key={signer.id} className={`signer-row signer-row--${signer.status}`} data-testid={`signer-${signer.id}`}>
              <span className={`signer-row__status-icon signer-row__status-icon--${signer.status}`}>
                {statusIcon(signer.status)}
              </span>
              <div className="signer-row__info">
                <span className="signer-row__name">{signer.name}</span>
                <span className="signer-row__email">{signer.email}</span>
              </div>
              <span className={`signer-row__badge signer-row__badge--${signer.status}`}>
                {signer.status}
              </span>
              {signer.signedAt && (
                <span className="signer-row__date">
                  {new Date(signer.signedAt).toLocaleDateString()}
                </span>
              )}
              <button
                className="signer-row__remove"
                onClick={() => removeSigner(signer.id)}
                aria-label={`Remove signer ${signer.name}`}
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <div className="signature-flow__add-signer">
          <input
            type="text"
            placeholder="Full name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            aria-label="Signer name"
          />
          <input
            type="email"
            placeholder="Email address"
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
            aria-label="Signer email"
          />
          <button className="btn btn--secondary" onClick={addSigner}>
            Add Signer
          </button>
        </div>
      </div>

      <div className="signature-flow__section">
        <h3>Signature Pad</h3>
        {!showPad ? (
          <button className="btn btn--secondary" onClick={() => setShowPad(true)}>
            Open Signature Pad
          </button>
        ) : (
          <div className="signature-pad">
            <canvas
              ref={canvasRef}
              className="signature-pad__canvas"
              data-testid="signature-canvas"
            />
            <div className="signature-pad__actions">
              <button className="btn btn--ghost" onClick={clearCanvas}>Clear</button>
              <button className="btn btn--secondary" onClick={() => setShowPad(false)}>Done</button>
            </div>
          </div>
        )}
      </div>

      <div className="signature-flow__actions">
        <button
          className="btn btn--primary btn--lg"
          onClick={sendForSignature}
          disabled={signers.length === 0}
        >
          {sent ? '\u2713 Sent for Signature!' : 'Send for Signature'}
        </button>
      </div>
    </div>
  );
}
