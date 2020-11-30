import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { IUser } from '../../interfaces/user/user.interface';


export interface IRUser {
    users: IUser[];
    selectedId: number;
}

export class AddUserAction {
    public static type = '[User] Add';
    constructor(public user: IUser) {}
}

export class UpdateUserAction {
    public static type = '[User] Update';
    constructor(public user: IUser) {}
}

export class DeleteUserAction {
    public static type = '[User] Delete';
    constructor(public id: number) {}
}


@Injectable()
@State<IRUser>({
    name: 'userState',
    defaults: {
        users: [],
        selectedId: null,

    }
})
export class UserState {
    constructor() {}


    @Action(AddUserAction)
    add(ctx: StateContext<IRUser>, action: AddUserAction) {
       // Set
       ctx.setState({ users: [...ctx.getState().users, action.user], 
        selectedId: action.user.id });
    }

    @Action(UpdateUserAction)
    update(state: StateContext<IRUser>, action: UpdateUserAction) {
    }

    @Action(DeleteUserAction)
    delete(state: StateContext<IRUser>, action: DeleteUserAction) {
    }

}