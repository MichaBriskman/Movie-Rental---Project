import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

/**
 * home page component, a modal that appears when an item added to cart.
 * @param props showModal - boolean. setShowModal - setter boolean
 * @returns {JSX.Element} the modal section.
 * @constructor
 */
const ModalAddedToCart = (props) => {
    const handleClosePopup = () => {
        props.setShowModal(false);
    };
    return (
        <>
        <div>
            <Modal show={props.showModal} onHide={handleClosePopup}>
                <Modal.Body>Added to cart</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePopup}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        </>
    );
}

export default ModalAddedToCart;