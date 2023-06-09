import { AuthContextProviderValue } from "@/contexts/auth/auth.context.types";
import { writeMember } from "@/services/member/member.service";

export const googleAuthUtility = async (auth: AuthContextProviderValue) => {
  const { authWithGoogle } = auth ?? {};

  try {
    const { user } = await authWithGoogle();
    if (!user) throw new Error("No se encontró el usuario con Google");

    await writeMember({
      uid: user.uid,
      name: user.displayName ?? "",
      email: user.email ?? "",
      photoURL: user.photoURL ?? "",
      documentNumber: "",
      documentType: "DNI",
      role: "NOTARIO/A",
    });
  } catch (e) {
    console.log(e);
  }
};
