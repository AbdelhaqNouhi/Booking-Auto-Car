const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const handleErrors = (err) => {
    let errors = { de, a, date, heure }

    if (err.message.includes("failed to delete travel")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}

const SearchTravel = asyncHandler (async (req, res) => {
    const { de, a, date} = req.params;

    const searchResults = await prisma.voyage.findMany({
        where: {
            de: de,
            a: a,
            date: date,
        },
    });

    if (!searchResults.length) {
        res.status(401);
        throw new Error('This travel not found!');
    }

    res.status(201).json(searchResults);
});

const GetAllTravel = asyncHandler (async(req, res) => {
    try {
        const travels = await prisma.voyage.findMany();
        res.status(201).json(travels);
    } catch (error) {
        res.status(401).json({ status: 'fail' });
    }
});

const GetTravelById = asyncHandler (async(req, res) => {
    try {
        const travel = await prisma.voyage.findUnique({
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
});

const CreateTravel = asyncHandler(async (req, res) => {
    const { de, a, date, heure } = req.body;
    try {
        const createdTravel = await prisma.voyage.create({
            data: {
                de,
                a,
                date,
                heure,
            },
        });
        res.status(201).json(createdTravel);
    } catch (error) {
        res.status(400).json({ status: 'failed to create travel' });
    }
});

const UpdateTravel = async (req, res) => {
    try {
        const travel = await prisma.voyage.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });

        if (!travel) {
            res.status(400).json({ status: 'travel not found' });
            return;
        }

        const updatedTravel = await prisma.Voyage.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                de: req.body.de,
                a: req.body.a,
                date: req.body.date,
                heure: req.body.heure
            }
        });

        res.status(200).json(updatedTravel);
    } catch (error) {
        res.status(401).json({ status: 'failed to update travel' });
    }
};

const DeleteTravel = asyncHandler(async (req, res) => {
    const travel = await prisma.voyage.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (!travel) {
        res.status(401).json({ status: 'undefined travel' });
        return;
    }
    try {
        const deletedTravel = await prisma.voyage.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });
        res.status(201).json("Travel deleted");
    } catch (error) {
        res.status(401).json({ status: 'failed to delete travel' });
    }
});


module.exports = {
    SearchTravel,
    GetAllTravel,
    GetTravelById,
    CreateTravel,
    UpdateTravel,
    DeleteTravel
}