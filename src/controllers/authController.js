import { authRepository } from "../repositories/authRepository.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function postSingUp(req,res){

    const { email, password, username, image_url} = req.body;

    try {

        const user = await authRepository.getUserByEmail( email );
        if(user.rowCount !== 0){
            return res.status(400).send("E-mail já casdastrado");
        }

        const encriptedPassword = bcrypt.hashSync(password, 10);

        await authRepository.createUser( email, encriptedPassword );

        const registeredUser = await authRepository.getUserByEmail( email );
        const userId = registeredUser.rows[0].id;
        await authRepository.createPublicContent( userId, username, image_url );

        res.sendStatus(201);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}


export async function postSingIn(req,res){

    const { email, password } = req.body;
    const errorMessage = "E-mail ou senha incorretos";

    try {

        const user = await authRepository.getUserByEmail( email );
        if(user.rowCount === 0){
            return res.send(errorMessage).status(400);
        }

        if(bcrypt.compareSync(password, user.rows[0].password)) {
            const token = uuid();

            await authRepository.createSession(user.rows[0].id, token);
    
            res.send({token});
            
        } else {
            return res.send(errorMessage).status(400);
        }

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}