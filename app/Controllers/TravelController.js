const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const SearchTravel = async (req, res) => {
    const { from, to, date } = req.params;

    const searchResults = await prisma.travel.findMany({
        where: {
            from: from,
            to: to,
            date: date,
        },
    });

    if (!searchResults.length) {
        res.status(401);
        throw new Error('This travel not found!');
    }

    res.status(201).json(searchResults);
};

const GetAllTravel = async (req, res) => {
    try {
        const travels = await prisma.travel.findMany();
        res.status(201).json(travels);
    } catch (error) {
        res.status(401).json({ status: 'fail' });
    }
};

const GetTravelById = async (req, res) => {
    try {
        const travel = await prisma.travel.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });
        if (!travel) {
            res.status(401).json({ status: 'undefined travel' });
            return;
        }
        res.status(201).json(travel);
    } catch (error) {
        res.status(401).json({ status: 'undefined travel' });
    }
};

const CreateTravel = asyncHandler(async (req, res) => {
    const { from, to, date, time } = req.body;
    try {
        const createdTravel = await prisma.travel.create({
            data: {
                from,
                to,
                date,
                time,
            },
        });
        res.status(201).json(createdTravel);
    } catch (error) {
        res.status(400).json({ status: 'failed to create travel' });
    }
});

const UpdateTravel = async (req, res) => {
    try {
        const travel = await prisma.travel.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });

        if (!travel) {
            res.status(400).json({ status: 'travel not found' });
            return;
        }

        const updatedTravel = await prisma.travel.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: req.body,
        });

        res.status(200).json(updatedTravel);
    } catch (error) {
        res.status(401).json({ status: 'failed to update travel' });
    }
};

const DeleteTravel = async (req, res) => {
    try {
        const travel = await prisma.travel.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });

        if (!travel) {
            res.status(400).json({ status: 'travel not found' });
            return;
        }

        await prisma.travel.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });
        res.status(200).json({ status: 'success' });
    
    } catch (error) {
        res.status(401).json({ status: 'failed to delete travel' });
    }
};

module.exports = {
    SearchTravel,
    GetAllTravel,
    GetTravelById,
    CreateTravel,
    UpdateTravel,
    DeleteTravel
}