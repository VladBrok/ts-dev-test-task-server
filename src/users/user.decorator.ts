import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return { ...req.user, token: extractToken(req) };
  },
);

const extractToken = (req: any) => {
  const tokenParts = req.headers.authorization.split(' ');
  if (/^Bearer$/i.test(tokenParts[0].trim())) {
    return tokenParts[1].trim();
  }
};
