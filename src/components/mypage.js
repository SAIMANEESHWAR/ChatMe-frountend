import React, { useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';

export default function Mypage() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleToggleOffcanvas = () => setShowOffcanvas((prev) => !prev);

  const handleClose = () => setShowOffcanvas(false);

  return (
    <div>
      {/* Button to open/close the Offcanvas */}
      <Button variant="primary" onClick={handleToggleOffcanvas}>
        {showOffcanvas ? 'Close Offcanvas' : 'Open Offcanvas'}
      </Button>

      {/* Offcanvas component */}
      <div>
        <Offcanvas
          show={showOffcanvas}
          onHide={handleClose}
          placement="bottom" // You can change the placement here (e.g., "start", "top", "bottom", etc.)
          style={{
            zIndex: 1040,
            width: '800px', // Set the width to 800px
            left: '50%', // Center horizontally
            transform: 'translateX(-50%)', // Center horizontally
           margin:'-10px -3px 176px'
          }}
          backdrop={false}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Custom Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* Offcanvas content */}
            This is a custom Offcanvas component.
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
}
