const express = require('express');
const router = new express.Router();
const Contact = require('../src/models/contact');
const mongoose = require('mongoose');

router.get('/contacts', async (req, res) => {
    const contactList = await Contact.find({});
    res.render('contacts', {
        contactList: contactList,
        title: "Contacts list"
    })
})

router.get('/contacts/delete/:id', async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    res.render('delete', {
        contact: contact,
        title: "Delete"
    })
})

router.post('/contacts/delete/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            res.status(404).send();
        }
        res.redirect('/contacts');
    } catch (e) {
        res.status(500).send();
    }
})

router.post('/contacts/edit/:id', async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    const contact = await Contact.findByIdAndUpdate(req.params.id, { name: req.body.name, number: req.body.number, email: req.body.email }, { new: true });
    console.log(contact);
    res.redirect('/contacts');


})

router.get('/contacts/edit/:id', async (req, res) => {


    const contact = await Contact.findById(req.params.id);

    res.render('edit', {
        contact: contact,
        title: "Edit"
    })
})



module.exports = router;