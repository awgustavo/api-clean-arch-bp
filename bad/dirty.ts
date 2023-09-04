import express from 'express';
import { S3 } from "@aws-sdk/client-s3";

const app = express();
app.use(express.json());

const port = 3000;
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

app.post('/user', async (req, res) => {
    try {
        console.log('body', req.body)

        const user = await prisma.user.create({
            data: req.body,
        });

        console.log('S3');
        const s3Response = await new S3().putObject({
            Key: `${req.body.email}/`,
            Bucket: `plank-user-images`,
        });
        console.log('S3', s3Response);

        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }

});

app.get('/user', async (req, res) => {
    const user = await prisma.user.findMany();
    res.json(user);
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});