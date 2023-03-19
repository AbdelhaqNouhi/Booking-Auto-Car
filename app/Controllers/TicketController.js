
const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const handleErrors = (err) => {
    let errors = { prix, voyageId, utilisateursId}

    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}

const CreateTicket = asyncHandler(async (req, res) => {

    const { prix, voyageId, utilisateursId } = req.body

    if (!prix || !voyageId || !utilisateursId) {
        res.status(401).json({ status: 'Please add all fields' })
        return
    }

    // check if user exists
    const userExists = await prisma.utilisateur.findUnique({
        where: {
            id: parseInt(utilisateursId)
        }
    })
    if (!userExists) {
        res.status(401).json({ status: 'User not found' })
        return
    }

    // check if travel exists
    const travelExists =  await prisma.voyage.findUnique({
        where: {
            id: parseInt(voyageId)
        }
    })
    if (!travelExists) {
        res.status(401).json({ status: 'Travel not found' })
        return
    }

    try {
        const ticket = await prisma.billet.create({
            data: {
                prix: prix,
                voyage: { connect: { id: parseInt(voyageId) } },
                utilisateur: { connect: { id: parseInt(utilisateursId) } }
            }
        });
        res.status(201).json({ status: "success", message: "Ticket created successfully" });

    } catch (err) {
        res.status(401).json({ status: "fail", message: err.message });
    }

})

const GetAllTicket = asyncHandler(async (req, res) => {

    try {
        const tickets = await prisma.billet.findMany()
        res.status(201).json(tickets)
        
    } catch (err) {
        console.error('Error: ' + err.message)
        res.status(401).json({ status: "fail", message: err.message })
    }
})

const GetOneTicket = asyncHandler(async (req, res) => {

    // check if ticket exists
    const ticketExists = await prisma.billet.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (!ticketExists) {
        res.status(401).json({ status: 'This ticket not found' })
    }

    try {
        const ticket = await prisma.billet.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(201).json({ status: "success", ticket })

    } catch (err) {
        res.status(401).json({ status: "fail", message: err.message })
    }
})

const UpdateTicket = asyncHandler(async (req, res) => {
        const {prix, voyageId, utilisateurId } = req.body
    
        if (!prix || !utilisateurId || !voyageId) {
            res.status(401).json({ status: 'Please add all fields' })
            return
        }
    
        // check if user exists
        const userExists = await prisma.utilisateur.findUnique({
            where: {
                id: parseInt(utilisateurId)
            }
        })
        if (!userExists) {
            res.status(401).json({ status: 'User not found' })
            return
        }
    
        // check if travel exists
        const travelExists =  await prisma.voyage.findUnique({
            where: {
                id: parseInt(voyageId)
            }
        })
        if (!travelExists) {
            res.status(401).json({ status: 'Travel not found' })
            return
        }
    
    try {
        const ticket = await prisma.billet.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                prix: req.body.prix,
                voyageId: req.body.voyageId,
                utilisateurId: req.body.utilisateurId
            }
        })
        res.status(201).json({ status: "success", message: "Ticket updated successfully" })

    } catch (err) {
        res.status(401).json({ status: "fail", message: err.message })
    }   
})

const DeleteTicket = asyncHandler(async (req, res) => {

    // check if ticket exists
    const ticketExists = await prisma.billet.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (!ticketExists) {
        res.status(401).json({ status: 'This ticket not found' })
    }

    try {
        const ticket = await prisma.billet.delete({
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