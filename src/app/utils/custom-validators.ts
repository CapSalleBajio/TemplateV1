import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user/user.service';

export class CustomValidators {

    static validateEmail(userService: UserService) {
        return (control: AbstractControl) => {
            const value = control.value;
            console.log(value);
            return userService.validateEmail(value).pipe(
                map((res: any) => {
                    console.log(res);
                    return res.valid ? null : {emailExist: true};
                })
            );
        };
    }
}
