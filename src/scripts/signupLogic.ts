// // src/scripts/signupLogic.ts

// import { auth, db } from "../lib/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";

// export async function signupHandler(e: Event) {
//   e.preventDefault();

//   const form = e.currentTarget as HTMLFormElement;
//   const formData = new FormData(form);

//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;
//   const name = formData.get("name") as string;

//   if (!email || !password || !name) {
//     alert("Por favor, completa todos los campos.");
//     return;
//   }

//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;

//     const userDocRef = doc(db, "users", user.uid);
//     await setDoc(userDocRef, {
//       name: name,
//       email: email,
//       role: "normal",
//       createdAt: new Date().toISOString(),
//       activeBoardIds: [],
//     });

//     alert("¡Registro exitoso! Ya puedes iniciar sesión.");
//     window.location.href = "/dashboard";
//   } catch (error: any) {
//     console.error("Error de registro:", error.code, error.message);
//     let errorMessage = "Ocurrió un error inesperado.";
//     if (error.code === "auth/email-already-in-use") {
//       errorMessage = "El correo electrónico ya está en uso.";
//     } else if (error.code === "auth/weak-password") {
//       errorMessage = "La contraseña es muy débil.";
//     }
//     alert(errorMessage);
//   }
// }
