export interface LoginDataFormProps {
  nextStep?: () => void;
  variant: 'register' | 'auth';
  goToRegister?: () => void;
}
