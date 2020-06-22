import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Role } from './role';
import { User } from './user';

export interface TokenResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
}

@Injectable()
export abstract class AbstractAuthService {
    protected abstract _rolesPath: string[];
    protected abstract _userNamePath: string[];

    abstract isLoggedIn(): boolean;
    abstract logout(): void;
    abstract getAccessToken(): string;
    abstract login(): Promise<any>;

    protected _getNestedValues(path: string[], source: string[]): any {
        for (let field of path) {
            source = source[field];
        }
        return source;
    }

    protected _getPayload(): string[] | null {
        const token = this.getAccessToken();
        if (token) {
            return jwt_decode(token);
        }
        return null;
    }

    protected _getRoles(): string[] | null {
        if (this.isLoggedIn()) {
            return this._getNestedValues(this._rolesPath, this._getPayload());
        }
        return null;
    }

    public getUserRoles(): Role[] | null {
        const payload = this._getRoles();
        if (payload) {
            return payload.map(
                (role: string) => {
                    return Role[role];
                });
        }
        return null;
    }

    public hasRole(roles: Role[]): boolean {
        const userRoles = this._getRoles();
        if (userRoles && roles.every(val => userRoles.includes(val))) {
            return true;
        }
        return false;
    }

    public getCurrentUser(): User | null {
        if (this.isLoggedIn()) {
            return new User(
                this._getNestedValues(this._userNamePath, this._getPayload()),
                this.getUserRoles()
            );
        }
        return null;
    }
}
