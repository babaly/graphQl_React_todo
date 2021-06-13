import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const Detail = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(props.modal);

  const toggle = () => setModal(!modal);

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
  console.log(props.result)

  return (
  <div>
    <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle} close={closeBtn}>Modal title</ModalHeader>
      <ModalBody>
        <Form>
            <FormGroup>
                <Label for="exampleEmail">Titre</Label>
                <Input value={props.result.title} />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Texte</Label>
                <Input value={props.result.text} />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Date</Label>
                <Input type="datetime" value={props.result.createdAt} />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Statut</Label>
                <Input value={props.result.isDone} />
            </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>Fermer</Button>
      </ModalFooter>
    </Modal>
  </div>
);
}

export default Detail;