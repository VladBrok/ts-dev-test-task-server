import { registerDecorator, ValidationArguments } from 'class-validator';

export function IsPassword() {
  return function (object: Object, propertyName: string) {
    const min = 6;
    const max = 16;
    registerDecorator({
      name: 'IsPassword',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(password: any, _args: ValidationArguments) {
          return (
            typeof password === 'string' &&
            password &&
            password.length >= min &&
            password.length <= max &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /^[A-Za-z0-9]+$/.test(password)
          );
        },
      },
    });
  };
}
