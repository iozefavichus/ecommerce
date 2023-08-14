// const unexpectedStatus = ():Error =>
//     new Error(`Cannot create new customer`);

// export const createNewCustomer = async(registrationCard: regCardObj): Promise<void | Error> => {
//     try{
//         const result = await fetch(``, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(registrationCard)
//         });
//         if (result.status === 201) return;

//         return unexpectedStatus();
//     } catch(e){
//         return e as Error;
//     }
// }
