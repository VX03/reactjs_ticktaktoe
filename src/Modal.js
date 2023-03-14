import React from 'react'
import ReactDom from 'react-dom';

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 1000
}
function Modal({children, isEnded, onRestart}) {
  return ReactDom.createPortal(
    isEnded ?
    (
    <>
        <div style={OVERLAY_STYLES}></div>
        <div style={MODAL_STYLES}>
        {children}
        <div>
            <button onClick={onRestart}>Restart</button>
        </div>
        </div> 
    </>
    ) : null, 
    document.getElementById('portal')

  )
}

export default Modal;
