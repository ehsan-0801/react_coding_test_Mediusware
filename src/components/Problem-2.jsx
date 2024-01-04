import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';

const Problem2 = () => {
    const [showContactsModal, setShowContactsModal] = useState(false);
    const [onlyEvens, setOnlyEvens] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [isUSContacts, setIsUSContacts] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    const handleCloseContactsModal = () => setShowContactsModal(false);
    const handleShowContactsModal = (usContacts) => {
        setIsUSContacts(usContacts);
        fetchContacts(usContacts);
        setShowContactsModal(true);
    };

    const handleSearchKeyPress = (event) => {
        if (event.key === 'Enter') {
            setDebouncedSearch(searchInput);
        }
    };

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const handleDebouncedSearch = debounce((value) => {
        setDebouncedSearch(value);
    }, 300);

    useEffect(() => {
        fetchContacts(isUSContacts, debouncedSearch);
    }, [isUSContacts, debouncedSearch, onlyEvens]);

    const fetchContacts = (usContacts, search = '') => {
        const apiUrl = `https://contact.mediusware.com/api/contacts/?format=json${search ? `&search=${search}` : ''}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const filteredContacts = usContacts
                    ? data.results.filter((contact) => contact.country.name === 'United States')
                    : data.results;

                const finalContacts = onlyEvens ? filterEvenIds(filteredContacts) : filteredContacts;
                setContacts(finalContacts);
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
    };

    const handleShowDetailsModal = (contact) => {
        setSelectedContact(contact);
        setShowDetailsModal(true);
    };

    const handleCloseDetailsModal = () => setShowDetailsModal(false);

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-md" style={ { background: "#46139f" } } type="button" onClick={ () => handleShowContactsModal(false) }>
                        All Contacts
                    </button>
                    <button className="btn btn-md" style={ { background: "#ff7f50" } } type="button" onClick={ () => handleShowContactsModal(true) }>
                        US Contacts
                    </button>
                </div>
            </div>

            <Modal show={ showContactsModal } onHide={ handleCloseContactsModal }>
                <Modal.Header closeButton>
                    <Modal.Title>{ isUSContacts ? 'US Contacts' : 'All Contacts' }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Search..."
                            value={ searchInput }
                            onChange={ (e) => {
                                setSearchInput(e.target.value);
                                handleDebouncedSearch(e.target.value);
                            } }
                            onKeyPress={ handleSearchKeyPress }
                        />
                    </Form.Group>

                    <Form.Check
                        type="checkbox"
                        label="Only Evens"
                        checked={ onlyEvens }
                        onChange={ () => {
                            handleOnlyEvensChange();
                            fetchContacts(isUSContacts, debouncedSearch);
                        } }
                    />

                    { contacts.map((contact) => (
                        <div key={ contact.id }>
                            <table className="table table-striped">
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
                                        <td>
                                            <Button variant="primary" onClick={ () => handleShowDetailsModal(contact) }>
                                                Details
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )) }
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-md" style={ { background: "#46139f" } } type="button" onClick={ handleCloseContactsModal }>
                        Close
                    </button>
                    <button className="btn btn-md" style={ { background: "#46139f" } } type="button" onClick={ () => handleShowContactsModal(false) }>
                        All Contacts
                    </button>
                    <button className="btn btn-md" style={ { background: "#ff7f50" } } type="button" onClick={ () => handleShowContactsModal(true) }>
                        US Contacts
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal show={ showDetailsModal } onHide={ handleCloseDetailsModal }>
                <Modal.Header closeButton>
                    <Modal.Title>Contact Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { selectedContact && (
                        <div>
                            <p>Contact ID: { selectedContact.id }</p>
                            <p>Phone Number: { selectedContact.phone }</p>
                            <p>Country: { selectedContact.country.name }</p>
                            {/* Add more details as needed */ }
                        </div>
                    ) }
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-md" style={ { background: "#46139f" } } type="button" onClick={ handleCloseDetailsModal }>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Problem2;
