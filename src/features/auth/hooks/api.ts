import { SignUp, Profile } from '@/features/auth/types';
import { useMutation } from '@tanstack/react-query';

export const useRegister = () => {
  return useMutation({
    mutationFn: async (input: SignUp) => {
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify(input),
      });

      const profile = await (res.json() as Promise<Profile>);

      return profile;
    },
  });
};

export const useEditProfile = () => {
  return useMutation({
    mutationFn: async (input: FormData) => {
      const res = await fetch('/api/auth/profile', {
        method: 'PATCH',
        body: input,
      });

      const profile = await (res.json() as Promise<Profile>);

      return profile;
    },
  });
};
