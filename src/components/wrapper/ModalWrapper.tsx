import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById('modal'));
  }, []);

  return <>{portalElement ? createPortal(children, portalElement) : null}</>;
};

export default ModalWrapper;
