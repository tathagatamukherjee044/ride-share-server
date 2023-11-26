// import * as mongoUtils from '../mongo/mongoUtils.utils'
// import { verifyJwt, signJwt } from "../utils/jwt.utils";

// export async function createSession(userId: string, userAgent: string) {

//   const session = await mongoUtils.insertDocument('session',{_id : userId, userAgent})
//   if(session.insertedId){
//     return {userId, userAgent,}
//   }

// }

// export async function findSessions(query : Object) {

//   return await mongoUtils.getDocuments('session',query)

// }

// export async function updateSession(query : Object, updateDoc : Object) {

//   return await mongoUtils.updateDocument('session',query, updateDoc);

// }

// export async function reIssueAccessToken(refreshToken : string) {
//   const { decoded } = verifyJwt(refreshToken);

//   if (!decoded || !get(decoded, "session")) return false;

//   const session = await SessionModel.findById(get(decoded, "session"));

//   if (!session || !session.valid) return false;

//   const user = await findUser({ _id: session.user });

//   if (!user) return false;

//   const accessToken = signJwt(
//     { ...user, session: session._id },
//     { expiresIn: config.get("accessTokenTtl") } // 15 minutes
//   );

//   return accessToken;


   
// }
