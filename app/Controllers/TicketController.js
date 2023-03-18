
const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const CreateTicket = asyncHandler(async (req, res) => {

    const {price, userId, travelId } = req.body

    if (!price || !userId || !travelId) {
        res.status(401).json({ status: 'Please add all fields' })
        return
    }

    // check if user exists
    const userExists =  await prisma.user.findUnique({
        where: {
            id: parseInt(userId)
        }
    })
    if (!userExists) {
        res.status(401).json({ status: 'User not found' })
        return
    }

    // check if travel exists
    const travelExists =  await prisma.travel.findUnique({
        where: {
            id: parseInt(travelId)
        }
    })
    if (!travelExists) {
        res.status(401).json({ status: 'Travel not found' })
        return
    }

    try {
        const newTicket = await prisma.ticket.create({
            data: {
                price: price,
                userId: parseInt(userId),
                travelId: parseInt(travelId)
            }
        })
        res.status(201).json(newTicket)
    }
    catch (error) {
        res.status(401).json({ status: 'fail'})
    }
})

const GetAllTicket = asyncHandler(async (req, res) => {

    try {
        const tickets = await prisma.ticket.findMany()
        res.status(201).json(tickets)
        
    } catch (err) {
        console.error('Error: ' + err.message)
        res.status(401).json({ status: "fail", message: err.message })
    }
})

const GetOneTicket = asyncHandler(async (req, res) => {

    // check if ticket exists
    const ticketExists = await prisma.ticket.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (!ticketExists) {
        res.status(401).json({ status: 'This ticket not found' })
    }

    try {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(201).json({ status: "success", message: "Ticket deleted successfully" })

    } catch (err) {
        res.status(401).json({ status: "fail", message: err.message })
    }
})

const UpdateTicket = asyncHandler(async (req, res) => {
        const {price, userId, travelId } = req.body
    
        if (!price || !userId || !travelId) {
            res.status(401).json({ status: 'Please add all fields' })
            return
        }
    
        // check if user exists
        const userExists =  await prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        })
        if (!userExists) {
            res.status(401).json({ status: 'User not found' })
            return
        }
    
        // check if travel exists
        const travelExists =  await prisma.travel.findUnique({
            where: {
                id: parseInt(travelId)
            }
        })
        if (!travelExists) {
            res.status(401).json({ status: 'Travel not found' })
            return
        }
    
        try {
            const ticket = await prisma.ticket.update({
                where: {
                    id: parseInt(req.params.id)
                },
                data: {
                    price: price,
                    userId: parseInt(userId),
                    travelId: parseInt(travelId)
                }
            })
            res.status(201).json(ticket)
        }
        catch (error) {
            res.status(401).json({ status: 'fail'})
        }
})

const DeleteTicket = asyncHandler(async (req, res) => {

    // check if ticket exists
    const ticketExists = await prisma.ticket.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (!ticketExists) {
        res.status(401).json({ status: 'This ticket not found' })
    }

    try {
        const ticket = await prisma.ticket.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(201).json("Ticket deleted")
    } catch (err) {
        res.status(401).json({ status: "fail", message: err.message })
    }

})

module.exports = {
    GetAllTicket,
    GetOneTicket,
    CreateTicket,
    UpdateTicket,
    DeleteTicket
}