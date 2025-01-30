import React, { useState } from 'react';

function Newsletter() {
    const [user, setUser] = useState({name: '', email: ''});
    const [isOpen, setIsOpen] = useState(false); // Gère l'affichage de la modal

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUserEntry = {
            id: Date.now(), // Utilisation de l'heure actuelle comme ID unique
            name: user.name,
            email: user.email,
            createdAt: new Date().toISOString(), // Date de création au format ISO
        };


        fetch("http://localhost:3001/api/newsletter", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUserEntry)
        })
        .then((res) => {
            if (res.ok) {
                alert("Successfully subscribed!");
                setUser({ name: "", email: "" }); // Reset les inputs
                setIsOpen(false); // Ferme la modal
            }
        })
        .catch((err) => console.error("Erreur lors de l'ajout de l'utilisateur :", err));
    };

    return (
        <div className='newsletter'>
            {/* Bouton pour ouvrir la modal */}
            <button onClick={() => setIsOpen(true)}>Subscribe to the newsletter</button>

            {/* Dialog Box */}
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Subscribe to our Newsletter</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <button type="submit">Subscribe</button>
                        </form>
                        <button onClick={() => setIsOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}


export default Newsletter;