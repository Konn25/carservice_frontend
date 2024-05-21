import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
    authorities: { authority: string }[];
}