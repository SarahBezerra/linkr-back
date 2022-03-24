import { authRepository } from "../repositories/authRepository.js";
import bcrypt from 'bcrypt';

export async function postSingUp(req,res){

    const { email, password, username, image_url} = req.body;

    try {

        const users = await authRepository.getUsers( email );
        if(users.rowCount !== 0){
            return res.status(400).send("E-mail já casdastrado");
        }

        const encriptedPassword = bcrypt.hashSync(password, 10);

        await authRepository.createUser( email, encriptedPassword );

        const user = await authRepository.getUsers( email );
        const userId = user.rows[0].id;
        await authRepository.createPublicContent( userId, username, image_url );

        res.sendStatus(201);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}