const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser, requireAuth } = require('../auth');
const user = require('../db/models/user');
const { User, Shelf } = db;

/*
[] create a get route to return all shelves for a single user
    (shows all shelves)
Path: shelves/user:id/

[] create a post route to create a new shelf for the logged in user
    Path: shelves/user:id/
    []create a form in pug to be able to create a new shelve
        [] (future) checkboxes to add/move albums to multiple shelves

[] create a put route to edit a shelf name for the logged in user
    Path: /shelf/shelf:id
    [] create a button to edit/delete

[] create a delete route to destory a shelf for the logged in user
    Path: /shelf/shelf:id
    [] create a button to edit/delete

[] update the pug files to show changes made by the user
    [] create a button to edit/delete buttons in a pug file
*/
// Make sure the user can only access its own shelves and not anyone else's in the database

router.get('/users/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10)

    // Grabs all of the logged in user's Shelves
    const shelves = await Shelf.findAll({ where: { userId } })
    res.render('shelves-detail', {
        shelves,
        userId,
        csrfToken: req.csrfToken()
    })
}))



router.post('/users/:id(\\d+)', csrfProtection, asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.id, 10)
    const { name } = req.body

    await Shelf.create({
        name,
        userId
    });

    //     const validatorErrors = validationResult(req);
    //         if(validatorErrors.isEmpty()){
    //             await shelf.save()
    //             res.redirect(`/shelves/${userId}`, {
    //             })
    //         }

    // res.render('/shelves-detail', {
    //     csrfToken: req.csrfToken(),

    // })
   //  next()

    // res.render('shelves-detail',{
    //     csrfToken: req.csrfToken(),

    // })

    res.redirect(`/shelves/users/${userId}`)

}))

router.get('/:id(\\d+)', csrfProtection ,asyncHandler(async (req, res )=>{
    const id = req.params.id
    const shelf = await Shelf.findByPk(id)

    res.render('shelf-detail', {
        shelf,
        csrfToken: req.csrfToken()
    })

}));

router.post('/:id(\\d+)', csrfProtection, asyncHandler(async(req, res )=>{
    const id = req.params.id
    const shelf = await Shelf.findByPk(id,{
        include: User
    })
  await shelf.destroy()
    res.redirect(`/shelves/users/${shelf.User.id}`)
}));


module.exports = router