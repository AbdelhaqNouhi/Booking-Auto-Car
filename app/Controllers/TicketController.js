
const asyncHandler = require('express-async-handler')

exports.GetAllTicket = asyncHandler(async (req, res) => {

    try {
        const Ticket = await TicketModule.find().populate("CreatedBy").populate("Travel")
        res.status(201).json(Ticket)

    } catch (error) {
        res.status(401).json({ status: 'fail'})
    }

})

exports.GetOneTicket = asyncHandler(async (req, res) => {

})

exports.CreateTicket = asyncHandler(async (req, res) => {

    const { CreatedBy, Travel } = req.body

    if ( !CreatedBy || !Travel ) {
        res.status(401).status({ status: 'Please add all fields'})
    }

    const Ticket = await TicketModule.create ({
        CreatedBy,
        Travel
    })

    if (Ticket) {
        res.status(201).status(Ticket)
    }
    else {
        res.status(401).status({ status: 'invlide fields' })
    }
})

exports.UpdateTicket = asyncHandler(async (req, res) => {

})

exports.DeleteTicket = asyncHandler(async (req, res) => {

})