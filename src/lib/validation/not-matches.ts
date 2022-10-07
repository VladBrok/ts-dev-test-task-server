import { registerDecorator, ValidationArguments } from 'class-validator';

export function NotMatches(pattern: RegExp) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'NotMatches',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(val: any, _args: ValidationArguments) {
          return !pattern.test(val);
        },
      },
    });
  };
}
