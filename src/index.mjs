    import express from "express";
    import register from "./routes/register.mjs";
    import login from "./routes/login.mjs";
    import getMyForm from "./routes/getMyForm.mjs"
    import postForm from "./routes/postForm.mjs"
    import getDetail from "./routes/getDetailForm.mjs"
    import updateMyForm from "./routes/updateMyForm.mjs"
    import getUserForm from "./routes/getUserForm.mjs"
    import postParticipant from "./routes/postParticipant.mjs"
    import getMyParticipant from "./routes/getMyParticipant.mjs"
    import getResearchParticipant from "./routes/getResearchParticipant.mjs"
    import updateParticipant from "./routes/updateParticipant.mjs"
    import getDetailPart from "./routes/getDetailPart.mjs"
    import getCount from "./routes/getCount.mjs"
    import verifyres from "./routes/verifyres.mjs"
    import getVerifpart from "./routes/getVerifpart.mjs"
    import bodyParser from "body-parser";

    const app = express();
    app.use(express.json())

    const PORT = process.env.PORT || 3000;

    app.use('/api', register)
    app.use('/api', login)
    app.use('/api', getMyForm)
    app.use('/api', postForm)
    app.use('/api', getDetail)
    app.use('/api', updateMyForm)
    app.use('/api', getUserForm)
    app.use('/api', postParticipant)
    app.use('/api', getMyParticipant)
    app.use('/api', getResearchParticipant)
    app.use('/api', updateParticipant)
    app.use('/api', getDetailPart)
    app.use('/api', getCount)
    app.use('/api', verifyres)
    app.use('/api', getVerifpart)

    
    app.listen(PORT, () => {
        console.log(`Running on port ${PORT}`);
    });



