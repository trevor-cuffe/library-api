import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { User } from "../users/user.model"


@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();
        const user = request.user as User;

        if (user.isAdmin) return true;
        return false;
    }
}