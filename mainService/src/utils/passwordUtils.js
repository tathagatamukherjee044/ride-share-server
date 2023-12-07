import bcrypt from 'bcrypt';


var passwordHash ='';

export async function generateHashForPassword (password , callback  ) {

	var passwordHash = await bcrypt.hash(password, 10)
	return passwordHash;
	//this part is for async
    // bcrypt.hash(password, 10,(err,hash)=>{
    //     if(err) {
    //         console.log("error");
    //     }
    //     callback(hash)

    // });
    
}

export async function checkHashForPassword (password ,passwordHash ) {
    var data = await bcrypt.compare(password, passwordHash);
    return data
    
}

