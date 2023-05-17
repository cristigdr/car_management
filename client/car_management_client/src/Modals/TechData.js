import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Form,
    FormGroup,
} from 'reactstrap';
import PropTypes from 'prop-types';

function TechData(props) {
    const { className } = props;
    const [modal, setModal] = useState(false);
    const [backdrop, setBackdrop] = useState(true);
    const [keyboard, setKeyboard] = useState(true);

    const toggle = () => setModal(!modal);

    const changeBackdrop = (e) => {
        let { value } = e.target;
        if (value !== 'static') {
            value = JSON.parse(value);
        }
        setBackdrop(value);
    };

    const changeKeyboard = (e) => {
        setKeyboard(e.currentTarget.checked);
    };

    return (
        <div>

            <Modal
                isOpen={modal}
                toggle={toggle}
                className={className}
                backdrop={backdrop}
                keyboard={keyboard}
            >
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

TechData.propTypes = {
    className: PropTypes.string,
};

export default TechData;