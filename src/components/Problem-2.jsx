import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';

const Problem2 = () => {
    const [showAllContactsModal, setShowAllContactsModal] = useState(false);
    const [showUsContactsModal, setShowUsContactsModal] = useState(false);
    const [onlyEvens, setOnlyEvens] = useState(false);
    const [allContacts, setAllContacts] = useState([]);
    const [usContacts, setUsContacts] = useState([]);

    const handleCloseAllContactsModal = () => setShowAllContactsModal(false);
    const handleCloseUsContactsModal = () => setShowUsContactsModal(false);

    const handleShowAllContactsModal = () => {
        fetchAllContacts();
        setShowAllContactsModal(true);
    };
    const handleShowUsContactsModal = () => {
        fetchUsContacts();
        setShowUsContactsModal(true);
    };

    const fetchAllContacts = () => {
        const apiUrl = 'https://contact.mediusware.com/api/contacts/?format=json';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const contacts = onlyEvens ? filterEvenIds(data.results) : data.results;
                setAllContacts(contacts);
            })
            .catch((error) => {
                console.error('Error fetching contacts:', error);
            });
    };

    const fetchUsContacts = () => {
        const apiUrl = 'https://contact.mediusware.com/api/contacts/?format=json';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const usContacts = data.results.filter((contact) => contact.country.name === 'United States');
                const contacts = onlyEvens ? filterEvenIds(usContacts) : usContacts;
                setUsContacts(contacts);
            })
            .catch((error) => {
                console.error('Error fetching contacts:', error);
            });
    };

    const filterEvenIds = (contacts) => {
        return contacts.filter((contact) => contact.id % 2 === 0);
    };

    const handleOnlyEvensChange = () => {
        setOnlyEvens(!onlyEvens);
        if (showAllContactsModal) {
            fetchAllContacts();
        } else if (showUsContactsModal) {
            fetchUsContacts();
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-md " style={ { background: "#46139f" } } type="button" onClick={ handleShowAllContactsModal }>
                        All Contacts
                    </button>
                    <button className="btn btn-md" style={ { background: "#ff7f50" } } type="button" onClick={ handleShowUsContactsModal }>
                        US Contacts
                    </button>
                </div>
            </div>

            {/* All Contacts Modal */ }
            <Modal show={ showAllContactsModal } onHide={ handleCloseAllContactsModal }>
                <Modal.Header closeButton>
                    <Modal.Title>All Contacts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Check
                        type="checkbox"
                        label="Only Evens"
                        checked={ onlyEvens }
                        onChange={ handleOnlyEvensChange }
                    />
                    { allContacts.map((contact) => (
                        <div key={ contact.id }>
                            <table className="table table-striped ">
                                <thead>
                                    <tr>
                                        <th scope="col">Contact ID</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Country</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{ contact.id }</td>
                                        <td>{ contact.phone }</td>
                                        <td>{ contact.country.name }</td>
                                        <td><Button variant="primary">Details</Button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )) }
                </Modal.Body>
                <Modal.Footer>

                    <button className="btn btn-md " style={ { background: "#46139f" } } type="button" onClick={ handleCloseAllContactsModal }>
                        Close
                    </button>
                    <button className="btn btn-md " style={ { background: "#46139f" } } type="button">
                        All Contacts
                    </button>
                    <button className="btn btn-md" style={ { background: "#ff7f50" } } type="button">
                        US Contacts
                    </button>
                </Modal.Footer>
            </Modal>

            {/* US Contacts Modal */ }
            <Modal show={ showUsContactsModal } onHide={ handleCloseUsContactsModal }>
                <Modal.Header closeButton>
                    <Modal.Title>US Contacts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Check
                        type="checkbox"
                        label="Only Evens"
                        checked={ onlyEvens }
                        onChange={ handleOnlyEvensChange }
                    />
                    { usContacts.map((contact) => (
                        <div key={ contact.id }>
                            <table className="table table-striped ">
                                <thead>
                                    <tr>
                                        <th scope="col">Contact ID</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Country</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{ contact.id }</td>
                                        <td>{ contact.phone }</td>
                                        <td>{ contact.country.name }</td>
                                        <td><Button variant="primary">Details</Button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )) }
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-md " style={ { background: "#46139f" } } type="button" onClick={ handleCloseUsContactsModal }>
                        Close
                    </button>
                    <button className="btn btn-md " style={ { background: "#46139f" } } type="button">
                        All Contacts
                    </button>
                    <button className="btn btn-md" style={ { background: "#ff7f50" } } type="button">
                        US Contacts
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default Problem2;
